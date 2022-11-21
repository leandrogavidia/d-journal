import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            primary: string,
            secondary: string,
            third: string,
            fourth: string,

            gradient: string,

            text: string,

            black: string,
            white: string
        }
    }
}