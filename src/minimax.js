import Move from "./move.js";

let MAX_DEPTH = 5;

export const minimax = (board, depth, alpha, beta, isMax) => {
    let nodeValue = heuristicFunction(board, depth);

    if (depth === MAX_DEPTH || !board.anyMovesRemain() || board.won) {
        board.won = false;
        return nodeValue;
    }
    // Maximize
    if (isMax) {
        let maximumValue = Number.MIN_SAFE_INTEGER;
        for (let i = 0; i < board.getBoardSize(); i++) {
            for (let j = 0; j < board.getBoardSize(); j++) {
                if (!board.isCellFilled(i, j)) {
                    board.setSymbolAt(i, j, board.mySymbol);
                    maximumValue = Math.max(maximumValue, minimax(board,
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
    }
    // Minimize
    else {
        let minimumValue = Number.MAX_SAFE_INTEGER;
        for (let i = 0; i < board.getBoardSize(); i++) {
            for (let j = 0; j < board.getBoardSize(); j++) {
                if (!board.isCellFilled(i, j)) {
                    board.setSymbolAt(i, j, board.opSymbol);
                    minimumValue = Math.min(minimumValue, minimax(board,
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

const adjustMaxDepth = (boardSize) => {
    if (boardSize <= 4) {
        MAX_DEPTH = 4
    } else if (boardSize <= 6) {
        MAX_DEPTH = 3;
    } else {
        MAX_DEPTH = 2;
    }
};

export const getNextMove = (board) => {
    let nextMove = new Move(-1, -1);
    let bestValue = Number.MIN_SAFE_INTEGER;
    adjustMaxDepth(board.getBoardSize());

    console.log("trying to get next move")
    for (let i = 0; i < board.getBoardSize(); i++) {
        for (let j = 0; j < board.getBoardSize(); j++) {
            // console.log("In get next move: " + i + " " + j);
            if (!board.isCellFilled(i, j)) {
                board.setSymbolAt(i, j, board.mySymbol);
                let moveValue = minimax(board, 0, Number.MIN_SAFE_INTEGER,
                    Number.MAX_SAFE_INTEGER, false);
                board.setSymbolAt(i, j, " ");
                if (moveValue > bestValue) {
                    nextMove.x = i;
                    nextMove.y = j;
                    bestValue = moveValue;
                }
            }
        }
    }
    // console.log("BEST VALUE: " + bestValue);
    // console.log("BEST MOVE ROW: " + nextMove.x);
    // console.log("BEST MOVE COL: " + nextMove.y);
    return nextMove;
}

export const heuristicFunction = (board, depth) => {
    let value = 0;
    let bWidth = board.getBoardSize();
    let target = board.getTarget();

    let xcount = 0, ocount = 0;
    let xpcount = 0, opcount = 0;
    let maxXcount = 0, maxOcount = 0;

    const checkAndReset = () => {
        if (maxXcount === target) {
            board.won = true;

            if (board.mySymbol === 'X')
                return (Number.MAX_SAFE_INTEGER / 2) - depth;
            else
                return (Number.MIN_SAFE_INTEGER / 2) + depth;
        }
        if (maxOcount === target) {
            board.won = true;
            if (board.mySymbol === 'O')
                return (Number.MAX_SAFE_INTEGER / 2) - depth;
            else
                return (Number.MIN_SAFE_INTEGER / 2) + depth;
        }

        if (board.mySymbol === 'X')
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

    for (let row = 0; row < bWidth; row++) {
        for (let col = 0; col < bWidth; col++) {
            let mark = board.getSymbolAt(row, col);

            if (mark === 'X') {
                xcount++;
                xpcount++;
                ocount = 0;
                opcount = 0;
            } else if (mark === 'O') {
                ocount++;
                opcount++;
                xcount = 0;
                xpcount = 0;
            } else {
                xpcount++;
                opcount++;
            }
            if (xpcount === target + 1) {
                xpcount = target;
                if (board.getSymbolAt(row, col - target) === 'X')
                    xcount--;
            }
            if (opcount === target + 1) {
                opcount = target;
                if (board.getSymbolAt(row, col - target) === 'O')
                    ocount--;
            }
            if (xpcount === target && maxXcount < xcount) {
                maxXcount = xcount;
            }
            if (opcount === target && maxOcount < ocount) {
                maxOcount = ocount;
            }
        }

        const checkedValue = checkAndReset();
        if (checkedValue !== undefined)
            return checkedValue;
    }

    // Find if any column is winning
    for (let col = 0; col < bWidth; col++) {
        for (let row = 0; row < bWidth; row++) {
            let mark = board.getSymbolAt(row, col);
            if (mark === 'X') {
                xcount++;
                xpcount++;
                ocount = 0;
                opcount = 0;
            } else if (mark === 'O') {
                ocount++;
                opcount++;
                xcount = 0;
                xpcount = 0;
            } else {
                xpcount++;
                opcount++;
            }
            if (xpcount === target + 1) {
                xpcount = target;
                if (board.getSymbolAt(col, row - target) === 'X')
                    xcount--;
            }
            if (opcount === target + 1) {
                opcount = target;
                if (board.getSymbolAt(col, row - target) === 'O')
                    ocount--;
            }
            if (xpcount === target && maxXcount < xcount) {
                maxXcount = xcount;
            }
            if (opcount === target && maxOcount < ocount) {
                maxOcount = ocount;
            }
        }

        const checkedValue = checkAndReset();
        if (checkedValue !== undefined)
            return checkedValue;
    }

    // Find if any diagonal is winning
    for (let i = 0; i < bWidth; i++) {
        let mark = board.getSymbolAt(i, i);
        if (mark === 'X') {
            xcount++;
            xpcount++;
            ocount = 0;
            opcount = 0;
        } else if (mark === 'O') {
            ocount++;
            opcount++;
            xcount = 0;
            xpcount = 0;
        } else {
            xpcount++;
            opcount++;
        }
        if (xpcount === target + 1) {
            xpcount = target;
            if (board.getSymbolAt(i - target, i - target) === 'X')
                xcount--;
        }
        if (opcount === target + 1) {
            opcount = target;
            if (board.getSymbolAt(i - target, i - target) === 'O')
                ocount--;
        }

        if (xpcount === target && maxXcount < xcount) {
            maxXcount = xcount;
        }
        if (opcount === target && maxOcount < ocount) {
            maxOcount = ocount;
        }
    }

    const checkedValue = checkAndReset();
    if (checkedValue !== undefined)
        return checkedValue;

    let indexMax = bWidth - 1;
    for (let i = 0; i <= indexMax; i++) {
        let mark = board.getSymbolAt(i, indexMax - i);
        if (mark === 'X') {
            xcount++;
            xpcount++;
            ocount = 0;
            opcount = 0;
        } else if (mark === 'O') {
            ocount++;
            opcount++;
            xcount = 0;
            xpcount = 0;
        } else {
            xpcount++;
            opcount++;
        }
        if (xpcount === target + 1) {
            xpcount = target;
            if (board.getSymbolAt(i - target, (indexMax - i) + target) === 'X')
                xcount--;
        }
        if (opcount === target + 1) {
            opcount = target;
            if (board.getSymbolAt(i - target, (indexMax - i) + target) === 'O')
                ocount--;
        }
        if (xpcount === target && maxXcount < xcount) maxXcount = xcount;

        if (opcount === target && maxOcount < ocount) maxOcount = ocount;

    }
    if (maxXcount === target) {
        board.won = true;
        if (board.mySymbol === 'X') return Math.floor(Number.MAX_SAFE_INTEGER / 2) - depth;
        else return Math.floor(Number.MIN_SAFE_INTEGER / 2) + depth;
    }
    if (maxOcount === target) {
        board.won = true;
        if (board.mySymbol === 'O') return Math.floor(Number.MAX_SAFE_INTEGER / 2) - depth;
        else return Math.floor(Number.MIN_SAFE_INTEGER / 2) + depth;
    }
    if (board.mySymbol === 'X')
        value += maxXcount - maxOcount;
    else
        value += maxOcount - maxXcount;

    if (value > 0)
        value -= depth;
    else
        value += depth;

    return value;
}
