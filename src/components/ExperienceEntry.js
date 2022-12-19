import React from "react";
import styled from "styled-components";
import { CustomDiv } from "../styles/CustomStyles";

const Title = styled.span`
    color: ${(props) => props.theme.border};
    font-weight: bold;
`;

const Subtitle = styled(Title)`
    font-weight: normal;
    font-style: italic;
`;

const Date = styled.span`
    font-size: ${(props) => props.theme.smallText * 1.25}vw;

    @media (min-width: 768px) {
        font-size: ${(props) => props.theme.smallText * 0.75}vw;
    }
`;

const Description = styled.span`
    position: relative;
    left: 5%;
`;

const UnorderedBulletPoints = styled.ul`
    li li {
        margin-left: 1em;
    }
`;

const ExperienceEntry = ({ entry }) => (
    <CustomDiv>
        <Title>
            <Date>
                {entry.startDate} - {entry.endDate}
            </Date>
            <br />
            {entry.title}
            <br />
            <Subtitle>{entry.subtitle}</Subtitle>
        </Title>
        <br />{" "}
        <Description>
            <UnorderedBulletPoints>
                {entry.bulletPoints.map((bulletPoint, indexTitle) => (
                    <>
                        <li key={indexTitle}>
                            {bulletPoint.title}
                            <ul>
                                {bulletPoint.content.map(
                                    (content, indexContent) => (
                                        <li key={indexContent}>{content}</li>
                                    )
                                )}
                            </ul>
                        </li>
                    </>
                ))}
            </UnorderedBulletPoints>
        </Description>
    </CustomDiv>
);

export default ExperienceEntry;
