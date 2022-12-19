import React, { useState, useEffect } from "react";

// milliseconds
const delayBetweenLetters = 25;
const delayBetweenPhrases = 4250;

const flavorTexts = [
    "loves cute dogs.",
    "thinks React is neat.",
    "is not a designer. go easy!",
    "thinks hamburger menus are neat.",
    "wants you to try Tic-Tac-Dog.",
    "added cute dogs to the 404 page.",
    "adds mini-projects to the menu.",
];

let flavorTextIndex = 0;

// to anyone reading this: there are VERY SIMPLE libraries for this. I should have known! oh well.
const FlavorTextRotator = () => {
    const [flavorText, setFlavorText] = useState(flavorTexts[0]);

    useEffect(() => {
        const rotateFlavorText = async () => {
            await deleteCurrentFlavorText();
            await addNewFlavorText();
        };

        const deleteCurrentFlavorText = async () => {
            // delete old flavor text one letter at a time
            let currentFlavorText = flavorText;
            for (let i = currentFlavorText.length; i > 0; i--) {
                let text = currentFlavorText.substring(0, i - 1);
                setFlavorText(text);

                //thanks StackOverflow, because apparently JavaScript does not have a simple way to sleep?
                await new Promise((r) => setTimeout(r, delayBetweenLetters));
            }
        };

        const addNewFlavorText = async () => {
            flavorTextIndex++;
            if (flavorTextIndex >= flavorTexts.length) {
                flavorTextIndex = 0;
            }

            // add new flavor text one letter at a time
            let newFlavorText = flavorTexts[flavorTextIndex];
            for (let i = 0; i < newFlavorText.length; i++) {
                let text = newFlavorText.substring(0, i + 1);
                setFlavorText(text);

                //thanks StackOverflow, because apparently JavaScript does not have a simple way to sleep?
                await new Promise((r) => setTimeout(r, delayBetweenLetters));
            }
        };

        const rotateFlavorTextInterval = setInterval(
            rotateFlavorText,
            delayBetweenPhrases
        );

        return function cleanup() {
            clearInterval(rotateFlavorTextInterval);
        };
    }, [flavorText]);

    return <i>[{flavorText}]</i>;
};

export default FlavorTextRotator;
