export default class TicTacToe {
    constructor(playerConfig) {
        this.__totalBoxes = 9
        this.__supportedSymbols = ['X', 'O']
        this.__players = playerConfig
        this.__boxFilled = 0
        this.__board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]
        this.__winCombinations = [
            [ [0, 0], [0, 1], [0, 2] ],
            [ [1, 0], [1, 1], [1, 2] ],
            [ [2, 0], [2, 1], [2, 2] ],
            [ [0, 0], [1, 0], [2, 0] ],
            [ [0, 1], [1, 1], [2, 1] ],
            [ [0, 2], [1, 2], [2, 2] ],
            [ [0, 0], [1, 1], [2, 2] ],
            [ [0, 2], [1, 1], [2, 0] ]
        ]
    }

    getPlayerNameBySymbol(symbol) {
        return (this.__players.find(player => player.symbol == symbol)?.name) || null
    }

    getSymbolByPlayerName(playerName) {
        return (this.__players.find(player => player.name == playerName)?.symbol) || null
    }
    
    resetBoard() {
        this.__boxFilled = 0
        this.__board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]
    }

    setBox(positionX, positionY, symbol) {
        if (!this.isBoxValid(positionX, positionY)) {
            console.error('WRONG POSITION')
            return
        }

        if (!this.__supportedSymbols.includes(symbol)) {
            console.error('SYMBOL IS NOT SUPPORTED')
            return
        }

        if (this.isBoxFilled(positionX, positionY)) {
            console.error('THIS POSITION ALREADY FILLED')
            return
        }

        this.__board[positionX][positionY] = symbol
        this.__boxFilled += 1
    }

    getBox(positionX, positionY) {
        try {
            return this.__board[positionX][positionY]

        } catch(error) {
            return null
        }
    }

    isBoxValid(positionX, positionY) {
        return positionX <= 2 && positionY <= 2
    }

    isBoxFilled(positionX, positionY) {
        try {
            return this.__board[positionX][positionY] != null

        } catch (error) {
            return true
        }
    }

    areAllBoxesFilled() {
        return this.__boxFilled == this.__totalBoxes
    }

    getWinner() {
        for (let combination of this.__winCombinations) {
            const symbols = [
                this.getBox(combination[0][0], combination[0][1]),
                this.getBox(combination[1][0], combination[1][1]),
                this.getBox(combination[2][0], combination[2][1])
            ]
            const symbolToCheck = symbols[0]

            if (symbols.every(symbol => symbol == null)) {
                continue
            }

            if (symbols.every(symbol => symbol == symbolToCheck))
                return this.getPlayerNameBySymbol(symbolToCheck)
        }

        return false
    }

    printBoard() {
        console.log('------')
        this.__board.forEach(row => {
            console.log(row.map(col => col != null ? col : '*').join('|'))
        });
    }
}