class Game{
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', '']
        this.currentPlayer = 'X'
        this.gameActive = true
    }

    switchPlayer(){
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'
        document.querySelector('#status').innerText = `Player ${this.currentPlayer}'s turn`
    }

    resetGame(){
        this.board = ['', '', '', '', '', '', '', '', '']
        this.currentPlayer = 'X'
        this.gameActive = true

        for (const cell of cells){
            cell.innerText = ''
        }

        document.querySelector('#status').innerText = 'Player X\'s turn'
    }
    
    checkWinner(){
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
            if (this.board[a] !== '' &&
                this.board[a] === this.board[b] &&
                this.board[a] === this.board[c]
            ) {
                document.querySelector('#status').innerText = `Player ${this.currentPlayer} wins!`
                this.gameActive = false
                return true

            }
        }
        if (!this.board.includes('')){
            document.querySelector('#status').innerText = `DRAW!!!`
            this.gameActive = false
            return true
        }
        return false
    }

    markCell(cell) {
        if (!this.gameActive){
            return 
        }
        
        if (cell.innerText !== ''){
            return 
        }

        const index = cell.dataset.index

        cell.innerText = this.currentPlayer
        this.board[index] = this.currentPlayer

        const gameOver = this.checkWinner()
        if (gameOver){
            return 
        }
        this.switchPlayer()
    }
}

const cells = document.querySelectorAll('.cell')

const game = new Game()

document.querySelector('#restart').addEventListener('click', () => {
    game.resetGame()
})

for (const cell of cells) {
    cell.addEventListener('click', () => {
        game.markCell(cell)
    })
}
