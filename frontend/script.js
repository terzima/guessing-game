/*
The javascript file is the middleman, it is what performs most of the frontend
app logic and send only the final result to the html file, it also communicates
with the backend to do the core backend logic and send the result back to the frontend
it feels a little bit like the middleman between the two and is the file that needs the
most caution with variable names

This sets up the connection between the HTML script and the JS
It searches for the id=generate or id=output in the HTML file and then
assigns it to a variable in the TS file
*/
const numGuessInput = document.getElementById("numGuess"); // user input for number they are guessing
const playButton = document.getElementById("playButton"); //button that lets the TS file know its supposed to POST to the backend
const numberOutput = document.getElementById("numberOutput"); // output from backend that gets loaded in to frontend
const resultOutput = document.getElementById("resultOutput"); // output from backend that gets loaded in to frontend
const home = document.getElementById("home");
const homeOutput =document.getElementById("homeOutput");
/*
This now listens to the play button action on the HTML page, when it recieves an
input it will now engage with the backend. We create a new variable called
response that saves what the backend FastAPI sends over through an HTTP
response object. Data then parses out the specific JSON response
*/
playButton.addEventListener("click", async () => {
/*
This saves the two inputs under constants. It knows what number was guessed
and saves it to numGuess as a number. It also knows which option higher or 
lower is checked and saves that value to orderGuess. This stays as a string
*/
  const numGuess =
    Number(numGuessInput.value);
  const selectedOption = document.querySelector(
    'input[name="select"]:checked');
  const orderGuess = selectedOption.value; // saves the value of higher or lower to this variable
  
// Sends over the post in html to the backend and awaits the response
  const response = await fetch(
    "http://localhost:8000/random",
    {
        method: "POST",
        headers: {
            "Content-Type":
                "application/json"
        },
        body: JSON.stringify({
            num_guess: numGuess, // Same variables as py file
            select_input: orderGuess
        })
    }
  );
  const data = await response.json(); // waits fpr the response from the backend
// Saves the outputs to the variables that the HTML file reads. data.xyz the xyz is the same variable as python
  numberOutput.textContent = `Random Number: ${data.random_number}`;
  resultOutput.textContent = `Result: ${data.result}`;
});
// THis was just an additional section I did for my own learning
home.addEventListener("click", async () => {
   const homeResponse = await fetch("http://localhost:8000/home"); 
   const status = await homeResponse.json();

   homeOutput.textContent = status.message;
});
