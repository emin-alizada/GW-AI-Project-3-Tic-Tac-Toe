export default class Board {
  boardSize
  constructor(board, remainingMoves, target) {
    this.board = board
    this.target = target
    this.remainingMoves = remainingMoves
  }

  createFromString(boardString, target) {
    let lines = boardString.split("\\n")
    let boardWidth = lines[0].length()
    boardSize = boardWidth
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
    return new Board(boardContent, availableMoves, target)
  }

  anyMovesRemain() {
    return this.remainingMoves > 0
  }

  getSymbolAt(row, column) {
    return this.board[row][column]
  }

  isCellFilled(row, column) {
    return this.board[row][column] != " "
  }

  setSymbolAt(row, column, newSymbol) {
    this.board[row][column] = newSymbol
    if (newSymbol != " ") this.remainingMoves--
    else this.remainingMoves++
  }

  getBoardSize() {
    return this.boardSize
  }

  getTarget() {
    return this.target
  }

  toString() {
    let sb = []
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        sb.append(this.board[i][j] == " " ? "-" : this.board[i][j].toString())
      }
      sb.push("\n")
    }
    sb.push("\n")
    return sb.toString()
  }
}
