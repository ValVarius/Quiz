let quiz = [
  {
    q: "Inside which HTML element do we put the JavaScript?",
    a1: "<script></script>",
    a2: `<javascript></javascript>`,
    a3: `<scripting></scripting>`,
    a4: `<js></js>`,
    correct: "1",
  },
  {
    q: `What is the correct JavaScript syntax to change the content of the HTML element below? \n <p id="demo">This is a demonstration.</p>`,
    a1: `#demo.innerHTML = "Hello World!";`,
    a2: ` document.getElementById("demo").innerHTML = "Hello World!";`,
    a3: ` document.getElementById("demo").innerHTML = "Hello World!";`,
    a4: ` document.getElementByName("p").innerHTML = "Hello World!";`,
    correct: "2",
  },
  {
    q: `Where is the correct place to insert a JavaScript?`,
    a1: `The <head> section`,
    a2: `Both the <head> section and the <body> section are correct`,
    a3: `The <body> section`,
    a4: `Outside the <head> and <body> section`,
    correct: "2",
  },
  {
    q: `What is the correct syntax for referring to an external script called "xxx.js"?`,
    a1: `<script name="xxx.js">`,
    a2: `<script href="xxx.js">`,
    a3: `<script src="xxx.js">`,
    a4: `<script id="xxx.js">`,
    correct: "3",
  },
];

let store = [];
console.log(store);
let user = "";
let newUser = false;
let olderScore = 0;
let currentScore = 0;
let questionNumber = 0;

const startButton = document.querySelector("#Start");
const questionaire = document.getElementById("questionaire");
const nameInput = document.getElementById("name-input");
const entername = document.querySelector("#entername");
const textname = document.querySelector("#textname");
const YourName = document.querySelector("#YourName");
const OldScore = document.querySelector("#OldScore");
const CurrentScore = document.querySelector("#CurrentScore");
const options = document.querySelectorAll(".option");

const question = document.getElementById("question");
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");

console.log(startButton.textContent);

function getName() {
  startButton.textContent = "Good Luck!";
  nameInput.style.visibility = "visible";
}

function begin() {
  user = textname.value;
  YourName.textContent = "Name: " + user;

  // check if name exist in local storage and if yes display older score
  console.log(store);

  if (JSON.parse(localStorage.getItem("store"))) {
    store = JSON.parse(localStorage.getItem("store"));
  }
   //not sure this works
  console.log(store);

  // if the user name already exist, get their older score
  if (store) {
    for (const element of store) {
      if (element.name == user) {
        olderScore = element.score;
        OldScore.textContent = "Older Score: " + olderScore;
      }
    }
  }

  // set new user to true if name is not found
  if (!olderScore) {
    newUser = true;
    OldScore.textContent = "Older Score: 0";
  }

  nameInput.style.visibility = "hidden";

  function wait() {
    questionaire.style.visibility = "visible";

    nextQuestion();
  }
  setTimeout(wait, 500);
}

function nextQuestion() {
  if (questionNumber < quiz.length) {
    question.textContent = quiz[questionNumber].q;

    option1.textContent = quiz[questionNumber].a1;
    option2.textContent = quiz[questionNumber].a2;
    option3.textContent = quiz[questionNumber].a3;
    option4.textContent = quiz[questionNumber].a4;
  } else {
    console.log("End of test");
    questionaire.style.visibility = "hidden";
    console.log(user + " has a score of " + currentScore);
    // Store name if user is new or update score if user already exists

    if (newUser) {
      store.push({ name: user, score: currentScore });
      localStorage.removeItem("store");
      localStorage.setItem("store", JSON.stringify(store));
    }
    // reset all
    store = [];
    user = "";
    newUser = false;
    olderScore = 0;
    currentScore = 0;
    questionNumber = 0;

    startButton.textContent = "Begin Quiz";
    CurrentScore.textContent = "Current Score: ";
    OldScore.textContent = "Older Score:";
  }
}

function checkAnswer(event) {
  console.log(event.target.id.slice(-1), "  ", quiz[questionNumber].correct);

  if (event.target.id.slice(-1) == quiz[questionNumber].correct) {
    currentScore = currentScore + 10;
  }

  questionNumber++;
  CurrentScore.textContent = "Current Score: " + currentScore;
  nextQuestion();
}

startButton.addEventListener("click", getName);
entername.addEventListener("click", begin);
options.forEach((item) => {
  item.addEventListener("click", checkAnswer);
});
