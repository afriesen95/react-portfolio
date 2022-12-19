import styled from "styled-components";

const CustomFooter = styled.footer`
    color: white;
    margin: 0 !important;
    padding: 0 !important;
    text-align: center;
    padding-top: 15px !important;
`;

export default function Footer() {
    return (
        <CustomFooter>
            Copyright &copy; {new Date().getFullYear()} Alexander Friesen
        </CustomFooter>
    );
}
