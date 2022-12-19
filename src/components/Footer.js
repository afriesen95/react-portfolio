import React from "react";
import IconLinks from "./IconLinks";
import styled from "styled-components";
import { HeaderFooter, MobileIconsContainer } from "../styles/CustomStyles";

const CustomFooter = styled(HeaderFooter)`
    border-top: 7px solid ${(props) => props.theme.border};
    padding: 15px 0px;
`;

const CopyrightText = styled.p`
    width: 90%;
    font-size: 1em;
    text-align: center;
    margin: 0 auto;
`;

const Footer = () => {
    return (
        <CustomFooter as="footer">
            <MobileIconsContainer>
                <IconLinks />
            </MobileIconsContainer>
            <CopyrightText>
                Copyright &copy; {new Date().getFullYear()} Alexander Friesen
            </CopyrightText>
        </CustomFooter>
    );
};

export default Footer;
