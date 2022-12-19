import { useEffect } from "react";
import Header from "../school/wd2-react-assignment/src/components/Header";
import MainHeader from "../components/Header";
import Footer from "../school/wd2-react-assignment/src/components/Footer";
import SearchForm from "../school/wd2-react-assignment/src/components/SearchForm";
import styled from "styled-components";

const Main = styled.main`
    padding: 10px;
    margin: 10px;
    background-color: ${(props) => props.theme.main};
    border: 5px solid ${(props) => props.theme.border};
    box-shadow: 3px 3px 3px #00000055;
    box-sizing: border-box;
`;

const ACNHPage = ({ theme, toggleTheme }) => {
    useEffect(() => {
        document.title = "Alex Friesen | ACNH Critter Info";
    }, []);

    return (
        <>
            <MainHeader theme={theme} toggleTheme={toggleTheme} />
            <Main>
                <Header />
                <SearchForm />
                <Footer />
            </Main>
        </>
    );
};

export default ACNHPage;
