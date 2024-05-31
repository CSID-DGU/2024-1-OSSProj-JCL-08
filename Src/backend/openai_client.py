
import os
from openai import OpenAI
from dotenv import load_dotenv

# .env 파일을 로드합니다.
load_dotenv()


client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY")
)

def summarize_text(text):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": f"Summarize the following text in Korean, maximum 2 sentences: {text}"}
        ],
        max_tokens=300
    )
    summary = response.choices[0].message.content.strip()
    return summary