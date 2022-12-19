import React, { useState } from "react";
import styled from "styled-components";
import TicTacDogAI from "../classes/TicTacDogAI";
import {
    GameHeader,
    GameTitle,
    GameInstructions,
} from "../styles/CustomStyles";

//[0][1][2]
//[3][4][5]
//[6][7][8]
export const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const debugging = false;
const gapSize = 20;
const tileBorderSize = 5;
const noImage = "./images/blank.gif";

const ScoreText = styled.h3`
    user-select: none;
    position: absolute;
    font-size: 5.5em;
    justify-content: center;
    text-align: center;
    text-shadow: 5px 4px 2px black;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const ScoreImage = styled.img`
    user-select: none;
    width: 6em;
    margin: 10px 10px 0 10px;
    border-radius: 0%;
    border: ${tileBorderSize}px solid ${(props) => props.theme.border};
`;

const GridContainer = styled.div`
    user-select: none;
    display: grid;
    grid-column-gap: ${gapSize}px;
    grid-row-gap: ${gapSize}px;
    grid-template-columns: repeat(3, minmax(30%, 1fr));
    justify-content: center;
    margin: 0 auto;
    padding: 10px 0 0 0;
    width: 90%;

    @media (min-width: 768px) {
        grid-template-columns: repeat(3, minmax(200px, 10%));
    }
`;

const GameOverContainer = styled.div`
    user-select: none;
    position: absolute;
    z-index: 1;
    margin: 0 auto;
    padding: 50px 0px;
    width: 100%;
    justify-content: center;
    text-align: center;
    font-size: 10vw;
    background-color: ${(props) => props.theme.main}DD;

    @media (min-width: 768px) {
        font-size: 8vw;
    }
`;

const ScoreContainer = styled.div`
    user-select: none;
    position: relative;
`;

const GameSquare = styled.button`
    user-select: none;
    position: relative;
    box-sizing: border-box;
    border: ${tileBorderSize}px solid ${(props) => props.theme.border};
    background-color: ${(props) => props.theme.main};
    justify-content: center;
    text-align: center;

    ::before {
        content: "";
        display: block;
        padding-top: 100%;
        pointer-events: none;
    }

    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    :hover,
    :focus {
        background-color: ${(props) => props.theme.border}66;
    }

    @media (min-width: 768px) {
    }
`;

const PlayAgainButton = styled.button`
    width: 30%;
    padding: 10px;
    font-size: 2.5vw;
    border: 5px solid ${(props) => props.theme.border};
    background-color: ${(props) => props.theme.main};

    :hover,
    :focus {
        background-color: ${(props) => props.theme.body};
    }
