
import "./VoiceAgent.css";
import { useEffect, useRef, useState } from "react";

interface VoiceAgentProps {
  isOpen: boolean;
  onClose: () => void;
}

function VoiceAgent({
  isOpen,
  onClose,
}: VoiceAgentProps) {
  const socketRef =
    useRef<WebSocket | null>(null);

  const mediaStreamRef =
    useRef<MediaStream | null>(null);

  const audioContextRef =
    useRef<AudioContext | null>(null);

  const processorRef =
    useRef<ScriptProcessorNode | null>(null);

  const sourceRef =
    useRef<MediaStreamAudioSourceNode | null>(
      null
    );

  const silentGainRef =
    useRef<GainNode | null>(null);

  const audioQueueRef =
    useRef<Float32Array[]>([]);

  const isPlayingRef =
    useRef(false);

  const nextPlayTimeRef =
    useRef(0);

  const isMutedRef =
    useRef(false);

  const speakingRef =
    useRef(false);

  const silenceStartRef =
    useRef<number | null>(null);

  const waitingForResponseRef =
    useRef(false);

  const assistantSpeakingRef =
    useRef(false);

  const vadCooldownUntilRef =
    useRef(0);

  // Transcript container reference
  const transcriptRef =
    useRef<HTMLDivElement | null>(null);

  const [isConnected, setIsConnected] =
    useState(false);

  const [status, setStatus] =
    useState("Ready to talk");

  const [transcript, setTranscript] =
    useState("");

  const [isMuted, setIsMuted] =
    useState(false);

  useEffect(() => {
    return () => {
      stopConversation();
    };
  }, []);

  // Automatically scroll transcript to the latest text
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop =
        transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  const startConversation = async () => {
    try {
      setStatus(
        "Requesting microphone..."
      );

      setIsMuted(false);

      isMutedRef.current = false;
      speakingRef.current = false;
      silenceStartRef.current = null;
      waitingForResponseRef.current =
        false;
      assistantSpeakingRef.current =
        false;
      vadCooldownUntilRef.current = 0;

      const stream =
        await navigator.mediaDevices.getUserMedia(
          {
            audio: {
              channelCount: 1,
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
            },
          }
        );

      mediaStreamRef.current = stream;

      setStatus("Connecting...");

      const socket = new WebSocket(
        "wss://portfolio-2-aem6.onrender.com/ws/voice"
      );

      socketRef.current = socket;

      socket.onopen = async () => {
        console.log(
          "Connected to FastAPI"
        );

        setIsConnected(true);
        setStatus("Listening...");

        socket.send(
          JSON.stringify({
            type: "start",
          })
        );

        await startMicrophone(stream);
      };

      socket.onmessage = async (
        event
      ) => {
        try {
          const data = JSON.parse(
            event.data
          );

          console.log(
            "Backend:",
            data
          );

          if (
            data.type === "connected"
          ) {
            setStatus(
              "Listening..."
            );
          }

          if (
            data.type === "audio"
          ) {
            assistantSpeakingRef.current =
              true;

            setStatus(
              "Speaking..."
            );

            await playGeminiAudio(
              data.audio
            );
          }

          if (
            data.type === "transcript"
          ) {
            setTranscript(
              (previous) => {
                if (!previous) {
                  return data.text;
                }

                return `${previous} ${data.text}`;
              }
            );
          }

          if (
            data.type ===
            "turn_complete"
          ) {
            console.log(
              "GEMINI TURN COMPLETE - RESETTING VAD"
            );

            assistantSpeakingRef.current =
              false;

            waitingForResponseRef.current =
              false;

            speakingRef.current =
              false;

            silenceStartRef.current =
              null;

            vadCooldownUntilRef.current =
              Date.now() + 1200;

            if (
              !isMutedRef.current
            ) {
              setStatus(
                "Listening..."
              );
            }
          }

          if (
            data.type === "error"
          ) {
            console.error(
              "Gemini error:",
              data.message
            );

            assistantSpeakingRef.current =
              false;

            waitingForResponseRef.current =
              false;

            speakingRef.current =
              false;

            silenceStartRef.current =
              null;

            setStatus(
              "Voice agent error"
            );
          }
        } catch (error) {
          console.error(
            "Failed to process server message:",
            error
          );
        }
      };

      socket.onerror = (
        error
      ) => {
        console.error(
          "WebSocket error:",
          error
        );

        setStatus(
          "Connection error"
        );
      };

      socket.onclose = () => {
        console.log(
          "WebSocket closed"
        );

        setIsConnected(false);
        setStatus(
          "Disconnected"
        );
      };
    } catch (error) {
      console.error(
        "Microphone error:",
        error
      );

      setStatus(
        "Microphone permission denied"
      );
    }
  };

  const startMicrophone = async (
    stream: MediaStream
  ) => {
    const audioContext =
      new AudioContext({
        sampleRate: 16000,
      });

    audioContextRef.current =
      audioContext;

    if (
      audioContext.state ===
      "suspended"
    ) {
      await audioContext.resume();
    }

    const source =
      audioContext.createMediaStreamSource(
        stream
      );

    sourceRef.current =
      source;

    const processor =
      audioContext.createScriptProcessor(
        4096,
        1,
        1
      );

    processorRef.current =
      processor;

    processor.onaudioprocess = (
      event
    ) => {
      if (isMutedRef.current) {
        return;
      }

      if (
        Date.now() <
        vadCooldownUntilRef.current
      ) {
        return;
      }

      if (
        assistantSpeakingRef.current ||
        waitingForResponseRef.current
      ) {
        return;
      }

      const inputData =
        event.inputBuffer.getChannelData(
          0
        );

      let sum = 0;

      for (
        let i = 0;
        i < inputData.length;
        i++
      ) {
        sum +=
          inputData[i] *
          inputData[i];
      }

      const rms = Math.sqrt(
        sum / inputData.length
      );

      const now =
        performance.now();

      const speechThreshold =
        0.03;

      const silenceDuration =
        700;

      const isSpeech =
        rms > speechThreshold;

      if (isSpeech) {
        silenceStartRef.current =
          null;

        if (
          !speakingRef.current
        ) {
          speakingRef.current =
            true;

          console.log(
            "USER STARTED SPEAKING"
          );
        }
      } else {
        if (
          speakingRef.current
        ) {
          if (
            silenceStartRef.current ===
            null
          ) {
            silenceStartRef.current =
              now;
          }

          if (
            now -
              silenceStartRef.current >=
            silenceDuration
          ) {
            speakingRef.current =
              false;

            silenceStartRef.current =
              null;

            if (
              !waitingForResponseRef.current &&
              !assistantSpeakingRef.current
            ) {
              waitingForResponseRef.current =
                true;

              console.log(
                "USER STOPPED SPEAKING"
              );

              if (
                socketRef.current &&
                socketRef.current
                  .readyState ===
                  WebSocket.OPEN
              ) {
                socketRef.current.send(
                  JSON.stringify({
                    type: "audio_end",
                  })
                );
              }
            }
          }
        }
      }

      const pcmData =
        convertFloat32ToInt16(
          inputData
        );

      const base64Audio =
        arrayBufferToBase64(
          pcmData
        );

      if (
        socketRef.current &&
        socketRef.current
          .readyState ===
          WebSocket.OPEN &&
        !waitingForResponseRef.current &&
        !assistantSpeakingRef.current
      ) {
        socketRef.current.send(
          JSON.stringify({
            type: "audio",
            audio: base64Audio,
          })
        );
      }
    };

    const silentGain =
      audioContext.createGain();

    silentGain.gain.value = 0;

    silentGainRef.current =
      silentGain;

    source.connect(
      processor
    );

    processor.connect(
      silentGain
    );

    silentGain.connect(
      audioContext.destination
    );
  };

  const toggleMute = () => {
    const newMutedState =
      !isMutedRef.current;

    isMutedRef.current =
      newMutedState;

    setIsMuted(
      newMutedState
    );

    if (newMutedState) {
      speakingRef.current =
        false;

      silenceStartRef.current =
        null;

      setStatus(
        "Microphone muted"
      );
    } else {
      vadCooldownUntilRef.current =
        Date.now() + 500;

      setStatus(
        "Listening..."
      );
    }
  };

  const playGeminiAudio = async (
    hexAudio: string
  ) => {
    try {
      if (!hexAudio) {
        return;
      }

      const audioContext =
        audioContextRef.current;

      if (!audioContext) {
        return;
      }

      if (
        audioContext.state ===
        "suspended"
      ) {
        await audioContext.resume();
      }

      const bytePairs =
        hexAudio.match(
          /.{1,2}/g
        ) || [];

      const bytes =
        new Uint8Array(
          bytePairs.map(
            (byte) =>
              parseInt(
                byte,
                16
              )
          )
        );

      const pcmData =
        new Int16Array(
          bytes.buffer
        );

      const floatData =
        new Float32Array(
          pcmData.length
        );

      for (
        let i = 0;
        i < pcmData.length;
        i++
      ) {
        floatData[i] =
          pcmData[i] /
          32768;
      }

      audioQueueRef.current.push(
        floatData
      );

      scheduleAudioPlayback();
    } catch (error) {
      console.error(
        "Audio playback error:",
        error
      );
    }
  };

  const scheduleAudioPlayback = () => {
    const audioContext =
      audioContextRef.current;

    if (!audioContext) {
      return;
    }

    if (
      isPlayingRef.current
    ) {
      return;
    }

    isPlayingRef.current =
      true;

    if (
      nextPlayTimeRef.current <
      audioContext.currentTime
    ) {
      nextPlayTimeRef.current =
        audioContext.currentTime;
    }

    while (
      audioQueueRef.current
        .length > 0
    ) {
      const audioData =
        audioQueueRef.current.shift();

      if (!audioData) {
        break;
      }

      const audioBuffer =
        audioContext.createBuffer(
          1,
          audioData.length,
          24000
        );

      audioBuffer
        .getChannelData(0)
        .set(audioData);

      const source =
        audioContext.createBufferSource();

      source.buffer =
        audioBuffer;

      source.connect(
        audioContext.destination
      );

      source.start(
        nextPlayTimeRef.current
      );

      nextPlayTimeRef.current +=
        audioBuffer.duration;
    }

    setTimeout(() => {
      isPlayingRef.current =
        false;

      if (
        audioQueueRef.current
          .length > 0
      ) {
        scheduleAudioPlayback();
      }
    }, 50);
  };

  const convertFloat32ToInt16 = (
    buffer: Float32Array
  ) => {
    const output =
      new Int16Array(
        buffer.length
      );

    for (
      let i = 0;
      i < buffer.length;
      i++
    ) {
      const sample =
        Math.max(
          -1,
          Math.min(
            1,
            buffer[i]
          )
        );

      output[i] =
        sample < 0
          ? sample * 0x8000
          : sample * 0x7fff;
    }

    return output;
  };

  const arrayBufferToBase64 = (
    buffer: Int16Array
  ) => {
    const bytes =
      new Uint8Array(
        buffer.buffer
      );

    let binary = "";

    for (
      let i = 0;
      i < bytes.byteLength;
      i++
    ) {
      binary += String.fromCharCode(
        bytes[i]
      );
    }

    return btoa(binary);
  };

  const stopConversation = () => {
    processorRef.current?.disconnect();

    sourceRef.current?.disconnect();

    silentGainRef.current?.disconnect();

    if (
      audioContextRef.current
    ) {
      audioContextRef.current.close();
    }

    mediaStreamRef.current
      ?.getTracks()
      .forEach(
        (track) =>
          track.stop()
      );

    socketRef.current?.close();

    audioQueueRef.current =
      [];

    isPlayingRef.current =
      false;

    nextPlayTimeRef.current =
      0;

    isMutedRef.current =
      false;

    speakingRef.current =
      false;

    silenceStartRef.current =
      null;

    waitingForResponseRef.current =
      false;

    assistantSpeakingRef.current =
      false;

    vadCooldownUntilRef.current =
      0;

    processorRef.current =
      null;

    sourceRef.current =
      null;

    silentGainRef.current =
      null;

    audioContextRef.current =
      null;

    mediaStreamRef.current =
      null;

    socketRef.current =
      null;

    setIsConnected(false);
    setIsMuted(false);
    setTranscript("");
    setStatus(
      "Ready to talk"
    );
  };

  const handleClose = () => {
    stopConversation();
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="voice-overlay"
      onClick={handleClose}
    >
      <div
        className="voice-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <button
          className="voice-close"
          onClick={handleClose}
        >
          ×
        </button>

        <div className="voice-header">
          <span className="voice-status-dot"></span>

          <span>
            Abdullah's AI Assistant
          </span>
        </div>

        <div className="voice-content">
          <div className="voice-orb">
            <div className="voice-orb-inner">
              🎙
            </div>
          </div>

          <h2>Talk to Me</h2>

          <p className="voice-status">
            {status}
          </p>

          <p className="voice-description">
            Ask me about my projects,
            experience, skills, or anything
            related to my work.
          </p>

          {transcript && (
            <div
              ref={transcriptRef}
              className="voice-transcript"
            >
              {transcript}
            </div>
          )}
        </div>

        <div className="voice-controls">
          {!isConnected ? (
            <button
              className="voice-call-button"
              onClick={
                startConversation
              }
            >
              <span>🎙</span>
              Start Conversation
            </button>
          ) : (
            <>
              <button
                className="voice-call-button"
                onClick={
                  toggleMute
                }
              >
                <span>
                  {isMuted
                    ? "🎙"
                    : "🔇"}
                </span>

                {isMuted
                  ? "Unmute Microphone"
                  : "Mute Microphone"}
              </button>

              <button
                className="voice-call-button"
                onClick={
                  stopConversation
                }
              >
                <span>⏹</span>
                End Conversation
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default VoiceAgent;

