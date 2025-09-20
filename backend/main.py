from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
def read_root():
    return {"message": "Backend is running.."}

class AttendanceRequest(BaseModel):
    student_id: int
    method: str


@app.post("/attendance/mark")
def mark_attendance(attendance_request: AttendanceRequest):
    # Here you would add logic to mark attendance using the specified method
    return {"status": f"Attendance marked for student {attendance_request.student_id} using {attendance_request.method}"}