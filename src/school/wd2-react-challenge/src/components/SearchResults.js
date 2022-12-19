import { useEffect, useState } from "react";
import PassUpCard from "./PassUpCard";
import styled from "styled-components";

const ResultsFound = styled.div`
    border-bottom: 1px solid ${(props) => props.theme.border};
    padding: 5px 0px;
    margin-bottom: 5px;
`;

const ResultsList = styled.ul`
    max-height: 44vh;
    overflow-y: scroll;
    width: 100%;
`;

const ResultsListItem = styled.li`
    list-style: none;
    padding: 1px;
    margin: 2px 0;

    :nth-child(even) > div {
        background-color: ${(props) => props.theme.body};
    }
`;

const Error = styled.p`
    color: ${(props) => props.theme.border};
    font-weight: bold;
    font-style: italic;
`;

export default function SearchResults({ error, routeNumber }) {
    // passUps contains the actual query response, the data we want.
    const [passUps, setPassUps] = useState([]);

    // resultsFound is the number of results found, for display in the UI.
    const [resultsFound, setResultsFound] = useState(0);

    // ready is a flag for whether or not we can safely display the results.
    const [ready, setReady] = useState(false);

    // Query the API to find information based on the given route number.
    function queryAPI() {
        setReady(false);
        if (routeNumber !== "") {
            fetch(
                encodeURI(
                    `https://data.winnipeg.ca/resource/mer2-irmb.json?$limit=100&$order=time DESC&$where=route_number LIKE '${routeNumber}'`
                )
            )
                .then((response) => response.json())
                .then((data) => {
                    setResultsFound(data.length);
                    setPassUps(data);
                    setReady(true);
                });
        }
    }

    // Invoke queryAPI whenever routeNumber changes.
    useEffect(queryAPI, [routeNumber]);

    // If there is an error, display it.
    if (error !== "") return <Error>{error}</Error>;

    // If we are ready, display results. Otherwise, display "Loading..."
    if (ready) {
        return (
            <>
                <ResultsFound>
                    <b>{resultsFound} Results Found.</b>
                </ResultsFound>
                <ResultsList>
                    {passUps.map((passUp) => (
                        <ResultsListItem key={passUp.pass_up_id}>
                            <PassUpCard passUp={passUp} />
                        </ResultsListItem>
                    ))}
                </ResultsList>
            </>
        );
    } else return routeNumber && <ResultsFound>Loading...</ResultsFound>;
}
