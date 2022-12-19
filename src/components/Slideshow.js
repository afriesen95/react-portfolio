import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CenteredDiv } from "../styles/CustomStyles";
import { FaArrowCircleLeft, FaArrowCircleRight, FaGlobe } from "react-icons/fa";

const SlideshowContainer = styled.div`
    overflow: hidden;
    margin: 20px auto 20px auto;
    width: 85%;
    position: relative;

    @media (min-width: 768px) {
        width: 85%
        max-width: 85%;
    }
`;

const Slide = styled.div`
    -webkit-animation-name: fade;
    -webkit-animation-duration: 0.4s;
    animation-name: fade;
    animation-duration: 0.4s;

    @-webkit-keyframes fade {
        from {
            opacity: 0.4;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes fade {
        from {
            opacity: 0.4;
        }
        to {
            opacity: 1;
        }
    }

    display: flex;
    flex-direction: column;
    border: 10px solid ${(props) => props.theme.border};

    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

const SlideDescriptionContainer = styled.p`
    scroll-behavior: smooth;
    font-size: ${(props) => props.theme.smallText * 1.5}vw;

    @media (min-width: 768px) {
        font-size: ${(props) => props.theme.smallText * 0.8}vw;
        flex-basis: 30%;
        height: 400px;
        max-height: 400px;
        overflow-y: scroll;
    }
`;

const SlideDescription = styled.p`
    padding: 0px 15px 10px 15px;
    word-wrap: break-word;
    flex-basis: 30%;

    @media (min-width: 768px) {
        font-size: ${(props) => props.theme.smallText * 0.8}vw;
    }
`;

const SlideImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left top;
`;

const ImageWrapper = styled.div`
    border-bottom: 10px solid ${(props) => props.theme.border};
    height: 400px;
    flex-basis: 70%;

    @media (min-width: 768px) {
        border-bottom: none;
        border-right: 10px solid ${(props) => props.theme.border};
    }
`;

const SlideTitle = styled.span`
    display: block;
    font-weight: bold;
    font-size: ${(props) => props.theme.smallText * 2.5}vw;
    text-align: center;
    margin: 5px;

    @media (min-width: 768px) {
        font-size: ${(props) => props.theme.smallText * 1.5}vw;
    }
`;

const SlideButton = styled.button`
    background-color: transparent;
    cursor: pointer;
`;

const SlideButtonsDiv = styled(CenteredDiv)`
    padding: 0 0 10px 0;
    flex-direction: row;
    * {
        padding: 0 10px;
    }
`;

const SlideLink = styled.a`
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;

    * {
        padding: 0px 10px;
    }

    @media (min-width: 768px) {
        font-size: 1.3vw;
    }
`;

const Slideshow = ({ slideData, slideshowName, iconSize = 80 }) => {
    const [slideIndex, setSlideIndex] = useState(0);

    const changeSlide = (amount) => {
        setSlideIndex(slideIndex + amount);
    };

    useEffect(() => {
        const slides = document.querySelectorAll(`.slide-${slideshowName}`);
        const counter = document.querySelector(
            `.slidecounter-${slideshowName}`
        );

        if (slideIndex >= slides.length) {
            setSlideIndex(0);
            return;
        }

        if (slideIndex < 0) {
            setSlideIndex(slides.length - 1);
            return;
        }

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        slides[slideIndex].style.display = "flex";
        counter.innerText = `${slideIndex + 1} / ${slides.length}`;
    }, [slideIndex, slideshowName]);

    return (
        <SlideshowContainer>
            <SlideButtonsDiv>
                <SlideButton
                    onClick={function () {
                        changeSlide(-1);
                    }}
                >
                    <FaArrowCircleLeft size={iconSize} />
                </SlideButton>
                <SlideTitle className={`slidecounter-${slideshowName}`}>
                    X / Y
                </SlideTitle>
                <SlideButton
                    onClick={function () {
                        changeSlide(1);
                    }}
                >
                    <FaArrowCircleRight size={iconSize} />
                </SlideButton>
            </SlideButtonsDiv>

            {slideData.map((slideData, index) => (
                <Slide className={`slide-${slideshowName}`} key={index}>
                    <ImageWrapper>
                        <SlideImage src={slideData.img} alt={slideData.alt} />
                    </ImageWrapper>
                    <SlideDescriptionContainer>
                        <SlideTitle>
                            <SlideLink
                                href={slideData.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaGlobe />
                                {slideData.title}
                            </SlideLink>
                        </SlideTitle>
                        <SlideDescription>
                            {slideData.description}
                        </SlideDescription>
                    </SlideDescriptionContainer>
                </Slide>
            ))}
        </SlideshowContainer>
    );
};

export default Slideshow;
