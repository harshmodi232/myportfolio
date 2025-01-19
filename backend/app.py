from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

# Create FastAPI instance
app = FastAPI()

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock chatbot response logic
def get_bot_response(user_message):
    responses = {
        "hello": "Hi there! How can I help you today?",
        "how are you": "I'm just a bot, but I'm doing great! How about you?",
        "what is your name": "I'm your friendly AI chatbot!",
        "bye": "Goodbye! Have a great day!",
    }
    return responses.get(user_message.lower(), "Sorry, I didn't understand that.")

@app.post("/chat")
async def chat_endpoint(request: Request):
    data = await request.json()
    user_message = data.get("message", "")
    bot_response = get_bot_response(user_message)
    return {"response": bot_response}
