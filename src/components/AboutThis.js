import React from "react";
import styled from "styled-components";
import { AnchorTitle, CenteredDiv, CustomDiv } from "../styles/CustomStyles";
import { FaReact, FaNpm } from "react-icons/fa";

const IconBox = styled.div`
    display: flex;
    padding: 20px 0px;
    width: 100%;
    justify-content: center;

    * {
        cursor: default !important;
        padding: 0px 15px;
    }
`;

const AboutThis = ({ iconSize = 80 }) => {
    return (
        <section>
            <h1>
                <AnchorTitle href="#portfolio">About This Website</AnchorTitle>
            </h1>
            <CenteredDiv>
                <CustomDiv size="small">
                    This portfolio was created during the break between my
                    second and third terms of Business Information Technology.
                    It is my first attempt at a portfolio and my first website
                    built with React.
                </CustomDiv>
            </CenteredDiv>
        </section>
    );
};

export default AboutThis;
