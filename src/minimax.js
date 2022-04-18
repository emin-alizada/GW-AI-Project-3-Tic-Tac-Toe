import Board from "./board.js";
import Move from "./move.js";

class MiniMax {
    MAX_DEPTH = 4
    won = false
    mySymbol = ' ';
    opSymbol = ' ';
    maxSafeInteger = Number.MAX_SAFE_INTEGER
    minSafeInteger = Number.MIN_SAFE_INTEGER

    constructor(board, depth, alpha, beta, isMax) {
        let nodeValue = heuristicFunction(board, depth);

        if (depth == MAX_DEPTH || !board.anyMovesRemain() || this.won) {
            this.won = false;
            return nodeValue;
        }
        // Maximize
        if (isMax) {
            let maximumValue = minSafeInteger;
            for (let i = 0; i < board.getBoardSize(); i++) {
                for (let j = 0; j < board.getBoardSize(); j++) {
                    if (!board.isCellFilled(i, j)) {
                        board.setSymbolAt(i, j, this.mySymbol);
                        maximumValue = Math.max(maximumValue, miniMax(board,
                            depth + 1, alpha, beta, false));
                        board.setSymbolAt(i, j, ' ');
                        alpha = Math.max(alpha, maximumValue);
                        if (alpha >= beta) {
                            return maximumValue;
                        }
                    }
                }
            }
            return maximumValue;
            // Minimize
        } else {
            let minimumValue = maxSafeInteger;
            for (let i = 0; i < board.getBoardSize(); i++) {
                for (let j = 0; j < board.getBoardSize(); j++) {
                    if (!board.isCellFilled(i, j)) {
                        board.setSymbolAt(i, j, this.opSymbol);
                        minimumValue = Math.min(minimumValue, miniMax(board,
                            depth + 1, alpha, beta, true));
                        board.setSymbolAt(i, j, ' ');
                        beta = Math.min(beta, minimumValue);
                        if (alpha >= beta) {
                            return minimumValue;
                        }
                    }
                }
            }
            return minimumValue;
        }
    }


    getNextMove(board) {
        let nextMove = new Move(-1, -1);
        let bestValue = minSafeInteger;

        for (let i = 0; i < board.getBoardSize(); i++) {
            for (let j = 0; j < board.getBoardSize(); j++) {
                if (!board.isCellFilled(i, j)) {
                    board.setSymbolAt(i, j, this.mySymbol);
                    let moveValue = miniMax(board, 0, minSafeInteger,
                        maxSafeInteger, false);
                    board.setSymbolAt(i, j, EMPTY);
                    if (moveValue > bestValue) {
                        nextMove.x = i;
                        nextMove.y = j;
                        bestValue = moveValue;
                    }
                }
            }
        }
        console.log("BEST VALUE: " + bestValue);
        console.log("BEST MOVE ROW: " + nextMove.x);
        console.log("BEST MOVE COL: " + nextMove.y);
        return nextMove;
    }

