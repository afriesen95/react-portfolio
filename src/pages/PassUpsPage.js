import { useEffect } from "react";
import Header from "../school/wd2-react-challenge/src/components/Header";
import MainHeader from "../components/Header";
import Footer from "../school/wd2-react-challenge/src/components/Footer";
import SearchForm from "../school/wd2-react-challenge/src/components/SearchForm";
import styled from "styled-components";

const Main = styled.main`
    background-color: ${(props) => props.theme.main};
    margin: 10px;
    box-sizing: border-box;
    padding: 15px 20px;
    border: 5px solid ${(props) => props.theme.border};
`;

const PassUpsPage = ({ theme, toggleTheme }) => {
    useEffect(() => {
        document.title = "Alex Friesen | Winnipeg Transit Pass-Ups";
    }, []);

    return (
        <>
            <MainHeader theme={theme} toggleTheme={toggleTheme} />
            <Main className="App">
                <Header />
                <SearchForm />
                <Footer />
            </Main>
        </>
    );
};

export default PassUpsPage;
