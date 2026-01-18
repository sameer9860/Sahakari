from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel
import asyncio

app = FastAPI()

class ProcessRequest(BaseModel):
    task_name: str
    params: dict

async def process_task(task_name: str, params: dict):
    # Simulate long processing
    print(f"Starting task: {task_name}")
    await asyncio.sleep(5)
    print(f"Finished task: {task_name} with {params}")

@app.get("/")
def read_root():
    return {"message": "FastAPI Processing Service is Running"}

@app.post("/process/")
async def create_process(request: ProcessRequest, background_tasks: BackgroundTasks):
    background_tasks.add_task(process_task, request.task_name, request.params)
    return {"message": "Task received", "task": request.task_name}
