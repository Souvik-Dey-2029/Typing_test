const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "JavaScript is the language of the web.",
    "Coding is 10 percent writing and 90 percent debugging.",
    "Practice makes perfect when learning to type.",
    "Keep it simple, stupid."
];

const quoteDisplay = document.getElementById('quote-display');
const quoteInput = document.getElementById('quote-input');
const timerElement = document.getElementById('timer');
const wpmElement = document.getElementById('wpm');
const startBtn = document.getElementById('start-btn');

let timer = 0;
let interval = null;

// Start the game
startBtn.addEventListener('click', () => {
    // Pick a random quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    
    // Reset game state
    quoteDisplay.innerHTML = '';
    // Wrap each character in a span so we can color them later
    quote.split('').forEach(char => {
        const span = document.createElement('span');
        span.innerText = char;
        quoteDisplay.appendChild(span);
    });

    quoteInput.value = '';
    quoteInput.disabled = false;
    quoteInput.focus();
    
    startTimer();
    startBtn.innerText = "Restart Game";
});

// Check typing progress
quoteInput.addEventListener('input', () => {
    const arrayQuote = quoteDisplay.querySelectorAll('span');
    const arrayValue = quoteInput.value.split('');

    let correct = true;

    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];
        if (character == null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            correct = false;
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        } else {
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
            correct = false;
        }
    });

    if (correct) {
        stopTimer();
        calculateWPM();
        quoteInput.disabled = true;
        alert("Finished! Your WPM: " + wpmElement.innerText);
    }
});

function startTimer() {
    timer = 0;
    timerElement.innerText = 0;
    clearInterval(interval);
    interval = setInterval(() => {
        timer++;
        timerElement.innerText = timer;
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);
}

function calculateWPM() {
    const wordCount = quoteInput.value.split(' ').length;
    const minutes = timer / 60;
    const wpm = Math.round(wordCount / (minutes || 1/60)); // Avoid division by zero
    wpmElement.innerText = wpm;
}

const title = document.getElementById('zoom-title');
const text = title.textContent;
const letters = text.split("");

title.textContent = ""; 

letters.forEach(char => {
    const span = document.createElement("span");
    // If it's a space, use a special space character so it doesn't collapse
    span.textContent = char === " " ? "\u00A0" : char; 
    title.appendChild(span);
});