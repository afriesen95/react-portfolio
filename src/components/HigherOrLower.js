import React from "react";
import {
    GameHeader,
    GameTitle,
    GameInstructions,
} from "../styles/CustomStyles";
import styled from "styled-components";

let noCardImage = "./images/card_unknown.png";

const ErrorHeading = styled.h1`
    color: red;
`;

const InfoText = styled(GameInstructions)`
    text-align: center;
    font-size: 5vw;
    margin: 10px auto;

    @media (min-width: 768px) {
        font-size: 1.5em;
    }
`;

const Card = styled.div`
    padding: 2px;
    width: 100%;

    :nth-of-type(1) {
        margin-right: 10px;
    }
    :nth-of-type(2) {
        margin-left: 10px;
    }
`;

const CardTitle = styled.p`
    font-size: 1em;
    text-align: center;
    color: ${(props) => props.theme.border};

    @media (min-width: 768px) {
        font-size: 1.3em;
    }
`;

const CardImage = styled.img`
    box-sizing: border-box;
    border: 3px solid ${(props) => props.theme.border};
    border-radius: 5%;
    padding: 2px;
    width: 100%;
`;

const GameContainer = styled.div`
    width: 90%;
    margin: 0 auto;
    display: block;
    justify-content: center;
    align-items: center;

    @media (min-width: 768px) {
        max-width: 40em;
    }
`;

const GameCards = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const GameControls = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    width: 100%;
`;

const GameButton = styled.button`
    box-sizing: border-box;
    padding: 3px;
    margin: 5px 0;
    width: 100%;
    text-align: center;
    border-radius: 0%;
    font-size: 5vw;
    background-color: ${(props) => props.theme.main};
    color: ${(props) => props.theme.text};
    border: 3px solid ${(props) => props.theme.border};

    :hover,
    :focus {
        background-color: ${(props) => props.theme.body};
    }

    :active {
        background-color: ${(props) => props.theme.main};
    }

    @media (min-width: 768px) {
        font-size: 2.5em;
    }
