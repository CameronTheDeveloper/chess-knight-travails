const knight = () => {
    return {
        connectMoves(chessBoard, positionAr) {
            let moveX = [2, 1, -1, -2, -2, -1, 1, 2];
            let moveY = [1, 2, 2, 1, -1, -2, -2, -1];
            for (let pos of positionAr) {
                for (let i = 0; i < moveX.length; i++) {
                    let xPos = pos.x + moveX[i];
                    let yPos = pos.y + moveY[i];
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
        path: `[${x}, ${y}]`,
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
            console.log(this.moves);
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
                if (posKey.x === pos[0] &&
                    posKey.y === pos[1]) {
                    let adjMoves = this.moves.get(posKey);
                    // console.log('adjMoves: ', adjMoves);
                    return adjMoves;
                }
            }
        },
        getVertex(pos) {
            const posKeys = this.moves.keys();
            for (let posKey of posKeys) {
                if (posKey.x === pos[0] &&
                    posKey.y === pos[1]) {
                    return posKey;
                }
            }
        },
        findShortestPath(startingPos, destination) {
            let queue = [startingPos];
            let visited = {};
            let count = 0;

            const checkMatch = (currentPos) => {
                if (currentPos[0] === destination[0] &&
                    currentPos[1] === destination[1]) {
                    return true;
                }
            };
            const addPosPath = (pos, prevPosPath = '') => {
                let currentPos = this.getVertex(pos);
                currentPos.path = prevPosPath;
                currentPos.path += ` [${pos.join(', ')}]`;
            };

            const readQueue = () => {
                let pos = queue.shift();
                let currentPos = this.getVertex(pos);
                let adjMoves = this.moves.get(currentPos);
                if (checkMatch(pos)) {
                    return currentPos.path;
                } else {
                    for (let adjMove of adjMoves) {
                        if (!visited[adjMove]) {
                            queue.push(adjMove);
                            addPosPath(adjMove, currentPos.path);
                            visited[adjMove] = true;
                            // console.log('queue: ', queue);
                        }
                    }

                    return readQueue();


                }
            };

            let path = readQueue();
            return path;
        },
    };
};

const getPositionAr = () => {
    let positionAr = [];
    for (let x = 1; x <= 8; x++) {
        for (let y = 1; y <= 8; y++) {
            let newPos = position(x, y);
            positionAr.push(newPos);
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

    const start = [1, 1];
    const dest = [8, 8];
    let pathToDest = chessBoard.findShortestPath(start, dest);
    let pathCount = pathToDest.split('] [');

    console.log(`Quickest path from ${start} to ${dest}:`);
    console.log();
    console.log(`It took ${pathCount.length - 1} moves or ${pathCount.length} positions`);
    console.log('Path:', pathToDest);
};

driver();
