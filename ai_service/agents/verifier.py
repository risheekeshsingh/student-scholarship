import os
import json
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables from root .env
load_dotenv(dotenv_path="../.env")

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def verify_documents(student_data: dict, aadhaar_text: str, marks10_text: str, marks12_text: str):
    """
    Verifies student form data against OCR-extracted text using OpenAI.
    """
    prompt = f"""
    You are an AI Document Verification Agent.

    Student Data:
    {json.dumps(student_data, indent=2)}

    Aadhaar Text:
    {aadhaar_text}

    Class 10 Marksheet:
    {marks10_text}

    Class 12 Marksheet:
    {marks12_text}

    Perform verification and return JSON with:
    aadhaar_verification, class10_verification, class12_verification,
    overall_status, confidence_score, summary.
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        print(f"AI Verification Error: {e}")
        return {
            "overall_status": "Error",
            "summary": f"AI Verification Failed: {str(e)}",
            "confidence_score": 0.0
        }
