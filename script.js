const knight = () => {
    return {
        connectMoves(chessBoard, positionAr) {
            let moveX = [2, 1, -1, -2, -2, -1, 1, 2];
            let moveY = [1, 2, 2, 1, -1, -2, -2, -1];
            // let visited = {};
            for (let pos of positionAr) {
                for (let i = 0; i < moveX.length; i++) {
                    let xPos = pos[0] + moveX[i];
                    let yPos = pos[1] + moveY[i];
                    if (xPos >= 1 && yPos >= 1 && xPos <= 8 && yPos <= 8) {
                        let adjMove = [xPos, yPos];
                        chessBoard.addMove(pos, adjMove);
                    }
                }
            }
        },
    };
};

const position = (x, y) => {
    return {
        x: x,
        y: y,
        visited: false,
        path: [],
    };
};

const board = () => {
    return {
        moves: new Map(),
        addPos(pos) {
            this.moves.set(pos, []);
        },
        addMove(move1, move2) {
            this.moves.get(move1).push(move2);
            // this.moves.get(move2).push(move1);  //Undirected
        },
        showMoves() {
            const posKeys = this.moves.keys();
            // console.log('key:', posKeys);
            // let newPos = this.moves.get();
            for (let pos of posKeys) {
                const adjMoves = this.moves.get(pos);
                // const adjMoves = this.moves.get([1, 1]);
                // console.log(adjMoves);
                for (let adjMove of adjMoves) {
                    // console.log(pos, '=>', adjMove);
                    // console.log(adjMove);
                }
            }
        },
        getAdjMoves(pos) {
            const posKeys = this.moves.keys();
            for (let posKey of posKeys) {
                // console.log(posKey);
                if (posKey[0] === pos[0] &&
                    posKey[1] === pos[1]) {
                    let adjMoves = this.moves.get(posKey);
                    return adjMoves;
                }
            }
        },
        findShortestPath(startingPos, destination) {
            let queue = [];
            // let pathAr = [];
            let visited = {};
            let count = 0;

            let checkMatch = (currentPos) => {
                if (currentPos[0] === destination[0] &&
                    currentPos[1] === destination[1]) {
                    return true;
                }
            };
            //Compare pos to dest
            //If not match, add edges to queue

            //Might have to check if currentPos is farther away than pos
            let readQueue = (pos, pathAr = []) => {
                let newAr = pathAr;
                pathAr.push(pos);
                if (checkMatch(pos)) {
                    return pathAr;// Return new array instead
                }

                visited[pos] = true;
                let adjMoves = this.getAdjMoves(pos);
                count++;
                for (let adjMove of adjMoves) {
                    queue.push(adjMove);
                }
                let currentPos = queue.shift();
                while (visited[currentPos]) {
                    currentPos = queue.shift();
                }
                readQueue(currentPos);
            };

            readQueue(startingPos,);
            console.log('Count: ', count);

            return pathAr;
        },
    };
};

const getPositionAr = () => {
    let positionAr = [];
    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 8; j++) {
            let pos = [j, i];
            positionAr.push(pos);
        }
    }
    return positionAr;
};



const driver = () => {
    const chessBoard = board();
    const knight1 = knight();
    const positionAr = getPositionAr();

    for (let i = 0; i < positionAr.length; i++) {
        let move = positionAr[i];
        chessBoard.addPos(move);
    }
    knight1.connectMoves(chessBoard, positionAr);
    // chessBoard.showMoves();

    console.log();
    const start = [1, 1];
    const dest = [5, 1];
    // chessBoard.showMoves();
    console.log('Path: ');
    console.log(chessBoard.findShortestPath(start, dest));
};

driver();
