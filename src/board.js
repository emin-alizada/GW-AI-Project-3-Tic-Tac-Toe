export default class Board {

  constructor(board, remainingMoves, target, boardSize) {
    this.board = board
    this.target = target
    this.remainingMoves = remainingMoves
    this.boardSize = boardSize
  }

  static createFromString(boardString, target) {
    let lines = boardString.split("\\n")
    let boardWidth = lines[0].length
    this.boardSize = boardWidth
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
    return new Board(boardContent, availableMoves, target, this.boardSize)
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
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        sb.append(this.board[i][j] == " " ? "-" : this.board[i][j].join(""))
      }
      sb.push("\n")
    }
    sb.push("\n")
    return sb.join("")
  }
}
