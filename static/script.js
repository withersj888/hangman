// Hangman Game JavaScript

let gameState = {
    gameActive: false,
    guessedLetters: [],
    wrongGuesses: 0,
    maxWrongGuesses: 6
};

// Hangman figure parts in order - positioned relative to gallows
const hangmanParts = [
    { content: 'O', top: '0px', left: '0px' },       // head
    { content: '|', top: '15px', left: '0px' },      // body
    { content: '/', top: '30px', left: '-10px' },    // left arm
    { content: '\\', top: '30px', left: '10px' },    // right arm
    { content: '/', top: '50px', left: '-10px' },    // left leg
    { content: '\\', top: '50px', left: '10px' }     // right leg
];

document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard event listener
    document.getElementById('letter-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            makeGuess();
        }
    });
    
    // Auto-focus on input
    document.getElementById('letter-input').focus();
});

function newGame() {
    fetch('/new_game', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            showMessage(data.error, 'error');
            return;
        }
        
        gameState.gameActive = true;
        gameState.guessedLetters = [];
        gameState.wrongGuesses = 0;
        
        updateDisplay(data);
        resetKeyboard();
        document.getElementById('letter-input').disabled = false;
        document.getElementById('guess-btn').disabled = false;
        document.getElementById('letter-input').focus();
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage('Failed to start new game', 'error');
    });
}

function makeGuess() {
    if (!gameState.gameActive) {
        showMessage('Please start a new game first!', 'error');
        return;
    }
    
    const letterInput = document.getElementById('letter-input');
    const letter = letterInput.value.toUpperCase().trim();
    
    if (!letter) {
        showMessage('Please enter a letter', 'error');
        return;
    }
    
    if (letter.length !== 1 || !/[A-Z]/.test(letter)) {
        showMessage('Please enter a single letter', 'error');
        return;
    }
    
    // Clear input
    letterInput.value = '';
    
    fetch('/guess', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ letter: letter })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            showMessage(data.error, 'error');
            return;
        }
        
        updateDisplay(data);
        updateKeyboard(letter, data.message.includes('Good guess'));
        
        if (data.game_over) {
            gameState.gameActive = false;
            document.getElementById('letter-input').disabled = true;
            document.getElementById('guess-btn').disabled = true;
            
            if (data.won) {
                showMessage(data.message, 'success');
            } else {
                showMessage(data.message, 'error');
            }
        } else {
            showMessage(data.message);
        }
        
        // Refocus on input if game is still active
        if (gameState.gameActive) {
            document.getElementById('letter-input').focus();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage('Failed to make guess', 'error');
    });
}

function selectLetter(letter) {
    if (!gameState.gameActive) {
        showMessage('Please start a new game first!', 'error');
        return;
    }
    
    document.getElementById('letter-input').value = letter;
    makeGuess();
}

function updateDisplay(data) {
    // Update word display
    const wordDisplay = document.getElementById('word-display');
    wordDisplay.innerHTML = '';
    data.word_display.forEach(letter => {
        const span = document.createElement('span');
        span.className = 'word-letter';
        span.textContent = letter;
        wordDisplay.appendChild(span);
    });
    
    // Update stats
    document.getElementById('wrong-count').textContent = data.wrong_guesses;
    document.getElementById('max-wrong').textContent = data.max_wrong_guesses;
    
    // Update guessed letters
    const guessedLetters = data.guessed_letters.length > 0 ? 
        data.guessed_letters.join(', ') : 'None';
    document.getElementById('guessed-letters').textContent = guessedLetters;
    
    // Update hangman drawing
    updateHangmanDrawing(data.wrong_guesses);
    
    gameState.wrongGuesses = data.wrong_guesses;
    gameState.guessedLetters = data.guessed_letters;
}

function updateHangmanDrawing(wrongGuesses) {
    const figureContainer = document.getElementById('hangman-figure');
    figureContainer.innerHTML = '';
    
    // Add hangman parts based on wrong guesses
    for (let i = 0; i < wrongGuesses && i < hangmanParts.length; i++) {
        const part = hangmanParts[i];
        const partElement = document.createElement('div');
        partElement.className = 'hangman-part';
        partElement.textContent = part.content;
        partElement.style.top = part.top;
        partElement.style.left = part.left;
        figureContainer.appendChild(partElement);
    }
}

function updateKeyboard(letter, isCorrect) {
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        if (key.textContent === letter) {
            key.disabled = true;
            if (isCorrect) {
                key.classList.add('correct');
            } else {
                key.classList.add('wrong');
            }
        }
    });
}

function resetKeyboard() {
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        key.disabled = false;
        key.classList.remove('correct', 'wrong', 'used');
    });
}

function showMessage(message, type = 'info') {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    
    // Remove existing classes
    messageElement.classList.remove('success', 'error');
    
    // Add new class if specified
    if (type === 'success' || type === 'error') {
        messageElement.classList.add(type);
    }
}