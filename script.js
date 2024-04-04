
document.addEventListener('DOMContentLoaded', function () {
    const colors = ['R', 'G', 'B', 'Y', 'O', 'P'];
    let code;
    let guesses = [];
    let feedbacks = [];
    let currentTurn = 0;
    let pastGuesses = [];

    function generateCode() {
        return Array.from({ length: 4 }, () => colors[Math.floor(Math.random() * colors.length)]).join('');
    }

    function initializeGame() {
        code = generateCode();
        guesses = [];
        feedbacks = [];
        currentTurn = 0;
        pastGuesses = [];
        document.getElementById('gameBoard').innerHTML = '';
        document.getElementById('feedback').innerHTML = '';
        document.getElementById('message').innerHTML = '';
        document.getElementById('pastGuesses').innerHTML = '';
    }

    function displayGameBoard() {
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.innerHTML = '';
        guesses.forEach((guess, index) => {
            const row = document.createElement('div');
            row.classList.add('row');
            guess.split('').forEach(color => {
                const peg = document.createElement('div');
                peg.classList.add('peg');
                peg.style.backgroundColor = color;
                row.appendChild(peg);
            });
            gameBoard.appendChild(row);
        });
    }

    function displayFeedback() {
        const feedbackDiv = document.getElementById('feedback');
        feedbackDiv.innerHTML = '';
        feedbacks.forEach(feedback => {
            const feedbackRow = document.createElement('div');
            feedbackRow.classList.add('feedbackRow');
            feedback.split('').forEach(symbol => {
                const peg = document.createElement('div');
                peg.classList.add('feedbackPeg');
                if (symbol === '●') {
                    peg.classList.add('exactMatch');
                } else if (symbol === '○') {
                    peg.classList.add('nearMatch');
                }
                feedbackRow.appendChild(peg);
            });
            feedbackDiv.appendChild(feedbackRow);
        });
    }

    function displayPastGuesses() {
        const pastGuessesDiv = document.getElementById('pastGuesses');
        pastGuessesDiv.innerHTML = '';
        pastGuesses.forEach((guess, index) => {
            const guessElement = document.createElement('div');
            guessElement.textContent = `Guess ${index + 1}: ${guess}`;
            pastGuessesDiv.appendChild(guessElement);
        });
    }

    function checkGuess(guess) {
        let exactMatches = 0;
        let nearMatches = 0;
        const codeArr = code.split('');
        const guessArr = guess.split('');

        for (let i = 0; i < codeArr.length; i++) {
            if (codeArr[i] === guessArr[i]) {
                exactMatches++;
                codeArr[i] = guessArr[i] = null;
            }
        }

        for (let i = 0; i < codeArr.length; i++) {
            let index = guessArr.indexOf(codeArr[i]);
            if (index > -1) {
                nearMatches++;
                guessArr[index] = null;
            }
        }

        return '●'.repeat(exactMatches) + '○'.repeat(nearMatches);
    }

    function gameOver() {
        if (currentTurn >= 10) {
            document.getElementById('message').innerHTML = `Game over! The secret code was ${code}.`;
            return true;
        }
        return false;
    }

    function playTurn(guess) {
        guesses.push(guess);
        pastGuesses.push(guess);
        const feedback = checkGuess(guess);
        feedbacks.push(feedback);
        displayGameBoard();
        displayFeedback();
        displayPastGuesses();
        if (feedback === '●●●●') {
            document.getElementById('message').innerHTML = `Congratulations! You guessed the code in ${currentTurn + 1} turns.`;
            return;
        }
        if (gameOver()) return;
        currentTurn++;
    }

    document.getElementById('submitGuess').addEventListener('click', function () {
        const guessInput = document.getElementById('guessInput');
        const guess = guessInput.value.toUpperCase();
        if (guess.length !== 4 || !guess.split('').every(color => colors.includes(color))) {
            document.getElementById('message').innerHTML = 'Invalid guess. Please enter a 4-letter combination of colors (R, G, B, Y, O, P).';
            return;
        }
        playTurn(guess);
        guessInput.value = '';
    });

    initializeGame();
});
