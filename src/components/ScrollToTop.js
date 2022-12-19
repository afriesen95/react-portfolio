import React, { useState } from "react";
import styled from "styled-components";
import { FaArrowCircleUp } from "react-icons/fa";

// how many pixels you can scroll down before the button appears
const threshold = 100;

const TopButton = styled.button`
    position: fixed;
    bottom: 1%;
    right: 1%;
    z-index: 9999;
    background-color: transparent;
    cursor: pointer;
`;

const goToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};

const ScrollToTop = ({ iconSize = 50 }) => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        setVisible(
            document.documentElement.scrollTop > threshold ||
                document.body.scrollTop > threshold
        );
    };

    window.addEventListener("scroll", toggleVisible);

    return (
        <TopButton
            onClick={goToTop}
            style={{ display: visible ? "block" : "none" }}
        >
            <FaArrowCircleUp size={iconSize} />
        </TopButton>
    );
};

export default ScrollToTop;
