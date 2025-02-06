const loadingScreen = document.getElementById("loadingScreen");
const gameContainer = document.querySelector(".colorGame");
const targetColorBox = document.querySelector(".targetColor");
const colorOptionContainer = document.querySelector(".options");
const colorOption = document.querySelector(".option");
const gameStat = document.querySelector(".gameStatus");
const scoreDisplay = document.querySelector(".scoreValue");
const newGameButton = document.querySelector(".newGame");

let targetColor;
let score = 0;

// Showing loading screen for 3 seconds, then show the game
setTimeout(() => {
  loadingScreen.style.opacity = "0";
  setTimeout(() => {
    loadingScreen.style.display = "none";
    gameContainer.style.display = "block";
    setTimeout(() => {
      gameContainer.style.opacity = "1";
    }, 100);
  }, 400);
}, 2000);

//generating random color
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

//generating game colors
function generateColors() {
  colorOptionContainer.innerHTML = ""; //clear previous option

  targetColor = getRandomColor();
  targetColorBox.style.backgroundColor = targetColor;

  let colors = [targetColor];

  //generate 5 more random colors
  while (colors.length < 6) {
    let newColor = getRandomColor();
    if (!colors.includes(newColor)) {
      colors.push(newColor);
    }
  }

  //shuffling colors
  colors.sort(() => Math.random() - 0.5);

  //create color options
  colors.forEach((color) => {
    const option = document.createElement("div");
    option.classList.add("option");
    option.setAttribute("data-testid", "colorOption");
    option.style.backgroundColor = color;
    option.addEventListener("click", () => checkAnswer(color));
    colorOptionContainer.appendChild(option);
  });
}

//checking if the selected color is correct
function checkAnswer(selectedColor) {
  if (selectedColor === targetColor) {
    score++;
    scoreDisplay.textContent = score;
    gameStat.textContent = "🎉 Correct Answer! 🎉";
    gameStat.style.color = " #33a872";
    gameStat.style.fontSize = "20px";

    gameStat.classList.add("show");
    setTimeout(() => {
      gameStat.classList.remove("show");
    }, 1000);
  } else {
    gameStat.textContent = "❌ Wrong Answer!";
    gameStat.style.color = "#ff0000";
    gameStat.classList.add("wrong");
    gameStat.style.fontSize = "15px";
  }

  //generate new colors
  setTimeout(generateColors, 800);
}

//reset game
function resetGame() {
  score = 0;
  scoreDisplay.textContent = score;
  gameStat.textContent = "Choose the correct color";
  gameStat.style.color = "black";
  generateColors();
}

//start game
newGameButton.addEventListener("click", resetGame);
generateColors();
