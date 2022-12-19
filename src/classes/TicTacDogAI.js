import { winningCombinations } from "../components/TicTacDog.js";

// milliseconds
const moveDelay = 1000;

class TicTacDogAI {
    static makeMove = async (images) => {
        await new Promise((r) => setTimeout(r, moveDelay));
        return images[this.#determineMoveIndex(images)];
    };

    // null = blank
    // false = belle
    // true = mindy
    static #findSquareOwnership = (images) => {
        return [...images].map((img) =>
            img.getAttribute("src").includes("belle")
                ? false
                : img.getAttribute("src").includes("mindy")
                ? true
                : null
        );
    };

    static #takeOppositeCorner = (squares) => {
        let cornerIndexes = [0, 2, 6, 8];
        let oppositeCornerIndex = [];

        for (let i = 0; i < cornerIndexes.length; i++) {
            if (
                squares[cornerIndexes[i]] !== null &&
                squares[cornerIndexes[cornerIndexes.length - 1 - i]] === null
            ) {
                oppositeCornerIndex.push(
                    cornerIndexes[cornerIndexes.length - 1 - i]
                );
                break;
            }
        }

        return oppositeCornerIndex;
    };

    static #canWinOrBlock = (squares) => {
        let winIndex = [];
        let blockIndex = [];

        for (let i = 0; i < winningCombinations.length; i++) {
            // we want to check every combination of the three squares...
            let indexes = [0, 1, 2];

            // three combinations: 012, 201, 120
            for (let j = 0; j < 3; j++) {
                // only check for a win if the two indexes we are checking for equality (0, 1) are NOT null.
                if (
                    squares[winningCombinations[i][indexes[0]]] !== null &&
                    squares[winningCombinations[i][indexes[1]]] !== null
                ) {
                    if (
                        squares[winningCombinations[i][indexes[0]]] ===
                            squares[winningCombinations[i][indexes[1]]] &&
                        squares[winningCombinations[i][indexes[2]]] === null
                    ) {
                        // true = mindy, so if this is true, it's the AI, which means we should take the win
                        if (squares[winningCombinations[i][indexes[0]]]) {
                            winIndex.push(winningCombinations[i][indexes[2]]);
                            break;
                        } else {
                            blockIndex.push(winningCombinations[i][indexes[2]]);
                            // not breaking here as we might not win but have multiple blocks to choose from
                        }
                    }
                }

                // move the last index to the first slot.
                // this will let us check (0=1 & 2=null), then (2=0 & 1=null), then (1=2 & 0=null)
                indexes.unshift(indexes.pop());
            }
        }

        return winIndex.length > 0 ? winIndex : blockIndex;
    };

    static #isCenterSquareValid = (squares) => {
        return squares[4] === null ? [4] : [];
    };

    static #findValidCornerSquareIndexes = (squares) => {
        let cornerIndexes = [0, 2, 6, 8];
        let validCornerIndexes = [];

        for (let i = 0; i < cornerIndexes.length; i++) {
            if (squares[cornerIndexes[i]] === null) {
                validCornerIndexes.push(cornerIndexes[i]);
            }
        }

        return validCornerIndexes;
    };

    static #findAllValidSquareIndexes = (squares) => {
        let validSquareIndexes = [];

        for (let i = 0; i < 9; i++) {
            if (squares[i] === null) {
                validSquareIndexes.push(i);
            }
        }

        return validSquareIndexes;
    };

    static #pickOneFrom = (array) => {
        if (array.length === 1) return array[0];
        else return array[Math.floor(Math.random() * array.length)];
    };

    static #determineMoveIndex = (images) => {
        let moveToTake = 0;
        let moveList = [
            this.#canWinOrBlock,
            this.#takeOppositeCorner,
            this.#isCenterSquareValid,
            this.#findValidCornerSquareIndexes,
            this.#findAllValidSquareIndexes,
        ];

        const squareOwnership = this.#findSquareOwnership(images);

        for (let i = 0; i < moveList.length; i++) {
            let moves = moveList[i](squareOwnership);

            if (moves.length > 0) {
                moveToTake = this.#pickOneFrom(moves);
                break;
            }
        }

        return moveToTake;
    };
}

export default TicTacDogAI;
