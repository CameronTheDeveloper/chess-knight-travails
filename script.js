const board = () => {
    return {
        moves: new Map(),   // Holds adjacent moves
        addMove(move) {
            this.moves.set(move, []);
        },
        addEdge(move1, move2) {
            this.moves.get(move1).push(move2);
            this.moves.get(move2).push(move1);  //Undirected
        },
        showMoves() {
            const vertexKeys = this.moves.keys();     //Get vertices

            for (let vKey of vertexKeys) {     // Iterate vertices
                const adjMoves = this.moves.get(vKey);
                console.log(adjMoves);
                for (let adjMove of adjMoves) {
                    // console.log(adjMove);
                }
            }
        },
        getMove(xPos, yPos) {
            let vertexKeys = this.moves.keys();
            for (let move of vertexKeys) {
                if (move[0] === xPos && move[1] === yPos) {
                    // console.log('MOVE', move);
                    return move;
                }
            }
        },
        findShortestPath(startingPos, destination, movesAr = []) {
            movesAr.push(startingPos);
            if (startingPos === destination) {
                return movesAr;
            }
            for (let adjPos of startingPos) {
                this.findShortestPath(adjPos, destination, movesAr);
            }
        }
    };
};

const getMovesArray = () => {
    let movesAr = [];
    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 8; j++) {
            let move = [j, i];
            movesAr.push(move);
        }
    }
    return movesAr;
};

const connectMoves = (chessBoard, moveAr) => {
    let moveX = [2, 1, -1, -2, -2, -1, 1, 2];
    let moveY = [1, 2, 2, 1, -1, -2, -2, -1];

    for (let move of moveAr) {
        for (let i = 0; i < moveX.length; i++) {
            let xPos = move[0] + moveX[i];
            let yPos = move[1] + moveY[i];
            if (xPos >= 1 && yPos >= 1 && xPos <= 8 && yPos <= 8) {
                let adjMove = chessBoard.getMove(xPos, yPos);
                chessBoard.addEdge(move, adjMove);
            }
        }
    }
};

const driver = () => {
    const chessBoard = board();
    const moveAr = getMovesArray();

    for (let i = 0; i < moveAr.length; i++) {
        let move = moveAr[i];
        chessBoard.addMove(move);
    }

    connectMoves(chessBoard, moveAr);
    chessBoard.showMoves();
};

driver();
