import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CuteDogImage = styled.img`
    position: fixed;
    display: inline;
    z-index: -1;
    border-radius: 50%;
    top: -100%;
    width: 10%;
`;

const Oops = styled.h1`
    font-size: 10vw;
    color: ${(props) => props.theme.border};
    text-shadow: 6px 6px 5px black;
`;

const OopsParagraph = styled.p`
    padding: 10px;
    font-size: 5vw;
    text-align: center;
    text-shadow: 6px 6px 5px black;
`;

const PageCenteredDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
`;

const moveDogImages = () => {
    const dogImages = document.getElementsByTagName("img");

    for (let i = 0; i < dogImages.length; i++) {
        dogImages[i].style.top = `${Math.floor(Math.random() * 100)}%`;
        dogImages[i].style.left = `${Math.floor(Math.random() * 100)}%`;
        dogImages[i].style.transform = `rotate(${Math.floor(
            Math.random() * 360
        )}deg)`;
    }
};

const NotFoundPage = () => {
    useEffect(() => {
        document.title = "Alex Friesen | 404 Not Found";
        const moveDogInterval = setInterval(moveDogImages, 175);

        return function cleanup() {
            clearInterval(moveDogInterval);
        };
    }, []);

    return (
        <>
            <CuteDogImage src="../images/belle.jpg" alt="Belle The Dog" />
            <CuteDogImage src="../images/mindy.jpg" alt="Mindy The Dog" />
            <PageCenteredDiv>
                <div>
                    <Oops>Oops!</Oops>
                    <OopsParagraph>
                        There's nothing here.<br></br>
                        <Link to="/">Go home?</Link>
                    </OopsParagraph>
                </div>
            </PageCenteredDiv>
        </>
    );
};

export default NotFoundPage;
