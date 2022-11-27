import { FC } from "react";
import styled from "styled-components";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { connector } from "@web3Config/index";

const ConnectWalletContainer = styled.section`
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

    p {
        font-size: 1.2rem;
        line-height: 2rem;
        margin-top: 1.6rem;

        a {
            text-decoration: none;
            font-weight: 700;
            color: #FCD535;
        }
    }
`

const ConnectWalletSection: FC = () => {
    const { error, activate } = useWeb3React();
    const isUnsupportedChain = error instanceof UnsupportedChainIdError;

    const connectWallet = () => {
        activate(connector);
        localStorage.setItem("CONNECTED_WALLET", JSON.stringify(true));
    }

    return (
        <ConnectWalletContainer>
            <h1>D-Journal</h1>
            <h2>A DApp to create your decentralized journal!</h2>
            <button 
                disabled={isUnsupportedChain}
                onClick={connectWallet}
            >
            {isUnsupportedChain ? "Unsupported network" : "Connect wallet"}
            </button>
            {
                isUnsupportedChain

                && 

                <p>
                    Please change your network to the&nbsp;
                    <a href="https://chainlist.org/" target="_blank">
                        BNBChain testnet network
                    </a>
                </p>
            }
        </ConnectWalletContainer>
    )
}

export { ConnectWalletSection }