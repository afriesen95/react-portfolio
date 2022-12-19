import styled from "styled-components";

const CustomHeader = styled.header`
    margin: 0 auto;
    padding-bottom: 20px;
`;

export default function Header() {
    return (
        <CustomHeader>
            <h1>ACNH Critter Info</h1>
        </CustomHeader>
    );
}
