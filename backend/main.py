# All these imports take pre-written functions/scripts from a library
# that has been installed on Python and importing it for use within this script
from fastapi import FastAPI # reads and parses HTTP requests from frontend
from fastapi.middleware.cors import CORSMiddleware # Defines which frontends are allowed to read responses from backend
from pydantic import BaseModel # Defines the expected JSON shape
import random
# Creates an application object from the FastAPI class. 
# This allows for the class scaffolding to be filled and certain functions to be called that are in FastAPI
app = FastAPI()

# There is already an empty middleware class and now we are defining what goes inside it
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# This creates a new class that defines the expected JSON shape
class RequestData(BaseModel):
# When sending the request from JS, it needs to use the same variables
    num_guess: int
    select_input: str

# The home() definition is creating a function and it gets registered by FastAPI to the route /home in our app object
@app.get("/home")
def home():
    return {"message": "Backend is running"}

# This creates a new post route in our app /random
@app.post("/random")
# In the function FastAPI sees the incoming data being sent and knows to assign it to the request variable
# RequestData is the class that tells the system what shape its supposed to be saved
# THis allows us to save the input to specific variables for the function logic
def random_number(request: RequestData):
    num_guess = request.num_guess # needs to be same as expected var names
    select_guess = request.select_input
    ran_num = random.randint(1,100) # Creates a random number between 1 and 100
# Core app logic to determine if the number is higher or lower
    if select_guess == "higher":
        if ran_num > num_guess:
            response = "You Win!"
        elif ran_num < num_guess:
            response = "You Lose"
        else:
            response = "It's a tie"
    else:
        if ran_num < num_guess:
            response = "You Win!"
        elif ran_num > num_guess:
            response = "You Lose"
        else:
            response = "It's a tie"
# The output that gets converted to JSON by FastAPI to send back
    return {
# The variables number and result are what get used by JS to read in the value
        "random_number": ran_num,
        "result": response
        }
