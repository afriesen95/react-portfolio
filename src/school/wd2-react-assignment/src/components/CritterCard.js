import { useState } from "react";
import styled from "styled-components";

const Card = styled.div`
    padding: 10px;
    height: 350px;
    background-color: ${(props) => props.theme.body};
    font-size: 1.3em;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s;
    cursor: pointer;
    border: 5px solid ${(props) => props.theme.border};
    box-shadow: 3px 3px 3px #00000055;

    :hover {
        filter: brightness(1.5);
    }
`;

const InnerCard = styled.div`
    width: 95%;
`;

const CardImage = styled.img`
    float: right;
`;

const BottomText = styled.p`
    font-size: 0.7em;
    text-align: center;
    margin: 0 auto;
    position: absolute;
    width: 100%;
    bottom: 0px;
`;

const Title = styled.h3`
    text-align: center;
    text-transform: capitalize;
`;

export default function CritterCard({ critter }) {
    // Card state
    const [artworkMode, setArtworkMode] = useState(false);

    // Critter data
    // Destructuring this would be a mess, this is easier in my opinion
    // destructuring is still being done through props itself though.
    const name = critter.name["name-USen"];
    const price = critter.price;
    const rarity = critter.availability.rarity;
    const location = critter.availability.location;
    const icon = critter.icon_uri;
    const image = critter.image_uri;

    let rarityColor;
    switch (rarity.toLowerCase()) {
        case "common":
            rarityColor = "lightgrey";
            break;

        case "uncommon":
            rarityColor = "limegreen";
            break;

        case "rare":
            rarityColor = "lightblue";
            break;

        case "ultra-rare":
            rarityColor = "plum";
            break;

        default:
            rarityColor = "black";
            break;
    }

    const visible = {
        position: "relative",
        visible: "default",
        width: "100%",
        height: "100%",
        objectFit: "contain",
    };

    const hidden = {
        display: "none",
        visible: "hidden",
    };

    return (
        <Card onClick={() => setArtworkMode(!artworkMode)}>
            <InnerCard style={artworkMode ? visible : hidden}>
                <Title>{name}</Title>
                <CardImage
                    src={image}
                    alt={name}
                    style={artworkMode ? visible : hidden}
                />
                <BottomText>(click to view info)</BottomText>
            </InnerCard>
            <InnerCard style={artworkMode ? hidden : visible}>
                <Title>{name}</Title>
                <CardImage src={icon} alt={name} />
                <p>${price}</p>
                <p style={{ color: rarityColor }}>{rarity}</p>
                <p>Location: {location}</p>
                <BottomText>(click to view model)</BottomText>
            </InnerCard>
        </Card>
    );
}
