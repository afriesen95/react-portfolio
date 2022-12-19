import React, { useEffect } from "react";
import Header from "../components/Header";
import ScrollToTop from "../components/ScrollToTop";
import TicTacDog from "../components/TicTacDog";

const TicTacDogPage = ({ theme, toggleTheme }) => {
    useEffect(() => {
        document.title = "Alex Friesen | Tic-Tac-Dog";
    }, []);

    return (
        <>
            <Header theme={theme} toggleTheme={toggleTheme} />
            <TicTacDog />
            <ScrollToTop />
        </>
    );
};

export default TicTacDogPage;
