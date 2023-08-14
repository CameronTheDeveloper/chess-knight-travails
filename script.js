const board = () => {
    return {
        moves: new Map(),
        addPos(move) {
            this.moves.set(move, []);
        },
        addMove(move1, move2) {
            this.moves.get(move1).push(move2);
            // this.moves.get(move2).push(move1);  //Undirected
        },
        showMoves() {
            console.log(this.moves);
            const vertexKey = this.moves.keys();
            for (let move of vertexKey) {
                const adjMoves = this.moves.get(move);
                for (let adjMove of adjMoves) {
                    // console.log(move, '=>', adjMove);
                    // console.log(adjMove);
                }
            }
        },
        findShortestPath(startingPos, destination) {
            //if visited == false{}
            let queue = [];
            let visited = {};
            let pathAr = [];

            let readQueue = (pos) => {
                queue.push(pos);
                while (queue.length > 0) {
                    let currentNode = queue.shift();
                    if (!currentNode.visited) {
                        visited[currentNode] = true;
                        pathAr.push(currentNode);
                        if (currentNode[0] === destination[0] &&
                            currentNode[1] === destination[1]) {
                            return pathAr;
                        }
                        // readQueue(currentNode);
                    }

                }
            };

            readQueue(move);
            //Need to stop visiting the same adjList
            // let move = this.getMove(startingPos[0], startingPos[1]);

            let adjMoves = this.moves.get(move);
            for (let adjMove of adjMoves) {
                readQueue(adjMove);
            }   //Check if readQueue needs recursion even though this loop itterates
            return pathAr;//
        },
    };
};

const getPositionAr = () => {
    let positionAr = [];
    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 8; j++) {
            let move = [j, i];
            positionAr.push(move);
        }
    }
    return positionAr;
};

const connectMoves = (chessBoard, positionAr) => {
    let moveX = [2, 1, -1, -2, -2, -1, 1, 2];
    let moveY = [1, 2, 2, 1, -1, -2, -2, -1];
    // let visited = {};
    for (let move of positionAr) {
        for (let i = 0; i < moveX.length; i++) {
            let xPos = move[0] + moveX[i];
            let yPos = move[1] + moveY[i];
            if (xPos >= 1 && yPos >= 1 && xPos <= 8 && yPos <= 8) {
                let adjMove = [xPos, yPos];
                chessBoard.addMove(move, adjMove);
                // console.log(xPos, yPos);
            }
        }
    }
};

const driver = () => {
    const chessBoard = board();
    const positionAr = getPositionAr();

    for (let i = 0; i < positionAr.length; i++) {
        let move = positionAr[i];
        chessBoard.addPos(move);
    }
    connectMoves(chessBoard, positionAr);
    chessBoard.showMoves();

    console.log();
    const start = [1, 1];
    const dest = [5, 5];
    // chessBoard.showMoves();
    // console.log('Path: ', chessBoard.findShortestPath(start, dest));
};

driver();
