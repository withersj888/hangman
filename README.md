# Hangman Game

A classic word guessing game implemented in Python. Try to guess the secret word letter by letter before the hangman drawing is complete!

## How to Play

### Game Rules
1. **Objective**: Guess the secret word by suggesting letters one at a time
2. **Correct Guesses**: When you guess a letter that's in the word, it gets revealed in all positions where it appears
3. **Wrong Guesses**: When you guess a letter that's not in the word, a part of the hangman gets drawn
4. **Winning**: Reveal all letters in the word before the hangman drawing is complete
5. **Losing**: If you make 6 wrong guesses, the hangman is complete and you lose

### How to Run the Game

#### Requirements
- Python 3.x (no additional packages required)

#### Running the Game
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

#### Gameplay Instructions
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
- **Random word selection** from a built-in word list
- **Visual hangman drawing** that progresses with wrong guesses
- **Input validation** (only accepts single letters)
- **Duplicate guess detection**
- **Case-insensitive** letter matching
- **Play multiple rounds** without restarting
- **Clear game state display** showing progress and remaining chances

## Word List
The game includes a variety of words including:
- Programming terms (python, computer, keyboard)
- General vocabulary (mystery, challenge, victory)
- Game-related words (puzzle, player, score)

Enjoy playing Hangman! 🎮