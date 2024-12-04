const startBtn = document.getElementById('start-btn');
const gameArea = document.getElementById('game-area');
const questionEl = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');

let selectedNumbers = [10,20];
let currentQuestion = {};

startBtn.addEventListener('click', () => {
    selectedNumbers = Array.from(
        document.querySelectorAll('#number-form input:checked')
    ).map((checkbox) => parseInt(checkbox.value));

    if (selectedNumbers.length === 0) {
        alert('Выберите хотя бы одно число.');
        return;
    }

    feedbackEl.textContent = '';
    gameArea.classList.remove('hidden');
    generateQuestion();
});


function generateQuestion() {

    const number = selectedNumbers[Math.floor(Math.random() * selectedNumbers.length)];
    const multiplier = Math.floor(Math.random() * 10) + 1;
    const correctAnswer = number * multiplier;

    const options = new Set();
    options.add(correctAnswer);
    while (options.size < 4) {
        options.add(Math.floor(Math.random() * 81) + 1);
    }

    currentQuestion = { number, multiplier, correctAnswer, options: Array.from(options).sort(() => Math.random() - 0.5) };

    questionEl.textContent = `Сколько будет ${number} x ${multiplier}?`;
    renderOptions(currentQuestion.options);
}


function renderOptions(options) {
    optionsContainer.innerHTML = '';
    options.forEach((option) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => handleAnswer(option));
        optionsContainer.appendChild(button);
    });
}

function handleAnswer(selectedAnswer) {
    const buttons = optionsContainer.querySelectorAll('button');
    buttons.forEach((button) => {
        const answer = parseInt(button.textContent);
        if (answer === currentQuestion.correctAnswer) {
            button.classList.add('correct');
        } else {
            button.classList.add('incorrect');
        }
    });

    feedbackEl.textContent = selectedAnswer === currentQuestion.correctAnswer
        ? 'Правильно!'
        : `Неправильно. Правильный ответ: ${currentQuestion.correctAnswer}`;

    setTimeout(() => {
        generateQuestion();
    }, 2000);
}
