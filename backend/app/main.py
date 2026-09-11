import os
import asyncio
import base64

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from google import genai

from app.voice import (
    test_live_connection,
    handle_live_session,
    test_multi_turn_connection,
)

load_dotenv()

app = FastAPI(
    title="Abdullah Ahmed Voice Agent API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://YOUR-PORTFOLIO.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {
        "message": "Voice Agent Backend is running"
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy"
    }


@app.get("/test-gemini")
async def test_gemini():
    try:
        api_key = os.getenv("GEMINI_API_KEY")

        if not api_key:
            return {
                "success": False,
                "error": "GEMINI_API_KEY is not configured"
            }

        print(
            "Gemini API key found:",
            api_key[:8] + "********"
        )

        client = genai.Client(
            api_key=api_key
        )

        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents="Say hello in one short sentence."
        )

        return {
            "success": True,
            "response": response.text
        }

    except Exception as e:
        print(
            "GEMINI ERROR:",
            repr(e)
        )

        return {
            "success": False,
            "error": str(e)
        }


@app.get("/test-live")
async def test_live():
    try:
        await test_live_connection()

        return {
            "success": True,
            "message": "Gemini Live connection worked"
        }

    except Exception as e:
        print(
            "LIVE API ERROR:",
            repr(e)
        )

        return {
            "success": False,
            "error": str(e)
        }


@app.get("/test-multi-turn")
async def test_multi_turn():
    try:
        results = await test_multi_turn_connection()

        return {
            "success": True,
            "turns": len(results),
            "results": results,
        }

    except Exception as e:
        print(
            "MULTI TURN ERROR:",
            repr(e)
        )

        return {
            "success": False,
            "error": str(e)
        }


@app.websocket("/ws/voice")
async def voice_websocket(
    websocket: WebSocket
):
    await websocket.accept()

    print("Voice client connected")

    audio_queue = asyncio.Queue()
    gemini_task = None

    try:
        while True:
            data = await websocket.receive_json()

            message_type = data.get("type")

            if message_type == "start":

                print(
                    "Starting Gemini Live session"
                )

                gemini_task = asyncio.create_task(
                    handle_live_session(
                        websocket,
                        audio_queue,
                    )
                )

                await websocket.send_json({
                    "type": "connected"
                })

            elif message_type == "audio":

                audio_base64 = data.get("audio")

                if audio_base64:

                    audio_bytes = base64.b64decode(
                        audio_base64
                    )

                    await audio_queue.put(
                        audio_bytes
                    )

            elif message_type == "audio_end":

                print(
                    "Received AUDIO_END from client"
                )

                await audio_queue.put(
                    "AUDIO_END"
                )

    except WebSocketDisconnect:

        print(
            "Voice client disconnected"
        )

        await audio_queue.put(None)

        if gemini_task:
            gemini_task.cancel()

    except Exception as e:

        print(
            "VOICE ERROR:",
            repr(e)
        )

        await audio_queue.put(None)

        if gemini_task:
            gemini_task.cancel()

        try:
            await websocket.send_json({
                "type": "error",
                "message": str(e),
            })
        except Exception:
            pass
