import { FC } from "react";
import styled from "styled-components";
import { connector } from "@web3Config/index";
import { useWeb3React } from "@web3-react/core";

const Section = styled.section`
    text-align: center;
    background-color: ${({ theme }) => theme.colors.white};
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
    border-radius: 8px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
    padding: 4rem 2rem;
    min-height: 360px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
        font-size: 3.2rem;
        font-weight: 700;
    }

    h2 {
        font-size: 1.6rem;
        font-weight: 500;
        margin: 2.8rem 0 2.4rem 0;
        line-height: 2.4rem;
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
    const {
        activate,
        active,
        deactivate,
        chainId,
        account,
        error
    } = useWeb3React()

    const connectWallet = () => {
        activate(connector);
    }

    const disconnectWallet = () => {
        deactivate();
    }

    console.log(active)
    console.log(account)

    return (
        <>
            {
                !active 
                
                ?

                <Section>
                    <h1>D-Journal</h1>
                    <h2>A DApp to create your decentralized journal!</h2>
                    <button onClick={connectWallet}>Connect wallet</button>
                </Section>

                :

                <p onClick={disconnectWallet}>{account}</p>
            }        
        </>
    )
}

export { AppInterface };