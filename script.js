let score = 0;
let timer;
let timeLeft = 60;

function initGame(words) {
  const startButton = document.getElementById('startButton');
  const gameContainer = document.getElementById('game');
  const countdownElement = document.getElementById('countdown');
  const wordElement = document.querySelector('.word');
  const input = document.getElementById('userInput');
  const scoreElement = document.getElementById('score');

  startButton.addEventListener('click', () => {
    score = 0;
    timeLeft = 60;
    scoreElement.textContent = score;
    gameContainer.style.display = 'block';
    startButton.style.display = 'none';
    startCountdown();
    startGame(words, wordElement, input, scoreElement);
  });

  function startCountdown() {
    timer = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(timer);
        alert('Time is up! Your score is: ' + score);
        resetGame();
      } else {
        timeLeft--;
        countdownElement.textContent = `Time left: ${timeLeft}s`;
      }
    }, 1000);
  }

  function resetGame() {
    gameContainer.style.display = 'none';
    startButton.style.display = 'block';
  }

  function startGame(words, wordElement, input, scoreElement) {
    input.value = '';
    input.focus();

    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];
    wordElement.textContent = randomWord;

    input.addEventListener('input', function onInput() {
      if (input.value === randomWord) {
        score++;
        scoreElement.textContent = score;
        input.removeEventListener('input', onInput); // remove old event listener
        startGame(words, wordElement, input, scoreElement); // Start a new game
      }
    });
  }
}
