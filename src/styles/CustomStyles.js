import styled from "styled-components";

export const AnchorTitle = styled.a`
    font-size: ${(props) => props.theme.bigText * 1.5}vw;
    text-shadow: 6px 6px 3px #212121;
    font-weight: bold;
    text-decoration: none;
    pointer-events: none;
    color: ${(props) => props.theme.border};

    @media (min-width: 768px) {
        font-size: ${(props) => props.theme.bigText}vw;
    }
`;

export const CenteredDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
`;

export const CustomDiv = styled.div`
    font-size: ${(props) =>
        props.size === "big"
            ? (props) => props.theme.bigText * 1.5
            : (props) => props.theme.smallText * 1.5}vw;
    left: ${(props) => props.left}%;
    position: relative;
    width: 80%;
    padding: 10px;

    @media (min-width: 768px) {
        width: ${(props) => props.width}%;
        font-size: ${(props) =>
            props.size === "big"
                ? (props) => props.theme.bigText
                : (props) => props.theme.smallText}vw;
    }
`;

export const DivNoMobile = styled.div`
    @media (max-width: 768px) {
        display: none;
    }
`;

export const HeaderFooter = styled.header`
    background-color: ${(props) => props.theme.main};
    margin: 10px 0px;
    width: 100%;
    height: auto;
    margin: 0 auto;
`;

export const MobileIconsContainer = styled.div`
    @media (max-width: 768px) {
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
            padding: 0px 10px;
        }
    }
`;

export const GameTitle = styled.h1`
    user-select: none;
    font-size: 5vw;
    padding-top: 5px;
    text-align: center;
    font-style: italic;

    @media (min-width: 768px) {
        font-size: 3vw;
    }
`;

export const GameHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    align-text: center;
    user-select: none;
`;

export const GameInstructions = styled.h3`
    user-select: none;
    text-align: center;
    margin: 0 auto;
    width: 90%;
    font-size: 3vw;
    font-style: italic;

    @media (min-width: 768px) {
        font-size: 1.25em;
    }
`;
