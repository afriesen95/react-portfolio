import React, { useEffect } from "react";
import AboutMe from "../components/AboutMe";
import AboutThis from "../components/AboutThis";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Projects from "../components/Projects";
import ScrollToTop from "../components/ScrollToTop";

import { educationEntries } from "../data/EducationEntries";
import { workExperienceEntries } from "../data/WorkExperienceEntries";

const HomePage = ({ theme, toggleTheme }) => {
    useEffect(() => {
        document.title = "Alex Friesen";
    }, []);

    return (
        <>
            <Header theme={theme} toggleTheme={toggleTheme} />
            <AboutMe />
            <Projects />
            <Experience name="Work Experience" anchor="#experience" entries={workExperienceEntries}/>
            <Experience name="Education" anchor="#education" entries={educationEntries}/>
            <AboutThis />
            <Footer />
            <ScrollToTop />
        </>
    );
};

export default HomePage;
