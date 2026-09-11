import os
import json
import asyncio

from dotenv import load_dotenv
from google import genai

from app.portfolio import PORTFOLIO


# ============================================================
# ENVIRONMENT
# ============================================================

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

LIVE_MODEL = "gemini-3.1-flash-live-preview"


# ============================================================
# BUILD GEMINI PORTFOLIO CONTEXT
# ============================================================

def build_portfolio_context():
    """
    Converts the complete PORTFOLIO dictionary into structured
    text that can be provided to Gemini as its knowledge context.
    """

    portfolio_json = json.dumps(
        PORTFOLIO,
        indent=2,
        ensure_ascii=False
    )

    return f"""
You are Abdullah Ahmed's AI portfolio voice assistant.

Your job is to answer visitors' questions about Abdullah Ahmed,
his education, professional experience, projects, technical skills,
career interests, portfolio website, and this voice assistant.

============================================================
AUTHORITATIVE PORTFOLIO INFORMATION
============================================================

The following structured information is the authoritative source
of truth about Abdullah:

{portfolio_json}

============================================================
CRITICAL EDUCATION STATUS
============================================================

IMPORTANT:

Abdullah Ahmed has ALREADY GRADUATED.

He completed his Bachelor of Science in Computer Science,
with a major in Data Science, at HITEC University.

His graduation date is JULY 2026.

His current status is:

GRADUATED.

He is NOT currently a student.

He is NOT currently studying.

He is NOT currently completing his degree.

He is NOT waiting to graduate.

He is NOT expected to graduate.

He is NOT set to graduate in June 2026.

JULY 2026 IS THE CORRECT GRADUATION DATE.

If someone asks:

"When did Abdullah graduate?"

Answer:

"Abdullah graduated in July 2026."

If someone asks:

"When will Abdullah graduate?"

Correct the premise naturally:

"Abdullah has already graduated. He graduated in July 2026."

If someone asks:

"Is Abdullah still a student?"

Answer:

"No. Abdullah graduated in July 2026."

If someone asks:

"Is Abdullah going to graduate in June 2026?"

Answer:

"No. Abdullah has already graduated. His graduation date was July 2026."

NEVER say that Abdullah is currently studying.

NEVER say that Abdullah is still completing his degree.

NEVER say that Abdullah is expected to graduate.

NEVER say that Abdullah is set to graduate in June 2026.

NEVER use June 2026 as Abdullah's graduation date.

============================================================
RESPONSE RULES
============================================================

Use the portfolio information above as the primary source of truth.

Do not invent information.

If information is not available in the portfolio,
say that you do not have that information.

Answer naturally and conversationally because you are a
voice-based portfolio assistant.

Keep answers relatively concise unless the visitor asks
for a detailed explanation.

When discussing Abdullah's projects, explain:

- What the project does
- Why it was built
- Important technologies
- Important technical concepts
- Relevant architecture when useful

When discussing Abdullah's professional experience,
explain his role, responsibilities, technologies, and
relevant achievements.

When discussing his legal AI experience, mention that
he worked with more than 450,000 court judgments and
more than 40,000 legal provisions when relevant.

When discussing retrieval systems, explain BM25,
embeddings, FAISS, semantic search, hybrid retrieval,
and cross-encoder reranking when relevant.

When discussing the portfolio voice assistant,
explain that it uses:

- React
- TypeScript
- CSS
- Python
- FastAPI
- WebSockets
- Gemini Live API
- Real-time audio streaming
- Voice activity detection

The portfolio voice assistant itself does NOT require
RAG or a vector database because its knowledge about
Abdullah is relatively small and structured.

Do not claim that the portfolio voice assistant uses RAG
unless the actual implementation is changed to use RAG.

Abdullah's legal AI systems are different because they
work with very large collections of legal documents and
therefore use retrieval technologies such as BM25,
embeddings, FAISS, semantic search, and reranking.

If a visitor asks something unrelated to Abdullah's
portfolio, politely redirect the conversation toward
Abdullah's work.

============================================================
IDENTITY
============================================================

You are Abdullah Ahmed's portfolio assistant.

You are NOT Abdullah himself.

When referring to Abdullah, use "Abdullah" or "he".

Speak as an assistant representing Abdullah's portfolio.

============================================================
END OF INSTRUCTIONS
============================================================
"""


# ============================================================
# GEMINI CONFIGURATION
# ============================================================

def get_live_config():
    """
    Creates the Gemini Live configuration.
    """

    portfolio_context = build_portfolio_context()

    return {
        "response_modalities": ["AUDIO"],

        "output_audio_transcription": {},

        "system_instruction": {
            "parts": [
                {
                    "text": portfolio_context
                }
            ]
        },

        "realtime_input_config": {
            "automatic_activity_detection": {
                "disabled": False,
                "start_of_speech_sensitivity": "START_SENSITIVITY_HIGH",
                "end_of_speech_sensitivity": "END_SENSITIVITY_HIGH",
                "prefix_padding_ms": 300,
                "silence_duration_ms": 500,
            }
        },
    }


# ============================================================
# SIMPLE LIVE CONNECTION TEST
# ============================================================

async def test_live_connection():

    config = get_live_config()

    async with client.aio.live.connect(
        model=LIVE_MODEL,
        config=config,
    ) as session:

        await session.send_realtime_input(
            text="Hello! Introduce yourself briefly."
        )

        while True:

            async for response in session.receive():

                if response.server_content:

                    content = response.server_content

                    if content.output_transcription:

                        print(
                            "Gemini:",
                            content.output_transcription.text
                        )

                    if content.model_turn:

                        print(
                            "Received audio response."
                        )

                    if content.turn_complete:

                        return


