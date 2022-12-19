import SearchResults from "./SearchResults";
import { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
    margin-top: 10px;
    width: 100%;
    min-width: 100%;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.main};
    box-shadow: none;
    padding: 15px;
`;

const Search = styled.input`
    width: 100%;
    box-sizing: border-box;
    margin: 10px auto;
    padding: 5px;
    font-size: 1.25em;
    color: ${(props) => props.theme.text};
    background-color: ${(props) => props.theme.body};
    border: 3px solid ${(props) => props.theme.border};

    :invalid {
        border-color: red;
    }
`;

const LinkButton = styled.button`
    color: ${(props) => props.theme.border};
    display: inline-block;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font-size: inherit;
    font-weight: bold;
    font-family: inherit;

    :hover,
    :active {
        color: ${(props) => props.theme.text};
    }
`;

const Button = styled.button`
    padding: 5px 10px;
    margin: 5px 5px;
    display: inline-block;
    border: 3px solid ${(props) => props.theme.border};
    color: ${(props) => props.theme.text};
    background-color: ${(props) => props.theme.body};
`;

const ButtonContainer = styled.div`
    @media only screen and (max-width: 600px) {
        display: flex;
        justify-content: center;
    }
`;

const Descriptor = styled.p`
    color: ${(props) => props.theme.text};
    margin: 5px 0 10px 5px;
    font-size: 0.85rem;
`;

export default function SearchForm() {
    // Route Number is what gets passed to the SearchResults component.
    const [routeNumber, setRouteNumber] = useState("");
    const [error, setError] = useState("");

    // Set the route number to the search bar input which will
    // cause the SearchResults component to fetch results.
    function submitQuery(e) {
        // Grab the search bar.
        const input = document.querySelector("#search");

        // Prevent the form from submitting.
        e.preventDefault();

        // If the input value is not valid according to our regex,
        // don't use it and display an error.
        if (input.checkValidity()) {
            setError("");
            setRouteNumber(input.value);
        } else {
            setError(
                "Please enter 1 to 4 numbers, 'BLUE', or a school route (ex: S401)"
            );
            input.focus();
            input.select();
        }
    }

    // For when we are searching from a link button.
    function searchFromButton(route) {
        document.querySelector("#search").value = route;
        setError("");
        setRouteNumber(route);
    }

    // I made the regex here and it was not worth my time.
    // Also a note about the input onChange: if you only set text-transform
    // to uppercase in CSS, the underlying value is still lowercase.
    // In other words, text-transform is visual only. The inline function
    // here truly changes the value to uppercase with each keystroke.
    return (
        <>
            <Form onSubmit={() => submitQuery}>
                <fieldset>
                    <Search
                        type="text"
                        id="search"
                        placeholder="Search by Route Number"
                        pattern="(^BLUE$|[S]?[0-9]{1,3})"
                        onChange={(e) =>
                            (e.target.value = e.target.value.toUpperCase())
                        }
                    />
                    <Descriptor>
                        Try '
                        <LinkButton
                            type="button"
                            onClick={() => {
                                searchFromButton("11");
                            }}
                        >
                            11
                        </LinkButton>
                        ' or '
                        <LinkButton
                            type="button"
                            onClick={() => {
                                searchFromButton("BLUE");
                            }}
                        >
                            BLUE
                        </LinkButton>
                        ', or view the{" "}
                        <a
                            rel="noreferrer noopener"
                            target="_blank"
                            href="https://winnipegtransit.com/en/routes/list"
                        >
                            full list of routes
                        </a>
                        .
                    </Descriptor>
                </fieldset>
                <ButtonContainer>
                    <Button type="submit" onClick={submitQuery}>
                        Search
                    </Button>
                    <Button
                        type="reset"
                        onClick={() => {
                            setRouteNumber("");
                        }}
                    >
                        Reset
                    </Button>
                </ButtonContainer>

                <SearchResults error={error} routeNumber={routeNumber} />
            </Form>
        </>
    );
}
