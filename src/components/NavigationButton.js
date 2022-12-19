import { useEffect, useState } from "react";
import { ImMenu3, ImMenu4 } from "react-icons/im";
import styled from "styled-components";

const NavButton = styled.button`
    background-color: transparent;
`;

const NavigationButton = ({ iconSize = 50 }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const Icon = menuOpen ? ImMenu4 : ImMenu3;

    useEffect(() => {
        const nav = document.querySelector("#main-navigation");

        if (nav !== null) {
            nav.style.display = menuOpen ? "block" : "none";
            nav.style.visibility = menuOpen ? "visible" : "hidden";
        }
    }, [menuOpen]);

    return (
        <NavButton
            onClick={() => {
                setMenuOpen(!menuOpen);
            }}
        >
            <Icon size={iconSize} />
        </NavButton>
    );
};

export default NavigationButton;
