import { useState, useEffect } from "react";
import SearchResults from "./SearchResults";
import styled from "styled-components";

const LinkButton = styled.button`
    display: inline-block;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font-size: inherit;
    font-weight: bold;
    font-family: inherit;
    color: ${(props) => props.theme.border};

    :hover,
    :active {
        color: ${(props) => props.theme.text};
    }
`;

const SearchBar = styled.input`
    padding: 5px;
    width: 100%;
    margin: 10px auto;
    font-size: 1.25em;
    color: ${(props) => props.theme.text};
    background-color: ${(props) => props.theme.body};
    box-sizing: border-box;
    border: 5px solid ${(props) => props.theme.border};
`;

export default function SearchForm() {
    // Are we ready to search?
    const [ready, setReady] = useState(false);

    // Search states
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [numberOfResults, setNumberOfResults] = useState(0);

    // Critter data
    const [critters, setCritters] = useState([]);

    // Cache the API results into a state variable once on page load
    useEffect(() => {
        const endpoints = ["fish", "bugs"];

        // Loop through each endpoint and combine the data into critters state
        for (const endpoint of endpoints) {
            fetch(`https://acnhapi.com/v1/${endpoint}`)
                .then((response) => response.json())
                .then((data) =>
                    setCritters((prevCritters) =>
                        Object.assign(prevCritters, data)
                    )
                )
                .then(() => setReady(true));
        }
    }, []);

    // Search whenever the search term changes
    useEffect(() => {
        // We need to do two things to the raw search term:
        // 1) replace all spaces (one or more) with underscores
        // 2) convert to lowercase
        const results = Object.keys(critters)
            .filter((x) =>
                x
                    .toLowerCase()
                    .includes(searchTerm.replace(/\s+/g, "_").toLowerCase())
            )
            .sort();
        setSearchResults(results);
        setNumberOfResults(results.length);
    }, [critters, searchTerm]);

    if (ready) {
        return (
            <>
                <p style={{ textAlign: "center" }}>
                    Try '
                    <LinkButton
                        type="button"
                        className="linkButton"
                        onClick={() => setSearchTerm("Arowana")}
                    >
                        Arowana
                    </LinkButton>
                    ' or '
                    <LinkButton
                        type="button"
                        className="linkButton"
                        onClick={() => setSearchTerm("beetle")}
                    >
                        beetle
                    </LinkButton>
                    '
                </p>
                <SearchBar
                    type="text"
                    id="search"
                    placeholder="Search by Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchResults
                    critters={critters}
                    searchResults={searchResults}
                    searchTerm={searchTerm}
                    numberOfResults={numberOfResults}
                />
            </>
        );
    } else return <p className="title">Loading Critters...</p>;
}
