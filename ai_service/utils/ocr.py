import os
import io
import pytesseract
from PIL import Image
from dotenv import load_dotenv

# Load environment variables from root .env
load_dotenv(dotenv_path="../.env")

# Configure Tesseract path if provided in .env
tesseract_path = os.getenv("TESSERACT_CMD")
if tesseract_path:
    pytesseract.pytesseract.tesseract_cmd = tesseract_path

def extract_text(file) -> str:
    """
    Extracts text from an image file stream using pytesseract.
    Can handle both a path string and a file-like object.
    """
    try:
        # If 'file' is already a file-like object (like UploadFile.file)
        if hasattr(file, 'read'):
            image = Image.open(file)
        else:
            image = Image.open(file)
            
        text = pytesseract.image_to_string(image)
        return text
    except Exception as e:
        print(f"OCR Error: {e}")
        return ""
