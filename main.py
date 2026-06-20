from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles

import cv2
import pytesseract
import numpy as np

app = FastAPI()

# Servir carpeta static
app.mount("/static", StaticFiles(directory="static"), name="static")

# Ruta principal: devolver index.html directamente
@app.get("/")
async def home():
    return FileResponse("static/index.html")

# Ruta de OCR
@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    contents = await file.read()
    npimg = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

    if img is None:
        return JSONResponse({"text": "", "error": "Invalid image"}, status_code=400)

    text = pytesseract.image_to_string(img)
    return JSONResponse({"text": text})


