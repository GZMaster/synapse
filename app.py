from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from recommenders import klusterthon_oop as ko

app = FastAPI()

# Define a Pydantic model to structure the expected data
class ThreeObjects(BaseModel):   
    student_perf: list
    course_tab: list
    student_tab: list

@app.get("/")

async def check():
    return "status ok"
@app.post("/recommender/")
async def recommend(data: ThreeObjects):
    # Access the objects here
    # For instance, you could print them:

    result= ko.rec(data.student_perf, data.course_tab, data.student_tab)
    

    # Return the objects as a response
    return result

# Run the example using uvicorn from the command line:
# uvicorn main:app --reload

