#!/usr/bin/env python3
"""
Simple Hangman Game
A classic word guessing game where players try to guess a word letter by letter.
"""

import random

# List of words for the game
WORDS = [
    "python", "hangman", "computer", "programming", "game", "challenge",
    "word", "letter", "guess", "puzzle", "mystery", "solution",
    "keyboard", "alphabet", "victory", "defeat", "player", "score"
]

def get_random_word():
    """Return a random word from the word list."""
    return random.choice(WORDS).upper()

def display_word(word, guessed_letters):
    """Display the word with guessed letters revealed and others as underscores."""
    display = ""
    for letter in word:
        if letter in guessed_letters:
            display += letter + " "
        else:
            display += "_ "
    return display.strip()

def display_hangman(wrong_guesses):
    """Display the hangman drawing based on number of wrong guesses."""
    stages = [
        "",
        "  +---+",
        "  |   |",
        "  |   O",
        "  |   |",
        "  |  /",
        "  |  / \\",
        "  |",
        "+---------+"
    ]
    
    lines_to_show = min(wrong_guesses + 1, len(stages))
    return "\n".join(stages[:lines_to_show])

def play_hangman():
    """Main game loop."""
    word = get_random_word()
    guessed_letters = set()
    wrong_guesses = 0
    max_wrong_guesses = 6
    
    print("Welcome to Hangman!")
    print("Try to guess the word letter by letter.")
    print(f"The word has {len(word)} letters.")
    print()
    
    while wrong_guesses < max_wrong_guesses:
        # Display current state
        print(display_hangman(wrong_guesses))
        print()
        print(f"Word: {display_word(word, guessed_letters)}")
        print(f"Wrong guesses: {wrong_guesses}/{max_wrong_guesses}")
        print(f"Guessed letters: {', '.join(sorted(guessed_letters))}")
        print()
        
        # Check if word is complete
        if all(letter in guessed_letters for letter in word):
            print("🎉 Congratulations! You won!")
            print(f"The word was: {word}")
            return
        
        # Get player's guess
        guess = input("Guess a letter: ").upper().strip()
        
        # Validate input
        if len(guess) != 1 or not guess.isalpha():
            print("Please enter a single letter.")
            continue
            
        if guess in guessed_letters:
            print("You already guessed that letter.")
            continue
        
        # Process the guess
        guessed_letters.add(guess)
        
        if guess in word:
            print(f"Good guess! '{guess}' is in the word.")
        else:
            wrong_guesses += 1
            print(f"Sorry, '{guess}' is not in the word.")
        
        print()
    
    # Game over
    print(display_hangman(wrong_guesses))
    print()
    print("💀 Game Over! You lost.")
    print(f"The word was: {word}")

def main():
    """Main function to run the game."""
    while True:
        play_hangman()
        
        play_again = input("\nWould you like to play again? (y/n): ").lower().strip()
        if play_again != 'y' and play_again != 'yes':
            print("Thanks for playing!")
            break
        print("\n" + "="*50 + "\n")

if __name__ == "__main__":
    main()