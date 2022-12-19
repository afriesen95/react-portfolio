import styled from "styled-components";
import { Link } from "react-router-dom";

const Nav = styled.nav`
    position: relative;
    margin-bottom: 10px;
    height: auto;
    visibility: hidden;
`;

const NavList = styled.ul`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 90%;
    justify-content: center;
    align-items: center;

    @media (min-width: 768px) {
        flex-flow: row wrap;
    }
`;

const NavListItem = styled.ul`
    text-decoration: none;
    font-weight: bold;
    font-size: 1.8em;
    padding: 5px 0px;
    text-align: left;
    text-shadow: 2px 2px 2px ${(props) => props.theme.body};
    width: 100%;

    :not(:first-of-type) {
        border-top: 2px solid ${(props) => props.theme.border};
    }

    @media (min-width: 768px) {
        font-size: 1.7em;
        border-top: none !important;
        text-align: default;
        padding: 0px 15px;
        width: auto;

        :not(:first-of-type)::before {
            content: "";
            padding: 0px 15px;
            border-left: 2px solid ${(props) => props.theme.border};
        }
    }
`;

const FullLengthLink = styled.div`
    @media (min-width: 768px) {
        display: inline;
    }
`;

const NavigationMenu = () => {
    return (
        <Nav id="main-navigation">
            <NavList>
                <NavListItem>
                    <Link to="">
                        <FullLengthLink>Home</FullLengthLink>
                    </Link>
                </NavListItem>
                <NavListItem>
                    <Link to="tic-tac-dog">
                        <FullLengthLink>Tic-Tac-Dog</FullLengthLink>
                    </Link>
                </NavListItem>
                <NavListItem>
                    <Link to="higher-or-lower">
                        <FullLengthLink>Higher or Lower</FullLengthLink>
                    </Link>
                </NavListItem>
                <NavListItem>
                    <Link to="critters">
                        <FullLengthLink>ACNH Critter Info</FullLengthLink>
                    </Link>
                </NavListItem>
                <NavListItem>
                    <Link to="passups">
                        <FullLengthLink>
                            Winnipeg Transit Pass-Ups
                        </FullLengthLink>
                    </Link>
                </NavListItem>
            </NavList>
        </Nav>
    );
};

export default NavigationMenu;
