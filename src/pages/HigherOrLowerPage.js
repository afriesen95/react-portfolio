import React, { useEffect } from "react";
import Header from "../components/Header";
import HigherOrLower from "../components/HigherOrLower";
import ScrollToTop from "../components/ScrollToTop";

const HigherOrLowerPage = ({ theme, toggleTheme }) => {
    useEffect(() => {
        document.title = "Alex Friesen | Higher or Lower";
    }, []);

    return (
        <>
            <Header theme={theme} toggleTheme={toggleTheme} />
            <HigherOrLower />
            <ScrollToTop />
        </>
    );
};

export default HigherOrLowerPage;
