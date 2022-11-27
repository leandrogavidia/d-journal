import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
    colors: {
        primary: "#B9E0FF",
        secondary: "#8D9EFF",
        third: "#8D72E1",
        fourth: "#6C4AB6",

        gradient: "linear-gradient(135deg, #B9E0FF, #8D9EFF, #8D72E1, #6C4AB6)",

        text: "#1A1A1A",

        black: "#000",
        white: "#fff"
    },
    font: {
        size: {
            phone: {
                small: 1.2,
                medium: 1.6,
                large: 2
            }
        },
        weight: {
            light: 300,
            semibold: 500,
            bold: 700
        }
    }
}

export { theme };