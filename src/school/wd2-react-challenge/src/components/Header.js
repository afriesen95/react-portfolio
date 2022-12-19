import styled from "styled-components";

const CustomHeader = styled.header`
    color: ${(props) => props.theme.text};
    margin: 0 !important;
    padding: 0 !important;
`;

export default function Header() {
    return (
        <CustomHeader>
            <h1>Winnipeg Transit Pass-Ups</h1>
            <h2>View Detailed Pass-Up Information</h2>
        </CustomHeader>
    );
}