    heuristicFunction(board, depth) {
        let value = 0;
        let bWidth = board.getBoardSize();
        let target = board.getTarget();

        let xcount = 0, ocount = 0;
        let xpcount = 0, opcount = 0;
        let maxXcount = 0, maxOcount = 0;

        for (let row = 0; row < bWidth; row++) {
            for (let col = 0; col < bWidth; col++) {
                let mark = board.getSymbolAt(row, col).getSymbol();

                if (mark == 'X') {
                    xcount++;
                    xpcount++;
                    ocount = 0;
                    opcount = 0;
                } else if (mark == 'O') {
                    ocount++;
                    opcount++;
                    xcount = 0;
                    xpcount = 0;
                } else {
                    xpcount++;
                    opcount++;
                }
                if (xpcount == target + 1) {
                    xpcount = target;
                    if (board.getSymbolAt(row, col - target) == 'X')
                        xcount--;
                }
                if (opcount == target + 1) {
                    opcount = target;
                    if (board.getSymbolAt(row, col - target) == 'O')
                        ocount--;
                }
                if (xpcount == target && maxXcount < xcount) {
                    maxXcount = xcount;
                }
                if (opcount == target && maxOcount < ocount) {
                    maxOcount = ocount;
                }
            }
            if (maxXcount == target) {
                this.won = true;
                // System.out.prletln("MaxXCount: " + maxXcount);
                if (this.mySymbol == 'X')
                    return (maxSafeInteger / 2) - depth;
                else
                    return (minSafeInteger / 2) + depth;
            }
            if (maxOcount == target) {
                this.won = true;
                // System.out.prletln("MaxOCount: " + maxOcount);
                if (this.mySymbol == 'O')
                    return (maxSafeInteger / 2) - depth;
                else
                    return (minSafeInteger / 2) + depth;
            }
            // if (this.mySymbol == 'X') value += (maxXcount * maxXcount) - (maxOcount *
            // maxOcount);
            // else value += (maxOcount * maxOcount) - (maxXcount * maxXcount);
            if (this.mySymbol == 'X')
                value += maxXcount - maxOcount;
            else
                value += maxOcount - maxXcount;
            xcount = 0;
            ocount = 0;
            maxXcount = 0;
            maxOcount = 0;
            xpcount = 0;
            opcount = 0;
        }

        // Find if any column is winning
        for (let col = 0; col < bWidth; col++) {
            for (let row = 0; row < bWidth; row++) {
                let mark = board.getSymbolAt(row, col).getSymbol();
                if (mark == 'X') {
                    xcount++;
                    xpcount++;
                    ocount = 0;
                    opcount = 0;
                } else if (mark == 'O') {
                    ocount++;
                    opcount++;
                    xcount = 0;
                    xpcount = 0;
                } else {
                    xpcount++;
                    opcount++;
                }
                if (xpcount == target + 1) {
                    xpcount = target;
                    if (board.getSymbolAt(col, row - target) == 'X')
                        xcount--;
                }
                if (opcount == target + 1) {
                    opcount = target;
                    if (board.getSymbolAt(col, row - target) == 'O')
                        ocount--;
                }
                if (xpcount == target && maxXcount < xcount) {
                    maxXcount = xcount;
                }
                if (opcount == target && maxOcount < ocount) {
                    maxOcount = ocount;
                }
            }
            if (maxXcount == target) {
                this.won = true;
                if (this.mySymbol == 'X')
                    return (maxSafeInteger / 2) - depth;
                else
                    return (minSafeInteger / 2) + depth;
            }
            if (maxOcount == target) {
                this.won = true;
                if (this.mySymbol == 'O')
                    return (maxSafeInteger / 2) - depth;
                else
                    return (minSafeInteger / 2) + depth;
            }
            if (this.mySymbol == 'X')
                value += maxXcount - maxOcount;
            else
                value += maxOcount - maxXcount;

            xcount = 0;
            ocount = 0;
            maxXcount = 0;
            maxOcount = 0;
            xpcount = 0;
            opcount = 0;
        }

        // Find if any diagonal is winning
        for (let i = 0; i < bWidth; i++) {
            let mark = board.getSymbolAt(i, i).getSymbol();
            if (mark == 'X') {
                xcount++;
                xpcount++;
                ocount = 0;
                opcount = 0;
            } else if (mark == 'O') {
                ocount++;
                opcount++;
                xcount = 0;
                xpcount = 0;
            } else {
                xpcount++;
                opcount++;
            }
            if (xpcount == target + 1) {
                xpcount = target;
                if (board.getSymbolAt(i - target, i - target) == 'X')
                    xcount--;
            }
            if (opcount == target + 1) {
                opcount = target;
                if (board.getSymbolAt(i - target, i - target) == 'O')
                    ocount--;
            }

            if (xpcount == target && maxXcount < xcount) {
                maxXcount = xcount;
            }
            if (opcount == target && maxOcount < ocount) {
                maxOcount = ocount;
            }
        }
        if (maxXcount == target) {
            this.won = true;
            if (this.mySymbol == 'X')
                return (maxSafeInteger / 2) - depth;
            else
                return (minSafeInteger / 2) + depth;
        }
        if (maxOcount == target) {
            this.won = true;
            if (this.mySymbol == 'O')
                return (maxSafeInteger / 2) - depth;
            else
                return (minSafeInteger / 2) + depth;
        }
        if (this.mySymbol == 'X')
            value += maxXcount - maxOcount;
        else
            value += maxOcount - maxXcount;

        xcount = 0;
        ocount = 0;
        maxXcount = 0;
        maxOcount = 0;
        xpcount = 0;
        opcount = 0;

        let indexMax = bWidth - 1;
        for (let i = 0; i <= indexMax; i++) {
            let mark = board.getSymbolAt(i, indexMax - i).getSymbol();
            if (mark == 'X') {
                xcount++;
                xpcount++;
                ocount = 0;
                opcount = 0;
            } else if (mark == 'O') {
                ocount++;
                opcount++;
                xcount = 0;
                xpcount = 0;
            } else {
                xpcount++;
                opcount++;
            }
            if (xpcount == target + 1) {
                xpcount = target;
                if (board.getSymbolAt(i - target, (indexMax - i) + target) == 'X')
                    xcount--;
            }
            if (opcount == target + 1) {
                opcount = target;
                if (board.getSymbolAt(i - target, (indexMax - i) + target) == 'O')
                    ocount--;
            }
            if (xpcount == target && maxXcount < xcount) maxXcount = xcount;

            if (opcount == target && maxOcount < ocount) maxOcount = ocount;

        }
        if (maxXcount == target) {
            this.won = true;
            if (this.mySymbol == 'X') return Math.floor(maxSafeInteger / 2) - depth;
            else return Math.floor(minSafeInteger / 2) + depth;
        }
        if (maxOcount == target) {
            this.won = true;
            if (this.mySymbol == 'O') return Math.floor(maxSafeInteger / 2) - depth;
            else return Math.floor(minSafeInteger / 2) + depth;
        }
        if (this.mySymbol == 'X')
            value += maxXcount - maxOcount;
        else
            value += maxOcount - maxXcount;

        if (value > 0)
            value -= depth;
        else
            value += depth;

        return value;
    }

}