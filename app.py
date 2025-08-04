#!/usr/bin/env python3
"""
Web-based Hangman Game
A Flask web application providing a browser-based hangman game experience.
"""

from flask import Flask, render_template, request, jsonify, session
import random
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)  # For session management

# List of words for the game (same as CLI version)
WORDS = [
    "python", "hangman", "computer", "programming", "game", "challenge",
    "word", "letter", "guess", "puzzle", "mystery", "solution",
    "keyboard", "alphabet", "victory", "defeat", "player", "score"
]

def get_random_word():
    """Return a random word from the word list."""
    return random.choice(WORDS).upper()

def get_hangman_drawing(wrong_guesses):
    """Return hangman drawing as a list of lines based on wrong guesses."""
    stages = [
        [],
        ["  +---+"],
        ["  +---+", "  |   |"],
        ["  +---+", "  |   |", "  |   O"],
        ["  +---+", "  |   |", "  |   O", "  |   |"],
        ["  +---+", "  |   |", "  |   O", "  |   |", "  |  /"],
        ["  +---+", "  |   |", "  |   O", "  |   |", "  |  / \\"],
        ["  +---+", "  |   |", "  |   O", "  |   |", "  |  / \\", "  |", "+---------+"]
    ]
    
    stage_index = min(wrong_guesses, len(stages) - 1)
    return stages[stage_index]

@app.route('/')
def index():
    """Main game page."""
    return render_template('index.html')

@app.route('/new_game', methods=['POST'])
def new_game():
    """Start a new game."""
    session['word'] = get_random_word()
    session['guessed_letters'] = []
    session['wrong_guesses'] = 0
    session['max_wrong_guesses'] = 6
    session['game_over'] = False
    session['won'] = False
    
    return jsonify({
        'word_length': len(session['word']),
        'word_display': ['_'] * len(session['word']),
        'guessed_letters': [],
        'wrong_guesses': 0,
        'max_wrong_guesses': 6,
        'hangman_drawing': get_hangman_drawing(0),
        'game_over': False,
        'won': False,
        'message': f"New game started! The word has {len(session['word'])} letters."
    })

@app.route('/guess', methods=['POST'])
def make_guess():
    """Process a letter guess."""
    if 'word' not in session:
        return jsonify({'error': 'No game in progress'})
    
    data = request.get_json()
    guess = data.get('letter', '').upper().strip()
    
    # Validate input
    if len(guess) != 1 or not guess.isalpha():
        return jsonify({'error': 'Please enter a single letter'})
    
    if guess in session['guessed_letters']:
        return jsonify({'error': 'You already guessed that letter'})
    
    if session.get('game_over', False):
        return jsonify({'error': 'Game is over'})
    
    # Process the guess
    session['guessed_letters'].append(guess)
    
    word = session['word']
    message = ""
    
    if guess in word:
        message = f"Good guess! '{guess}' is in the word."
    else:
        session['wrong_guesses'] += 1
        message = f"Sorry, '{guess}' is not in the word."
    
    # Create word display
    word_display = []
    for letter in word:
        if letter in session['guessed_letters']:
            word_display.append(letter)
        else:
            word_display.append('_')
    
    # Check win/lose conditions
    game_over = False
    won = False
    
    if all(letter in session['guessed_letters'] for letter in word):
        game_over = True
        won = True
        message = f"🎉 Congratulations! You won! The word was '{word}'."
    elif session['wrong_guesses'] >= session['max_wrong_guesses']:
        game_over = True
        won = False
        message = f"💀 Game Over! You lost. The word was '{word}'."
    
    session['game_over'] = game_over
    session['won'] = won
    
    return jsonify({
        'word_display': word_display,
        'guessed_letters': session['guessed_letters'],
        'wrong_guesses': session['wrong_guesses'],
        'max_wrong_guesses': session['max_wrong_guesses'],
        'hangman_drawing': get_hangman_drawing(session['wrong_guesses']),
        'game_over': game_over,
        'won': won,
        'message': message
    })

@app.route('/game_state', methods=['GET'])
def get_game_state():
    """Get current game state."""
    if 'word' not in session:
        return jsonify({'error': 'No game in progress'})
    
    word = session['word']
    word_display = []
    for letter in word:
        if letter in session.get('guessed_letters', []):
            word_display.append(letter)
        else:
            word_display.append('_')
    
    return jsonify({
        'word_display': word_display,
        'guessed_letters': session.get('guessed_letters', []),
        'wrong_guesses': session.get('wrong_guesses', 0),
        'max_wrong_guesses': session.get('max_wrong_guesses', 6),
        'hangman_drawing': get_hangman_drawing(session.get('wrong_guesses', 0)),
        'game_over': session.get('game_over', False),
        'won': session.get('won', False)
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)