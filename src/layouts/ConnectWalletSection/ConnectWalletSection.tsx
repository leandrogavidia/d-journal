import { FC, useContext } from "react";
import styled from "styled-components";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { AppContext } from "@components/AppContext/AppContext";

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
        font-weight: ${({ theme }) => theme.font.weight.bold};
    }

    h2 {
        font-size: ${({ theme }) => theme.font.size.phone.medium}rem;
        font-weight: ${({ theme }) => theme.font.weight.semibold};
        margin: 2.8rem 0 2.4rem 0;
        line-height: 2.4rem;
    }

    button {
        border: none;
        font-size: ${({ theme }) => theme.font.size.phone.medium}rem;
        font-weight: ${({ theme }) => theme.font.weight.bold};
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
        font-size: ${({ theme }) => theme.font.size.phone.small}rem;
        line-height: 2rem;
        margin-top: 1.6rem;

        a {
            text-decoration: none;
            font-weight: ${({ theme }) => theme.font.weight.bold};
            color: ${({ theme }) => theme.colors.fourth};
        }
    }
`

const ConnectWalletSection: FC = () => {
    const { connectWallet, disabledButtonStyles } = useContext(AppContext);
    const { error } = useWeb3React();
    const isUnsupportedChain = error instanceof UnsupportedChainIdError;
    const { ethereum } = window;

    return (
        <ConnectWalletContainer>
            <h1>D-Journal</h1>
            <h2>A DApp to create your decentralized journal!</h2>
            <button 
                disabled={isUnsupportedChain || !ethereum ? true : false}
                onClick={connectWallet}
                style={

                    isUnsupportedChain || !ethereum  
                    
                    ? 
                    
                    disabledButtonStyles

                    :

                    {}
                }
            >
            {!ethereum && "You need to have a wallet"}
            {isUnsupportedChain && "Unsupported network"}
            {ethereum && !isUnsupportedChain ? "Connect wallet" : ""}
            </button>
            {
                !ethereum 

                &&

                <p>
                    Please install a wallet, We recommend&nbsp;
                    <a href="https://metamask.io/" target="_blank">
                        MetaMask
                    </a>
                </p>
            }
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