import { createGlobalStyle } from "styled-components";
import comfortaa300Woff from "@assets/fonts/comfortaa-v40-latin-300.woff";
import comfortaa300Woff2 from "@assets/fonts/comfortaa-v40-latin-300.woff2";
import comfortaa500Woff from "@assets/fonts/comfortaa-v40-latin-500.woff";
import comfortaa500Woff2 from "@assets/fonts/comfortaa-v40-latin-500.woff2";
import comfortaa700Woff from "@assets/fonts/comfortaa-v40-latin-700.woff";
import comfortaa700Woff2 from "@assets/fonts/comfortaa-v40-latin-700.woff2";

const Global = createGlobalStyle`
    @font-face {
        font-family: "Comfortaa";
        src:
            url(${comfortaa300Woff2}) format("woff2"),
            url(${comfortaa300Woff}) format("woff");
        font-weight: 300;
        font-style: normal;
    }
    @font-face {
        font-family: "Comfortaa";
        src:
            url(${comfortaa500Woff2}) format("woff2"),
            url(${comfortaa500Woff}) format("woff");
        font-weight: 500;
        font-style: normal;
    }
    @font-face {
        font-family: "Comfortaa";
        src:
            url(${comfortaa700Woff2}) format("woff2"),
            url(${comfortaa700Woff}) format("woff");
        font-weight: 700;
        font-style: normal;
    }
    html {
        font-size: 62.5%;
    }
    :focus-visible {
        outline: 0.1rem ${({ theme }) => theme.colors.primary} solid;
    }
    
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        scrollbar-width: thin;
        scrollbar-color: ${({ theme }) => theme.colors.primary} rgba(0, 0, 0, 0);
    }
    
    /* Works on Chrome, Edge, and Safari */
    *::-webkit-scrollbar {
        width: 0.4rem;
    }
    
    *::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0);
    }
    
    *::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.colors.primary};
        border-radius: 2rem;
        border: none;
    }
    
    body {
        font-family: Comfortaa, sans-serif;
        height: 100vh;
        background: ${({ theme }) => theme.colors.gradient};
        color: ${({ theme }) => theme.colors.text};
        letter-spacing: 0.02rem;
    }
`

export { Global };