# ============================================================
# MAIN VOICE SESSION
# ============================================================

async def handle_live_session(
    websocket,
    audio_queue
):

    config = get_live_config()

    async with client.aio.live.connect(
        model=LIVE_MODEL,
        config=config,
    ) as session:

        print(
            "GEMINI LIVE SESSION STARTED"
        )

        # ====================================================
        # SEND AUDIO TO GEMINI
        # ====================================================

        async def send_audio_to_gemini():

            chunk_count = 0

            while True:

                audio_data = await audio_queue.get()

                # --------------------------------------------
                # AUDIO QUEUE CLOSED
                # --------------------------------------------

                if audio_data is None:

                    print(
                        "AUDIO QUEUE CLOSED"
                    )

                    break

                # --------------------------------------------
                # END CURRENT AUDIO STREAM
                # --------------------------------------------

                if audio_data == "AUDIO_END":

                    print(
                        "ENDING CURRENT AUDIO STREAM"
                    )

                    try:

                        await session.send_realtime_input(
                            audio_stream_end=True
                        )

                        print(
                            "AUDIO STREAM END SENT"
                        )

                    except Exception as e:

                        print(
                            "AUDIO STREAM END ERROR:",
                            repr(e)
                        )

                    continue

                # --------------------------------------------
                # SEND AUDIO CHUNK
                # --------------------------------------------

                chunk_count += 1

                if chunk_count % 50 == 0:

                    print(
                        "AUDIO CHUNKS SENT TO GEMINI:",
                        chunk_count
                    )

                try:

                    await session.send_realtime_input(
                        audio={
                            "data": audio_data,
                            "mime_type": "audio/pcm;rate=16000",
                        }
                    )

                except Exception as e:

                    print(
                        "SEND AUDIO ERROR:",
                        repr(e)
                    )

                    break

        # ====================================================
        # RECEIVE GEMINI RESPONSE
        # ====================================================

        async def receive_from_gemini():

            try:

                # IMPORTANT:
                #
                # session.receive() handles one turn.
                # Once turn_complete occurs, the generator ends.
                #
                # The outer while True allows the same session
                # to continue handling future turns.

                while True:

                    async for response in session.receive():

                        print(
                            "GEMINI RESPONSE RECEIVED:",
                            type(response).__name__
                        )

                        if not response.server_content:
                            continue

                        content = response.server_content

                        # ------------------------------------
                        # MODEL AUDIO
                        # ------------------------------------

                        if content.model_turn:

                            print(
                                "GEMINI MODEL TURN RECEIVED"
                            )

                            for part in content.model_turn.parts:

                                if part.inline_data:

                                    audio = (
                                        part.inline_data.data
                                    )

                                    await websocket.send_json({
                                        "type": "audio",
                                        "audio": audio.hex(),
                                    })

                        # ------------------------------------
                        # TRANSCRIPTION
                        # ------------------------------------

                        if content.output_transcription:

                            text = (
                                content
                                .output_transcription
                                .text
                            )

                            if text:

                                print(
                                    "GEMINI TRANSCRIPT:",
                                    text
                                )

                                await websocket.send_json({
                                    "type": "transcript",
                                    "text": text,
                                })

                        # ------------------------------------
                        # TURN COMPLETE
                        # ------------------------------------

                        if content.turn_complete:

                            print(
                                "GEMINI TURN COMPLETE"
                            )

                            await websocket.send_json({
                                "type": "turn_complete"
                            })

                            break

            except Exception as e:

                print(
                    "RECEIVE GEMINI ERROR:",
                    repr(e)
                )

                try:

                    await websocket.send_json({
                        "type": "error",
                        "message": str(e),
                    })

                except Exception:
                    pass

        # ====================================================
        # RUN AUDIO + RESPONSE STREAMS
        # ====================================================

        await asyncio.gather(
            send_audio_to_gemini(),
            receive_from_gemini(),
        )


# ============================================================
# AUTOMATED MULTI-TURN TEST
# ============================================================

async def test_multi_turn_connection():

    results = []

    config = get_live_config()

    async with client.aio.live.connect(
        model=LIVE_MODEL,
        config=config,
    ) as session:

        questions = [

            "What is Abdullah's main role?",

            "What did Abdullah study?",

            "When did Abdullah graduate?",

            "Is Abdullah still a student?",

            "Tell me about Abdullah's AI Legal Research Assistant.",

            "How many court judgments did Abdullah process?",

            "What technologies does Abdullah know?",

            "Tell me about Abdullah's Data and AI Engineer experience.",

            "How did Abdullah build this voice assistant?",

            "Why doesn't this portfolio voice assistant use RAG?",
        ]

        for question in questions:

            print()
            print("=" * 60)
            print("QUESTION:")
            print(question)
            print("=" * 60)

            await session.send_realtime_input(
                text=question
            )

            response_text = ""

            while True:

                async for response in session.receive():

                    if not response.server_content:
                        continue

                    content = response.server_content

                    if content.output_transcription:

                        text = (
                            content
                            .output_transcription
                            .text
                        )

                        if text:

                            response_text += text

                    if content.turn_complete:

                        break

                break

            print("ANSWER:")
            print(response_text)

            results.append({
                "question": question,
                "response": response_text,
            })

    return results