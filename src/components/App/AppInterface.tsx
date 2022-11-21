import { FC } from "react";
import styled from "styled-components";

const Section = styled.section`
    text-align: center;
    background-color: ${({ theme }) => theme.colors.white};
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
    border-radius: 8px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
    padding: 4rem 2rem;

    h1 {
        font-size: 3.2rem;
        font-weight: 700;
    }

    h2 {
        font-size: 1.6rem;
        font-weight: 500;
        margin: 2rem 0 1.6rem 0;
    }

    button {
        border: none;
        font-size: 1.6rem;
        font-weight: 700;
        padding: 1.2rem 2rem; 
        border-radius: 4px;
        color: ${({ theme }) => theme.colors.white};
        background-color: ${({ theme }) => theme.colors.fourth};
        transition: 0.2s background;
        cursor: pointer;

        &:hover {
            background-color: ${({ theme }) => theme.colors.third};
        }
    }
`

const AppInterface: FC = () => {
    return (
        <Section>
            <h1>D-Journal</h1>
            <h2>📖 A DApp to create your decentralized journal!</h2>
            <button>Connect wallet</button>
        </Section>
    )
}

export { AppInterface };