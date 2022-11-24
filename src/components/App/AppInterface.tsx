import { FC, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { connector } from "@web3Config/index";
import { useWeb3React } from "@web3-react/core";
import { NoteItem } from "@components/NoteItem/NoteItem";
import { DecentralizedJournalArtifact } from "@web3Config/artifacts/DecentralizedJournal";

const ConnectWalletSection = styled.section`
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

const JournalSection = styled.section`
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 8px;
    min-height: 500px;
    min-width: 280px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
    padding: 0 0 2rem 0;
    height: 100%;

    & > .wallet-header {
        border-block-end: solid 1px rgba(0, 0, 0, 0.4);
        padding: 1.2rem;
        background-color: ${({ theme }) => theme.colors.fourth};
        color: ${({ theme }) => theme.colors.white};
        border-radius: 8px 8px 0 0;

        p {
            font-size: 1.2rem;
            font-weight: 700;
        }
    }

    & > .wallet-data {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        row-gap: 2.8rem;
        height: inherit;
        padding: 2rem 0 4rem 0;

        .firstNote {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            row-gap: 1.2rem;
            margin: 0 1.2rem;

            h2 {
                font-size: 2.2rem;
                font-weight: 700;
                color: ${({ theme }) => theme.colors.secondary};
            }

            p {
                font-size: 1.6rem;
                font-weight: 500;
            }
        }

        & > ol {
            padding: 1.2rem;
            list-style: none;
            display: flex;
            flex-direction: column;
            row-gap: 2rem;
            overflow: auto;
            width: 100%;
        }

        & > .buttons {
            display: flex;
            flex-direction: column;
            row-gap: 1rem;
            padding: 0 1.2rem;
            width: 100%;

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

            #delete-journal-button {
                color: white;
                background: black;
                transition: 0.2s background-color;

                &:hover {
                    background-color: red;
                }
            }
        }
    }
`

const AppInterface: FC = () => {

    const { abi, address } = DecentralizedJournalArtifact;
    const [notes, setNotes] = useState<number | null>(null);

    const {
        activate,
        active,
        deactivate,
        chainId,
        account,
        error,
        library
    } = useWeb3React()

    const ownerAccount = account?.slice(0, 6) + "..." + account?.slice(-4);

    const connectWallet = () => {
        activate(connector);
    }

    const disconnectWallet = () => {
        deactivate();
    }

    const DecentralizedJournal = useMemo(() => {
        if (active) {
            return new library.eth.Contract(abi, address[97]);
        }
    }, [chainId, library?.eth?.Contract, active]);

    const total = useCallback(async () => {
        if (DecentralizedJournal) {
            const result = await DecentralizedJournal.methods.getTotalNotes().call();
            setNotes(result)
        }
    }, [DecentralizedJournal])

    useEffect(() => {
        total();
    }, [total])

    return (
        <>
            {
                !active 
                
                ?

                <ConnectWalletSection>
                    <h1>D-Journal</h1>
                    <h2>A DApp to create your decentralized journal!</h2>
                    <button onClick={connectWallet}>Connect wallet</button>
                </ConnectWalletSection>

                :

                <JournalSection>
                        <div className="wallet-header">
                            <p>Wallet: {ownerAccount}</p>
                            <p>TotalNotes: {notes}</p>
                        </div>
                        <div className="wallet-data">
                            {
                                false 

                                ?

                                <div className="firstNote">
                                    <h2>Let's save your story</h2>
                                    <p>Create your first note</p>
                                </div>

                                :

                                <>                                
                                    <ol>
                                        <NoteItem 
                                            title="Mi primer día de clases"
                                            content="Descripción de la nota de lo que se hizo el dia de hoy Como estas mis amor"
                                            date={2311234124}
                                            id={3}
                                        />
                                        <NoteItem 
                                            title="Mi primer día de clases"
                                            content="Descripción de la nota de lo que se hizo el dia de hoy Como estas mis amor"
                                            date={2311234124}
                                            id={3}
                                        />
                                        <NoteItem 
                                            title="Mi primer día de clases"
                                            content="Descripción de la nota de lo que se hizo el dia de hoy Como estas mis amor"
                                            date={2311234124}
                                            id={3}
                                        />


                                    </ol>
                                </>
                            }
                            <div className="buttons">
                                <button>Add note</button>
                                <button onClick={disconnectWallet}>Disconnect</button>
                                {
                                    true && <button id="delete-journal-button">Delete your journal</button>
                                }
                            </div>
                        </div>
                </JournalSection>
            }        
        </>
    )
}

export { AppInterface };