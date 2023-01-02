import React from "react";
import { AnchorTitle, CenteredDiv, CustomDiv } from "../styles/CustomStyles";

const AboutThis = () => {
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
