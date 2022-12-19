import React from "react";
import styled from "styled-components";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeButton = styled.button`
    background-color: transparent;
`;

const ThemeToggler = ({ theme, toggleTheme, iconSize = 50 }) => {
    const usingDarkTheme = theme === "darkTheme";
    const Icon = usingDarkTheme ? FaSun : FaMoon;

    return (
        <ThemeButton onClick={toggleTheme}>
            <Icon size={iconSize} />
        </ThemeButton>
    );
};

export default ThemeToggler;
