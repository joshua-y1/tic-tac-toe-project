const cells = document.querySelectorAll('.cell')
let board = ['', '', '', '', '', '', '', '', '']
let currentPlayer = 'X'
let gameActive = true

document.querySelector('#restart').addEventListener('click', resetGame)

for (const cell of cells) {
    cell.addEventListener('click', markCell)
}

function markCell() {
    if (!gameActive){
        return 
    }
    
    if (this.innerText !== ''){
        return 
    }

    const index = this.dataset.index

    this.innerText = currentPlayer
    board[index] = currentPlayer

    const gameOver = checkWinner()
    if (gameOver){
        return 
    }
    switchPlayer()
}

function checkWinner(){
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for  (const combination of winningCombinations){
        const [a, b, c] = combination
        if (board[a] !== '' &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            document.querySelector('#status').innerText = `Player ${currentPlayer} wins!`
            gameActive = false
            return true

        }
    }
    if (!board.includes('')){
        document.querySelector('#status').innerText = `DRAW!!!`
        gameActive = false
        return true
    }
    return false
}

function switchPlayer(){
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    document.querySelector('#status').innerText = `Player ${currentPlayer}'s turn`
}

function resetGame(){
    board = ['', '', '', '', '', '', '', '', '']
    currentPlayer = 'X'
    gameActive = true

    for (const cell of cells){
        cell.innerText = ''
    }

    document.querySelector('#status').innerText = `Player X's turn`
}


