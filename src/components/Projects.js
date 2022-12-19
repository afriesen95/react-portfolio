import React from "react";
import { AnchorTitle } from "../styles/CustomStyles";
import Slideshow from "./Slideshow";
import { projectsData } from "../data/ProjectsData";

const Projects = () => {
    return (
        <section>
            <h1>
                <AnchorTitle href="#projects">Projects</AnchorTitle>
            </h1>
            <Slideshow slideData={projectsData} slideshowName="projects" />
        </section>
    );
};

export default Projects;
