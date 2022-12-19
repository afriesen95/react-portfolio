import styled from "styled-components";

const Card = styled.div`
    color: ${(props) => props.theme.text};
    border: 3px solid ${(props) => props.theme.border};
    padding: 10px;
    box-sizing: border-box;
    margin: 3px auto;
    width: 98%;
    box-shadow: 2px 2px 5px #00000044;
    background-color: ${(props) => props.theme.main};

    :hover {
        filter: brightness(1.5);
    }
`;

export default function PassUpCard({ passUp }) {
    // Define a location link string.
    let locationLink;

    // Only create the location link if the location key exists.
    // Some of them are undefined.
    if ("location" in passUp) {
        // For some reason, the data returns longitude first.
        const [longitude, latitude] = passUp.location["coordinates"];
        locationLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    }

    // Don't display a View Location... link if there was no location.
    return (
        <Card>
            <h4>
                {passUp.route_number} {passUp.route_name}
                {" - " + passUp.route_destination}{" "}
            </h4>
            <h5>
                {new Intl.DateTimeFormat("en-CA", {
                    dateStyle: "full",
                    timeStyle: "short",
                }).format(new Date(passUp.time))}
            </h5>
            <h5>{passUp.pass_up_type}</h5>
            {"location" in passUp && (
                <a
                    target="_blank"
                    rel="noreferrer noopener"
                    href={locationLink}
                >
                    View Location...
                </a>
            )}
        </Card>
    );
}
