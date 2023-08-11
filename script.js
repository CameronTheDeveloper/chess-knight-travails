const board = () => {
    return {
        moves: new Map(),   // Holds adjacent moves
        addMove(move) {
            this.moves.set(move, []);
        },
        addEdge(move1, move2) {
            this.moves.get(move1).push(move2);
            // this.moves.get(move2).push(move1);  //Undirected
        },
        showMoves() {
            console.log(this.moves);
            const vertexKeys = this.moves.keys();     //Get vertices
            for (let vKey of vertexKeys) {     // Iterate vertices
                const adjMoves = this.moves.get(vKey);
                for (let adjMove of adjMoves) {
                    // console.log(adjMove);
                }
            }
        },
        findShortestPath(startingPos, destination) {


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
                chessBoard.addEdge(move, [xPos, yPos]);
            }
        }
    }
    chessBoard.showMoves();
};

const driver = () => {
    const chessBoard = board();
    const moveAr = getMovesArray();

    for (let i = 0; i < moveAr.length; i++) {
        let move = moveAr[i];
        chessBoard.addMove(move);
    }

    connectMoves(chessBoard, moveAr);
    // chessBoard.showMoves();
};

driver();
