import TicTacToe from './TicTacToe.js'
import PromptSync from 'prompt-sync'

function startGame() {
    const prompt = new PromptSync
    const playerOneName = prompt('Name for Player 1: ')
    const playerTwoName = prompt('Name for Player 2: ')

    console.log(`\nWELCOME ${playerOneName} & ${playerTwoName} to TicTacToe CLI Version`)

    let turn = Math.round(Math.random()) == 0 ? playerOneName : playerTwoName

    const ticTacToe = new TicTacToe([
        {
            name: playerOneName,
            symbol: 'X'
        },
        {
            name: playerTwoName,
            symbol: 'O'
        }
    ])

    do {
        console.log(`\nTURN: ${turn}`)

        ticTacToe.printBoard()

        let showPromptPosition = false;
        let x = ''
        let y = ''
        
        do {
            x = prompt('SET POSITION X: ')
            y = prompt('SET POSITION Y: ')

            showPromptPosition = !ticTacToe.isBoxValid(x, y) || ticTacToe.isBoxFilled(x, y)
            ticTacToe.setBox(x, y, ticTacToe.getSymbolByPlayerName(turn))

        } while (showPromptPosition)

        if (!ticTacToe.getWinner() && ticTacToe.areAllBoxesFilled()) {
            ticTacToe.resetBoard();
            console.log('NO WINNER! BOARD RESETED')
        }
        
        turn = turn == playerOneName ? playerTwoName : playerOneName

    } while(!ticTacToe.getWinner())

    ticTacToe.printBoard()
    console.log("\nWINNER: ", ticTacToe.getWinner())
}

startGame()