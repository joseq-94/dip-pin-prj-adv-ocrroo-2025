>OCR TEXT EXTRACTOR - FASTAPI + OPENCV + TESSERACT

This project is a simple OCR prototype built as part of the Performance Tasks for the unit. 
It demonstrates the ability to process videos, extract text.

>Overview

The project implements a backend service that:
- Accepts an uploaded video
- Processes it using OpenCV
- Extracts text using Tesseract OCR
- Returns the extracted text as JSON

> How do you deploy and run the project?

1. Install dependencies
Run: pip install fastapi uvicorn opencv-python pytesseract numpy
2. Install Tesseract OCR
Download and install Tesseract for your operating system:
Windows installer: https://github.com/tesseract-ocr/tesseract
3. Start the server
Run: uvicorn api:app --reload
4. Access the application
Open: http://127.0.0.1:8000

>Who is it for and why?

This project is intended for:
•	Students learning backend development and OCR concepts
•	Educators assessing understanding of image processing and API design
The purpose is to demonstrate:
•	Ability to integrate third party libraries
•	Understanding of OCR workflows
•	Basic API development skills
•	Practical implementation of performance task requirements

