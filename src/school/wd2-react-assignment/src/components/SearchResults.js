import CritterCard from "./CritterCard";
import styled from "styled-components";

const ResultsFound = styled.p`
    font-weight: bold;
    padding: 5px 0px;
    border-bottom: 2px solid ${(props) => props.theme.border};
    border-radius: 0 !important;
`;

const ResultsList = styled.ul`
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 15px;
    list-style: none;
    overflow-y: scroll;
    max-height: 55vh;
`;

const ResultsListItem = styled.li`
    padding: 0 !important;
`;

export default function SearchResults({
    critters,
    searchTerm,
    searchResults,
    numberOfResults,
}) {
    return (
        searchTerm && (
            <>
                <ResultsFound>
                    {numberOfResults} Results Found Containing "{searchTerm}"
                </ResultsFound>
                <ResultsList>
                    {searchResults.map((result, index) => (
                        <ResultsListItem key={index}>
                            <CritterCard critter={critters[result]} />
                        </ResultsListItem>
                    ))}
                </ResultsList>
            </>
        )
    );
}
