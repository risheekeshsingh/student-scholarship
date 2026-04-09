from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from utils.ocr import extract_text
from agents.verifier import verify_documents
import uvicorn
import os

app = FastAPI(title="EduGrant AI Backend")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Scholarship AI Backend Running 🚀"}

@app.post("/verify")
async def verify(
    name: str = Form(...),
    dob: str = Form(...),
    aadhaar: str = Form(...),
    marks_10: str = Form(...),
    marks_12: str = Form(...),
    aadhaar_file: UploadFile = File(...),
    marks10_file: UploadFile = File(...),
    marks12_file: UploadFile = File(...)
):

    # OCR extraction
    aadhaar_text = extract_text(aadhaar_file.file)
    marks10_text = extract_text(marks10_file.file)
    marks12_text = extract_text(marks12_file.file)

    student_data = {
        "name": name,
        "dob": dob,
        "aadhaar": aadhaar,
        "marks_10": marks_10,
        "marks_12": marks_12
    }

    # AI verification
    result = verify_documents(student_data, aadhaar_text, marks10_text, marks12_text)

    return {"verification_result": result}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
