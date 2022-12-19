import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        border: 0;
        font-family: 'Roboto Mono', monospace;
        color: ${(props) => props.theme.text};
    }

    .transition * {
        transition-property: filter, background-color, color;
        transition-duration: 0.15s;
    }

    html {
        scroll-behavior: smooth;
    }

    a:hover,
    a:active,
    a:focus,
    a:visited,
    svg:hover,
    svg:active,
    svg:focus,   
    button:hover,
    button:active,
    button:focus {
        cursor: pointer;
        filter: brightness(1.5);
        color: ${(props) => props.theme.border};

        *
        {
            color: ${(props) => props.theme.border};
        }
    }

    button:active > svg > *,
    svg:active > * {
        color: ${(props) => props.theme.body};
    }

    body {
        background-color: ${(props) => props.theme.body};
    }

    section {
        padding: 15px 0px;
    }
    
    section:nth-child(odd) {
        background-color: ${(props) => props.theme.main}AA;
    }

    h1 {
        font-size: 2em;
    }
    
    h1,
    h2 {
        text-align: center;
    }

    h2 {
        display: none;
    }

    .icon-links,
    .header-controls {
        display: flex;
        justify-content: center;
    }

    @media (min-width: 768px) {
        header .icon-links, header .header-controls {
            position: absolute;
            top: 35px;
        }

        .icon-links svg,
        .header-controls svg {
            padding: 0px 5px;
        }

        header .icon-links {
            right: 1%;
        }

        header .header-controls {
            left: 1%;
        }

        header h1 {
            font-size: 3em;
        }

        header h2 {
            display: block;
        }
    }
`;
