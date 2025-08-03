class HangmanGame {
    constructor() {
        this.words = {
            animals: ['ELEPHANT', 'GIRAFFE', 'PENGUIN', 'DOLPHIN', 'KANGAROO', 'BUTTERFLY', 'RHINOCEROS', 'CHEETAH'],
            countries: ['AUSTRALIA', 'BRAZIL', 'CANADA', 'DENMARK', 'EGYPT', 'FRANCE', 'GERMANY', 'HUNGARY'],
            colors: ['TURQUOISE', 'MAGENTA', 'CRIMSON', 'VIOLET', 'EMERALD', 'BURGUNDY', 'CORAL', 'INDIGO'],
            food: ['PIZZA', 'HAMBURGER', 'CHOCOLATE', 'STRAWBERRY', 'PINEAPPLE', 'SANDWICH', 'SPAGHETTI', 'AVOCADO'],
            technology: ['COMPUTER', 'INTERNET', 'SMARTPHONE', 'KEYBOARD', 'ALGORITHM', 'DATABASE', 'WIRELESS', 'BLUETOOTH']
        };
        
        this.hangmanStages = [
            // Stage 0 - Empty gallows
            `
  ╭─────────╮
  │         │
  │         
  │         
  │         
  │         
╭─┴─╮
│   │
╰───╯`,
            // Stage 1 - Head
            `
  ╭─────────╮
  │         │
  │         😵
  │         
  │         
  │         
╭─┴─╮
│   │
╰───╯`,
            // Stage 2 - Body
            `
  ╭─────────╮
  │         │
  │         😵
  │         │
  │         │
  │         
╭─┴─╮
│   │
╰───╯`,
            // Stage 3 - Left arm
            `
  ╭─────────╮
  │         │
  │         😵
  │        ╱│
  │         │
  │         
╭─┴─╮
│   │
╰───╯`,
            // Stage 4 - Right arm
            `
  ╭─────────╮
  │         │
  │         😵
  │        ╱│╲
  │         │
  │         
╭─┴─╮
│   │
╰───╯`,
            // Stage 5 - Left leg
            `
  ╭─────────╮
  │         │
  │         😵
  │        ╱│╲
  │         │
  │        ╱ 
╭─┴─╮
│   │
╰───╯`,
            // Stage 6 - Right leg (game over)
            `
  ╭─────────╮
  │         │
  │         💀
  │        ╱│╲
  │         │
  │        ╱ ╲
╭─┴─╮
│   │
╰───╯`
        ];
        
        this.currentWord = '';
        this.currentCategory = '';
        this.guessedLetters = [];
        this.wrongGuesses = 0;
        this.maxWrongGuesses = 6;
        this.gameWon = false;
        this.gameOver = false;
        this.score = 0;
        this.hintsUsed = 0;
        
        this.initializeGame();
        this.setupEventListeners();
    }
    
    initializeGame() {
        this.selectRandomWord();
        this.displayWord();
        this.displayHangman();
        this.createAlphabetGrid();
        this.updateGameInfo();
        this.resetGameStatus();
    }
    
    selectRandomWord() {
        const categories = Object.keys(this.words);
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const wordsInCategory = this.words[randomCategory];
        
        this.currentCategory = randomCategory.charAt(0).toUpperCase() + randomCategory.slice(1);
        this.currentWord = wordsInCategory[Math.floor(Math.random() * wordsInCategory.length)];
        
        document.getElementById('category').textContent = `Category: ${this.currentCategory}`;
    }
    
    displayWord() {
        const container = document.getElementById('word-container');
        container.innerHTML = '';
        
        for (let letter of this.currentWord) {
            const letterBox = document.createElement('div');
            letterBox.className = 'letter-box';
            
            if (letter === ' ') {
                letterBox.style.border = 'none';
                letterBox.style.background = 'transparent';
            } else if (this.guessedLetters.includes(letter)) {
                letterBox.textContent = letter;
                letterBox.classList.add('revealed');
            } else {
                letterBox.textContent = '';
            }
            
            container.appendChild(letterBox);
        }
    }
    
    displayHangman() {
        const hangmanArt = document.getElementById('hangman-art');
        hangmanArt.textContent = this.hangmanStages[this.wrongGuesses];
    }
    
    createAlphabetGrid() {
        const container = document.getElementById('alphabet-grid');
        container.innerHTML = '';
        
        for (let i = 65; i <= 90; i++) {
            const letter = String.fromCharCode(i);
            const button = document.createElement('button');
            button.className = 'alphabet-btn';
            button.textContent = letter;
            button.addEventListener('click', () => this.guessLetter(letter));
            container.appendChild(button);
        }
    }
    
    setupEventListeners() {
        const letterInput = document.getElementById('letter-input');
        const guessBtn = document.getElementById('guess-btn');
        const newGameBtn = document.getElementById('new-game-btn');
        const hintBtn = document.getElementById('hint-btn');
        const playAgainBtn = document.getElementById('play-again-btn');
        
        letterInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');
        });
        
        letterInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleGuess();
            }
        });
        
        guessBtn.addEventListener('click', () => this.handleGuess());
        newGameBtn.addEventListener('click', () => this.newGame());
        hintBtn.addEventListener('click', () => this.giveHint());
        playAgainBtn.addEventListener('click', () => {
            this.hideModal();
            this.newGame();
        });
        
        // Close modal when clicking outside
        document.getElementById('game-over-modal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.hideModal();
            }
        });
    }
    
    handleGuess() {
        const letterInput = document.getElementById('letter-input');
        const letter = letterInput.value.trim();
        
        if (letter && !this.guessedLetters.includes(letter)) {
            this.guessLetter(letter);
            letterInput.value = '';
        }
    }
    
    guessLetter(letter) {
        if (this.gameOver || this.guessedLetters.includes(letter)) {
            return;
        }
        
        this.guessedLetters.push(letter);
        
        const alphabetBtns = document.querySelectorAll('.alphabet-btn');
        const targetBtn = Array.from(alphabetBtns).find(btn => btn.textContent === letter);
        
        if (this.currentWord.includes(letter)) {
            // Correct guess
            if (targetBtn) {
                targetBtn.classList.add('correct');
                targetBtn.classList.add('disabled');
            }
            this.displayWord();
            this.checkWin();
        } else {
            // Wrong guess
            if (targetBtn) {
                targetBtn.classList.add('incorrect');
                targetBtn.classList.add('disabled');
            }
            this.wrongGuesses++;
            this.displayHangman();
            this.checkLoss();
        }
        
        this.updateGameInfo();
    }
    
    giveHint() {
        if (this.gameOver || this.hintsUsed >= 2) {
            return;
        }
        
        const unguessedLetters = [];
        for (let letter of this.currentWord) {
            if (letter !== ' ' && !this.guessedLetters.includes(letter)) {
                unguessedLetters.push(letter);
            }
        }
        
        if (unguessedLetters.length > 0) {
            const randomLetter = unguessedLetters[Math.floor(Math.random() * unguessedLetters.length)];
            this.guessLetter(randomLetter);
            this.hintsUsed++;
            this.score = Math.max(0, this.score - 10); // Penalty for using hint
            
            if (this.hintsUsed >= 2) {
                document.getElementById('hint-btn').disabled = true;
            }
        }
    }
    
    checkWin() {
        const wordLetters = this.currentWord.replace(/\s/g, '');
        const uniqueLetters = [...new Set(wordLetters)];
        const guessedWordLetters = uniqueLetters.filter(letter => this.guessedLetters.includes(letter));
        
        if (guessedWordLetters.length === uniqueLetters.length) {
            this.gameWon = true;
            this.gameOver = true;
            this.score += (this.maxWrongGuesses - this.wrongGuesses) * 10 + this.currentWord.length * 5;
            
            const statusElement = document.getElementById('game-status');
            statusElement.textContent = '🎉 Congratulations! You won! 🎉';
            statusElement.className = 'game-status win';
            
            setTimeout(() => {
                this.showModal('🎉 You Won! 🎉', `Great job! You guessed "${this.currentWord}" correctly!`);
            }, 1000);
        }
    }
    
    checkLoss() {
        if (this.wrongGuesses >= this.maxWrongGuesses) {
            this.gameOver = true;
            
            const statusElement = document.getElementById('game-status');
            statusElement.textContent = `😢 Game Over! The word was "${this.currentWord}"`;
            statusElement.className = 'game-status lose';
            
            // Disable all alphabet buttons
            document.querySelectorAll('.alphabet-btn').forEach(btn => {
                btn.classList.add('disabled');
            });
            
            setTimeout(() => {
                this.showModal('💀 Game Over 💀', `The word was "${this.currentWord}". Better luck next time!`);
            }, 1000);
        }
    }
    
    updateGameInfo() {
        const wrongGuessesElement = document.getElementById('wrong-guesses');
        const scoreElement = document.getElementById('score');
        const guessedLettersElement = document.getElementById('guessed-letters');
        
        wrongGuessesElement.textContent = `Wrong guesses: ${this.wrongGuesses}/${this.maxWrongGuesses}`;
        if (this.wrongGuesses >= 4) {
            wrongGuessesElement.classList.add('danger');
        } else {
            wrongGuessesElement.classList.remove('danger');
        }
        
        scoreElement.textContent = `Score: ${this.score}`;
        
        const incorrectLetters = this.guessedLetters.filter(letter => !this.currentWord.includes(letter));
        guessedLettersElement.textContent = `Guessed letters: ${this.guessedLetters.join(', ') || 'None'}`;
    }
    
    showModal(title, message) {
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-message').textContent = message;
        document.getElementById('game-over-modal').classList.remove('hidden');
    }
    
    hideModal() {
        document.getElementById('game-over-modal').classList.add('hidden');
    }
    
    resetGameStatus() {
        const statusElement = document.getElementById('game-status');
        statusElement.textContent = '';
        statusElement.className = 'game-status';
    }
    
    newGame() {
        this.currentWord = '';
        this.currentCategory = '';
        this.guessedLetters = [];
        this.wrongGuesses = 0;
        this.gameWon = false;
        this.gameOver = false;
        this.hintsUsed = 0;
        
        document.getElementById('hint-btn').disabled = false;
        document.getElementById('letter-input').value = '';
        
        this.initializeGame();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new HangmanGame();
});

// Add some visual effects
document.addEventListener('DOMContentLoaded', () => {
    // Add particle effect for background
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'rgba(255, 255, 255, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = '-10px';
        particle.style.zIndex = '1';
        
        document.body.appendChild(particle);
        
        const animation = particle.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 10}px) rotate(360deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'linear'
        });
        
        animation.onfinish = () => {
            particle.remove();
        };
    }
    
    // Create particles every 500ms
    setInterval(createParticle, 500);
});