`;

const allGameSquareImages = () => {
    return document.querySelectorAll(`${GameSquare} > img`);
};

const allGameSquareImagePaths = () => {
    return [...allGameSquareImages()].map((img) => img.getAttribute("src"));
};

const clearAllImages = () => {
    allGameSquareImages().forEach((img) => {
        img.setAttribute("src", noImage);
        img.setAttribute("alt", "");
    });
};

const findNameOfWinner = () => {
    // find the "src" attribute of all images
    const imagePaths = allGameSquareImagePaths();

    for (let i = 0; i < winningCombinations.length; i++) {
        // if any of the squares we are checking are empty, check the next combination immediately
        if (
            imagePaths[winningCombinations[i][0]] === noImage ||
            imagePaths[winningCombinations[i][1]] === noImage ||
            imagePaths[winningCombinations[i][2]] === noImage
        ) {
            continue;
        }

        // check for a win
        let result =
            imagePaths[winningCombinations[i][0]] ===
                imagePaths[winningCombinations[i][1]] &&
            imagePaths[winningCombinations[i][1]] ===
                imagePaths[winningCombinations[i][2]];

        // if someone won, find out who it was and break out of the loop
        if (result) {
            return imagePaths[winningCombinations[i][0]].includes("belle")
                ? "Belle"
                : "Mindy";
        }
    }

    // check if all tiles are taken, and if they are, return that the game was a draw
    let tilesTaken = 0;

    for (let i = 0; i < imagePaths.length; i++) {
        tilesTaken += imagePaths[i] !== noImage ? 1 : 0;
    }

    return tilesTaken === 9 ? "Neither Dog" : "";
};

const TicTacDog = () => {
    let playersTurn = true;
    const [gameActive, setGameActive] = useState(true);
    const [belleScore, setBelleScore] = useState(0);
    const [mindyScore, setMindyScore] = useState(0);
    const [winner, setWinner] = useState("");

    const changeTurnIndicator = () => {
        /*
        const playerImages = document.querySelectorAll(`${ScoreImage}`);

        if (!gameActive) {
            playerImages[0].style.borderWidth = `${tileBorderSize}px`;
            playerImages[1].style.borderWidth = `${tileBorderSize}px`;
        } else {
            if (playersTurn) {
                playerImages[0].style.borderWidth = `${tileBorderSize * 2}px`;
                playerImages[1].style.borderWidth = `${tileBorderSize}px`;
            } else {
                playerImages[0].style.borderWidth = `${tileBorderSize}px`;
                playerImages[1].style.borderWidth = `${tileBorderSize * 2}px`;
            }
        }*/
    };

    const validMove = (img) => {
        return gameActive && img != null && img.getAttribute("src") === noImage;
    };

    const endTurn = async (winner) => {
        if (winner === "") {
            playersTurn = !playersTurn;
            changeTurnIndicator();
            if (!playersTurn) {
                let img = await TicTacDogAI.makeMove(allGameSquareImages());
                makeMove(img);
            }
        } else {
            setWinner(winner);
            setGameActive(false);

            if (winner === "Belle") {
                setBelleScore(belleScore + 1);
            } else if (winner === "Mindy") {
                setMindyScore(mindyScore + 1);
            }
        }
    };

    const makeMove = (img) => {
        if (validMove(img)) {
            let dog = playersTurn ? "belle" : "mindy";

            img.setAttribute("src", `./images/${dog}.jpg`);
            img.setAttribute("alt", `${dog}`);

            endTurn(findNameOfWinner());
        }
    };

    const squareClicked = (e) => {
        const img = e.target.querySelector("img");

        if (validMove(img) && (playersTurn || debugging)) {
            makeMove(img, playersTurn);
        }
    };

    const restartGame = () => {
        clearAllImages();
        playersTurn = true;
        setWinner("");
        setGameActive(true);
    };

    let gameOverPanel;

    if (gameActive) {
        gameOverPanel = null;
    } else {
        gameOverPanel = (
            <GameOverContainer>
                {winner} Won!
                <br />
                <PlayAgainButton onClick={restartGame}>
                    Play Again?
                </PlayAgainButton>
            </GameOverContainer>
        );
    }

    return (
        <>
            <GameHeader>
                <ScoreContainer>
                    <ScoreImage src="./images/belle.jpg" alt="Belle Score" />
                    <ScoreText>{belleScore}</ScoreText>
                </ScoreContainer>
                <GameTitle>Tic-Tac-Dog</GameTitle>
                <ScoreContainer>
                    <ScoreImage src="./images/mindy.jpg" alt="Mindy Score" />
                    <ScoreText>{mindyScore}</ScoreText>
                </ScoreContainer>
            </GameHeader>
            <GameInstructions>
                You are Belle (left.) The AI is Mindy (right.) <br />
                Win by placing three of your dog in a row!
            </GameInstructions>
            {gameOverPanel}
            <GridContainer>
                <GameSquare onClick={squareClicked}>
                    <img src={noImage} alt="" />
                </GameSquare>
                <GameSquare onClick={squareClicked}>
                    <img src={noImage} alt="" />
                </GameSquare>
                <GameSquare onClick={squareClicked}>
                    <img src={noImage} alt="" />
                </GameSquare>
                <GameSquare onClick={squareClicked}>
                    <img src={noImage} alt="" />
                </GameSquare>
                <GameSquare onClick={squareClicked}>
                    <img src={noImage} alt="" />
                </GameSquare>
                <GameSquare onClick={squareClicked}>
                    <img src={noImage} alt="" />
                </GameSquare>
                <GameSquare onClick={squareClicked}>
                    <img src={noImage} alt="" />
                </GameSquare>
                <GameSquare onClick={squareClicked}>
                    <img src={noImage} alt="" />
                </GameSquare>
                <GameSquare onClick={squareClicked}>
                    <img src={noImage} alt="" />
                </GameSquare>
            </GridContainer>
        </>
    );
};

export default TicTacDog;
