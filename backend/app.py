import cohere
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# Cohere API key
COHERE_API_KEY = "YOUR_COHERE_API_KEY"  # Replace with your Cohere API key

# Initialize Cohere client
co = cohere.Client(COHERE_API_KEY)

# Define the input model
class Message(BaseModel):
    message: str

@app.post("/chat")
async def chat_endpoint(message: Message):
    try:
        # Use Cohere to generate a chatbot response
        response = co.chat(messages=[{"role": "user", "content": message.message}])
        bot_response = response.reply or "Sorry, I couldn't process your message."

        return {"response": bot_response}
    except Exception as e:
        return {"response": "An error occurred. Please try again later."}