`;

class HigherOrLower extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gameState: "draw",
            gameResult: "",
            score: 0,
            bestScore: 0,
            deckID: "",
            error: "",
            firstCard: { value: "", suit: "", image: `${noCardImage}` },
            secondCard: { value: "", suit: "", image: `${noCardImage}` },
        };
    }

    // when the component loads, load highscores and fetch a deck
    async componentDidMount() {
        this.setState(
            {
                bestScore: localStorage.getItem("higherOrLower_BestScore") || 0,
                deckID: localStorage.getItem("higherOrLower_DeckID"),
            },
            async () => {
                let deckData;
                let tries = 5;

                do {
                    deckData = await this.shuffleDeck();
                    if (deckData === null || !deckData["success"]) {
                        deckData = await this.fetchDeck();
                        tries--;
                    }
                } while (
                    tries > 0 &&
                    (deckData === null || !deckData["success"])
                );

                if (tries <= 0) {
                    this.setState({
                        error: "Could not fetch a deck, try refreshing the page.",
                    });
                } else {
                    this.setState({ deckID: deckData["deck_id"] }, () =>
                        localStorage.setItem(
                            "higherOrLower_DeckID",
                            this.state.deckID
                        )
                    );
                }
            }
        );
    }

    fetchDeck = async () => {
        try {
            return await fetch(
                "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
            ).then((response) => response.json());
        } catch (error) {
            return null;
        }
    };

    shuffleDeck = async () => {
        try {
            return await fetch(
                `https://deckofcardsapi.com/api/deck/${this.state.deckID}/shuffle/`
            ).then((response) => response.json());
        } catch (error) {
            this.setState({
                error: "Could not shuffle the deck, try refreshing the page.",
            });
            return null;
        }
    };

    fetchCards = async (n) => {
        try {
            return await fetch(
                `https://deckofcardsapi.com/api/deck/${this.state.deckID}/draw/?count=${n}`
            ).then((response) => response.json());
        } catch (error) {
            return null;
        }
    };

    nextCard = async () => {
        let cardData;
        let tries = 5;

        do {
            cardData = await this.fetchCards(1);

            if (cardData !== null && !cardData["success"]) {
                await this.shuffleDeck();
            }

            if (cardData === null) {
                tries--;
            }
        } while (tries > 0 && (cardData === null || !cardData["success"]));

        if (tries > 0) return cardData["cards"][0];
        else {
            this.setState({
                error: "Could not draw a card, try refreshing the page.",
            });
            return { value: "", suit: "", image: "" };
        }
    };

    drawCard = async () => {
        this.setState({ firstCard: await this.nextCard() }, () =>
            this.setState({ gameState: "guess" })
        );
    };

    // turns the letter values into actual numbers
    cardValueToNumber = (cardValue) => {
        switch (cardValue) {
            case "ACE":
                return 1;

            case "JACK":
                return 11;

            case "QUEEN":
                return 12;

            case "KING":
                return 13;

            default:
                return parseInt(cardValue);
        }
    };

    guess = async (guessedHigher) => {
        this.setState({ gameState: "result" }, async () => {
            this.setState({ secondCard: await this.nextCard() }, () => {
                let playerValue = this.cardValueToNumber(
                    this.state.firstCard.value
                );
                let drawnValue = this.cardValueToNumber(
                    this.state.secondCard.value
                );

                if (drawnValue === playerValue) {
                    this.setState({ result: "It's a tie!" });
                } else if (
                    (guessedHigher && drawnValue > playerValue) ||
                    (!guessedHigher && drawnValue < playerValue)
                ) {
                    this.setState(
                        (state) => ({
                            score: state.score + 1,
                            result: "Correct!",
                        }),
                        this.checkForNewBestScore
                    );
                } else {
                    this.setState({ score: 0, result: "Wrong!" });
                }
            });
        });
    };

    checkForNewBestScore = () => {
        if (
            (localStorage.getItem("higherOrLower_BestScore") || 0) <
            this.state.score
        ) {
            this.setState(
                (state) => ({ bestScore: state.score }),
                () => {
                    localStorage.setItem(
                        "higherOrLower_BestScore",
                        this.state.bestScore
                    );
                }
            );
        }
    };

    resetGame = async () => {
        await this.shuffleDeck().then(() => {
            this.setState({
                firstCard: { value: "", suit: "", image: `${noCardImage}` },
                secondCard: { value: "", suit: "", image: `${noCardImage}` },
                gameState: "draw",
                result: "",
            });
        });
    };

    render() {
        let errorMessage =
            this.state.error !== "" ? (
                <ErrorHeading>{this.state.error}</ErrorHeading>
            ) : null;

        let gameButtons;
        switch (this.state.gameState) {
            case "draw":
                gameButtons = (
                    <GameButton onClick={this.drawCard}>Draw Card</GameButton>
                );
                break;

            case "guess":
                gameButtons = (
                    <>
                        <GameButton onClick={() => this.guess(true)}>
                            Guess Higher
                        </GameButton>
                        <GameButton onClick={() => this.guess(false)}>
                            Guess Lower
                        </GameButton>
                    </>
                );
                break;

            case "result":
                gameButtons = (
                    <>
                        <GameButton onClick={this.resetGame}>
                            Play Again?
                        </GameButton>
                        <InfoText>{this.state.result}</InfoText>
                    </>
                );
                break;

            default:
                gameButtons = null;
                break;
        }

        return (
            <>
                {errorMessage}
                <GameHeader>
                    <GameTitle>Higher or Lower</GameTitle>
                </GameHeader>
                <GameInstructions>
                    Guess if the NEXT card will be higher or lower than your
                    card. The deck is shuffled after every round!
                    <br />
                    Built using &#0020;
                    <a
                        href="https://deckofcardsapi.com/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        deckofcardsapi.com
                    </a>
                </GameInstructions>
                <InfoText>
                    Score: {this.state.score} &nbsp; Best Score:{" "}
                    {this.state.bestScore}
                </InfoText>
                <GameContainer>
                    <GameCards>
                        <Card>
                            <CardTitle>Your Card</CardTitle>
                            <CardImage
                                src={this.state.firstCard.image}
                                alt={`${this.state.firstCard.value} ${this.state.firstCard.suit}`}
                            />
                        </Card>
                        <Card>
                            <CardTitle>Next Card</CardTitle>
                            <CardImage
                                src={this.state.secondCard.image}
                                alt={`${this.state.secondCard.value} ${this.state.secondCard.suit}`}
                            />
                        </Card>
                    </GameCards>
                    <GameControls>{gameButtons}</GameControls>
                </GameContainer>
            </>
        );
    }
}

export default HigherOrLower;
