import requests

# Configuration
URL = "http://localhost:8000/verify"

# Student data as form fields
data = {
    "name": "Jane Doe",
    "dob": "2005-05-20",
    "aadhaar": "1234 5678 9012",
    "marks_10": "92.5%",
    "marks_12": "88.0%"
}

# Mock file uploads (In real usage, these would be valid image files)
# For testing the OCR wrapper without real files, 
# you'll need actual images like 'aadhaar.jpg', 'marks10.jpg', etc.
files = {
    'aadhaar_file': ('aadhaar.jpg', b'fake image data', 'image/jpeg'),
    'marks10_file': ('marks10.jpg', b'fake image data', 'image/jpeg'),
    'marks12_file': ('marks12.jpg', b'fake image data', 'image/jpeg')
}

print("Testing Scholarship AI Backend Verification...")
try:
    response = requests.post(URL, data=data, files=files)
    print("Status Code:", response.status_code)
    if response.status_code == 200:
        print("Response Data:")
        import json
        print(json.dumps(response.json(), indent=2))
    else:
        print("Error:", response.text)
except Exception as e:
    print(f"Error: {e}")
    print("\nReminder: Run the server first:")
    print("cd ai_service && uvicorn main:app --reload")
