import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/themes";
import { GlobalStyle } from "./styles/GlobalStyle";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import TicTacDogPage from "./pages/TicTacDogPage";
import HigherOrLowerPage from "./pages/HigherOrLowerPage";
import NotFoundPage from "./pages/NotFoundPage";
import PassUpsPage from "./pages/PassUpsPage";
import ACNHPage from "./pages/ACNHPage";

function App() {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "darkTheme"
    );

    const toggleTheme = () => {
        theme === "darkTheme" ? setTheme("lightTheme") : setTheme("darkTheme");
    };

    // this happens once
    useEffect(() => {
        setTheme(
            localStorage.getItem("theme") === null
                ? "darkTheme"
                : localStorage.getItem("theme")
        );
        setTimeout(function () {
            document.getElementById("root").classList.add("transition");
        });
    }, []);

    // this happens whenever the theme changes
    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <ThemeProvider theme={theme === "darkTheme" ? darkTheme : lightTheme}>
            <GlobalStyle />
            <Router>
                <Switch>
                    <Route exact path="/">
                        <HomePage theme={theme} toggleTheme={toggleTheme} />
                    </Route>
                    <Route exact path="/tic-tac-dog">
                        <TicTacDogPage
                            theme={theme}
                            toggleTheme={toggleTheme}
                        />
                    </Route>
                    <Route exact path="/higher-or-lower">
                        <HigherOrLowerPage
                            theme={theme}
                            toggleTheme={toggleTheme}
                        />
                    </Route>
                    <Route exact path="/passups">
                        <PassUpsPage theme={theme} toggleTheme={toggleTheme} />
                    </Route>
                    <Route exact path="/critters">
                        <ACNHPage theme={theme} toggleTheme={toggleTheme} />
                    </Route>
                    <Route exact path="/404">
                        <NotFoundPage />
                    </Route>
                    <Redirect to="/404" />
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
