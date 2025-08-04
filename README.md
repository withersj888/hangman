# Hangman Game

A classic word guessing game implemented in Python. Available in both CLI and web browser versions. Try to guess the secret word letter by letter before the hangman drawing is complete!

## How to Play

### Game Rules
1. **Objective**: Guess the secret word by suggesting letters one at a time
2. **Correct Guesses**: When you guess a letter that's in the word, it gets revealed in all positions where it appears
3. **Wrong Guesses**: When you guess a letter that's not in the word, a part of the hangman gets drawn
4. **Winning**: Reveal all letters in the word before the hangman drawing is complete
5. **Losing**: If you make 6 wrong guesses, the hangman is complete and you lose

### Available Versions

#### 🌐 Web Browser Version (Recommended)
Experience the visually rich, interactive hangman game in your web browser!

**Requirements:**
- Python 3.x
- Flask (install with `pip install -r requirements.txt`)

**Running the Web Version:**
1. **Clone or download** this repository
2. **Navigate** to the game directory:
   ```bash
   cd hangman
   ```
3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
4. **Start the web server**:
   ```bash
   python3 app.py
   ```
   or on Windows:
   ```bash
   python app.py
   ```
5. **Open your browser** and go to: `http://localhost:5000`

**Web Version Features:**
- 🎨 Beautiful visual interface with gradient backgrounds
- 🖱️ Interactive virtual keyboard
- 📱 Responsive design that works on mobile devices
- ✨ Real-time hangman drawing updates
- 🎯 Color-coded feedback (green for correct, red for wrong guesses)
- 🎮 Smooth, modern gaming experience

#### 💻 CLI Version

**CLI Version Requirements:**
- Python 3.x (no additional packages required)

**Running the CLI Game:**
1. **Clone or download** this repository
2. **Navigate** to the game directory:
   ```bash
   cd hangman
   ```
3. **Run the game**:
   ```bash
   python3 hangman.py
   ```
   or on Windows:
   ```bash
   python hangman.py
   ```

#### CLI Gameplay Instructions
1. When the game starts, you'll see:
   - The number of letters in the secret word (shown as underscores)
   - A prompt to guess a letter
   
2. **Enter one letter at a time** when prompted
   - Only single letters are accepted
   - Letters are case-insensitive
   
3. **Track your progress**:
   - Correctly guessed letters appear in the word
   - Wrong guesses are counted (max 6 allowed)
   - Previously guessed letters are displayed
   - Hangman drawing shows your remaining chances

4. **Game continues until**:
   - You guess all letters (WIN! 🎉)
   - You make 6 wrong guesses (LOSE 💀)

5. **Play again**: After each game, you can choose to play another round

### Example Gameplay
```
Welcome to Hangman!
Try to guess the word letter by letter.
The word has 7 letters.

Word: _ _ _ _ _ _ _
Wrong guesses: 0/6
Guessed letters: 

Guess a letter: e
Good guess! 'E' is in the word.

Word: _ _ _ _ E _ _
Wrong guesses: 0/6
Guessed letters: E

Guess a letter: r
Good guess! 'R' is in the word.

Word: _ _ _ _ E R _
Wrong guesses: 0/6
Guessed letters: E, R

...continue guessing until you win or lose!
```

## Features

### Web Version
- **🎨 Modern Visual Design**: Beautiful gradient backgrounds and smooth animations
- **🖱️ Interactive Virtual Keyboard**: Click letters or use your physical keyboard
- **📱 Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **✨ Real-time Updates**: Instant visual feedback for all game actions
- **🎯 Smart Color Coding**: Green for correct guesses, red for wrong ones
- **🎮 Engaging User Experience**: Professional game interface with clear status indicators

### Both Versions
- **Random word selection** from a built-in word list
- **Visual hangman drawing** that progresses with wrong guesses
- **Input validation** (only accepts single letters)
- **Duplicate guess detection**
- **Case-insensitive** letter matching
- **Play multiple rounds** without restarting
- **Clear game state display** showing progress and remaining chances

## Screenshots

### Web Browser Version
![Hangman Web Game](https://github.com/user-attachments/assets/c36fa9d0-d49f-408f-b12b-cf9752e6a8b8)
*Clean, modern interface with interactive virtual keyboard*

![Hangman Game in Action](https://github.com/user-attachments/assets/5fad9de8-dab5-4d72-b62c-fb8fb8754b1d)
*Game in progress showing correct (green) and wrong (red) guesses with hangman drawing*

## Word List
The game includes a variety of words including:
- Programming terms (python, computer, keyboard)
- General vocabulary (mystery, challenge, victory)
- Game-related words (puzzle, player, score)

Enjoy playing Hangman in both CLI and web browser versions! 🎮

### Quick Start
- **For a rich visual experience**: Run `python3 app.py` and open `http://localhost:5000`
- **For classic CLI gameplay**: Run `python3 hangman.py`