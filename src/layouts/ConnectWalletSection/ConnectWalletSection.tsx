import { FC, useContext } from "react";
import styled from "styled-components";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { AppContext } from "@components/AppContext/AppContext";
import { Loading } from "@components/Loading/Loading";
import journalImage from "@assets/images/journal-icon.png"

const ConnectWalletContainer = styled.main`
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
        font-size: ${({ theme }) => theme.font.size.phone.medium}rem;
        font-weight: ${({ theme }) => theme.font.weight.semibold};
        margin: 2.8rem 0 2.4rem 0;
        line-height: 2.4rem;
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
    const { connectWallet, disabledButtonStyles, connectLoading } = useContext(AppContext);
    const { error } = useWeb3React();
    const isUnsupportedChain = error instanceof UnsupportedChainIdError;
    const { ethereum } = window;

    return (
        <ConnectWalletContainer>
            <img 
                src={journalImage}
                alt="Journal image"
                title="Journal image"
                width={128}
                height={128}
            />
            <h1>D-Journal, a DApp to create your decentralized journal!</h1>
            <button 
                disabled={isUnsupportedChain || !ethereum || connectLoading ? true : false}
                onClick={connectWallet}
                style={isUnsupportedChain || !ethereum || connectLoading ? disabledButtonStyles : null}
            >
            {!ethereum && "You need to have a wallet"}
            {isUnsupportedChain && "Unsupported network"}
            {connectLoading && <Loading text="Connecting" />}
            {ethereum && !isUnsupportedChain && !connectLoading ? "Connect wallet" : ""}
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