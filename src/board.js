export default class Board {

  constructor(board, remainingMoves, target, boardSize, mySymbol, opSymbol) {
    this.board = board
    this.target = target
    this.remainingMoves = remainingMoves
    this.boardSize = boardSize
    this.mySymbol = mySymbol
    this.opSymbol = opSymbol
    this.won = false
  }

  static createFromString(boardString, target, mySymbol, opSymbol) {
    let lines = boardString.split("\n")
    let boardWidth = lines[0].length
    let boardContent = Array(boardWidth)
      .fill(null)
      .map(() => Array(boardWidth))
    let availableMoves = 0

    for (let row = 0; row < boardWidth; row++) {
      let line = [...lines[row]]
      for (let col = 0; col < line.length; col++) {
        if (line[col] === "X") boardContent[row][col] = "X"
        else if (line[col] === "O") boardContent[row][col] = "O"
        else {
          boardContent[row][col] = ' '
          availableMoves++
        }
      }
    }
    return new Board(boardContent, availableMoves, target, boardWidth, mySymbol, opSymbol)
  }

  anyMovesRemain() {
    return this.remainingMoves > 0
  }

  getSymbolAt(row, column) {
    return this.board[row][column]
  }

  isCellFilled(row, column) {
    return this.board[row][column] !== " "
  }

  setSymbolAt(row, column, newSymbol) {
    this.board[row][column] = newSymbol
    if (newSymbol !== " ") this.remainingMoves--
    else this.remainingMoves++
  }

  getBoardSize() {
    return this.boardSize
  }

  getTarget() {
    return this.target
  }

  // getMySymbol() {
  //   return this.mySymbol
  // }
  //
  // getOpSymbol() {
  //   return this.opSymbol
  // }
  //
  // getWon() {
  //   return this.won
  // }

  toString() {
    let sb = []
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        sb.push(this.board[i][j] == " " ? "-" : this.board[i][j])
      }
      sb.push("\n")
    }
    sb.push("\n")
    return sb.join("")
  }
}
