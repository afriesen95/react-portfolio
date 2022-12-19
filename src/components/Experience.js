import React from "react";
import { AnchorTitle, CenteredDiv } from "../styles/CustomStyles";
import ExperienceEntry from "./ExperienceEntry";

const Experience = ({name, anchor, entries}) => {
    return (
        <section>
            <h1>
                <AnchorTitle href={anchor}>{name}</AnchorTitle>
            </h1>
            <CenteredDiv>
                {entries.map((entry, index) => (
                    <ExperienceEntry key={index} entry={entry} />
                ))}
            </CenteredDiv>
        </section>
    );
};

export default Experience;
