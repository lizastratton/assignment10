
const words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

let wins = 0
let losses = 0
let currentWord

class Word {
  constructor(word) {
    this.word = word
    this.displayWord = word.replaceAll(/[\w]/g, "_")
    this.remainingGuesses = 10
    this.incorrectLetters = []
    this.correctLetters = []
  }

  // Check if the guessed letter is in the word
  guessLetter(letter) {
    if (this.correctLetters.includes(letter) ||
        this.incorrectLetters.includes(letter)) {
      return
    }

    if (this.word.includes(letter)) {
      this.correctLetters.push(letter)

      let updatedWord = ""

      for (let i = 0; i < this.word.length; i++) {
        if (this.correctLetters.includes(this.word[i])) {
          updatedWord += this.word[i]
        } else {
          updatedWord += "_"
        }
      }

      this.displayWord = updatedWord
    } else {
      this.incorrectLetters.push(letter)
      this.remainingGuesses--
    }
  }

  // Update the screen
  updateScreen() {
    document.getElementById('word-to-guess').textContent = this.displayWord
    document.getElementById('remaining-guesses').textContent = this.remainingGuesses
    document.getElementById('incorrect-letters').textContent = this.incorrectLetters.join(', ')
  }

  // Check if the game is over
  isGameOver() {
    if (this.remainingGuesses <= 0 || this.displayWord === this.word) {
      return true
    } else {
      return false
    }
  }

  // Check if the player won or lost
  getWinOrLoss() {
    if (this.displayWord === this.word && this.remainingGuesses > 0) {
      return "win"
    } else if (this.remainingGuesses <= 0 && this.displayWord !== this.word) {
      return "loss"
    } else {
      return null
    }
  }
}

function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)]
  currentWord = new Word(randomWord)
  currentWord.updateScreen()
}

document.onkeyup = function(e) {
  const pressedKey = e.key.toLowerCase()
  // early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return

  // pass in guessed letter to word obj
  currentWord.guessLetter(pressedKey)
  // allow word obj to update screen
  currentWord.updateScreen()

  // check if game is over
  const gameOver = currentWord.isGameOver()

  // if game is over, update wins/losses and start new game
  if (gameOver) {
    const previousWord = document.getElementById('previous-word')
    const winDisplay = document.getElementById('wins')
    const lossDisplay = document.getElementById('losses')
    previousWord.textContent = currentWord.word
    const result = currentWord.getWinOrLoss()
    if (result === 'win') {
      wins++
      winDisplay.textContent = wins
    } else if (result === 'loss') {
      losses++
      lossDisplay.textContent = losses
    }
    newGame()
  }
}

newGame()
