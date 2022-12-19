import styled from "styled-components";

const CustomFooter = styled.footer`
    margin: 0 auto;
    padding-bottom: 0 !important;
    text-align: center;
    padding-top: 20px;
`;

export default function Footer() {
    return (
        <CustomFooter>
            <p>
                Built with{" "}
                <a
                    href="https://acnhapi.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    ACNH API
                </a>
            </p>
            <p>Copyright &copy; {new Date().getFullYear()} Alexander Friesen</p>
        </CustomFooter>
    );
}
