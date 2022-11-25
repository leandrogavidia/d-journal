import { ChangeEvent, FC, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { connector } from "@web3Config/index";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { NoteItem } from "@components/NoteItem/NoteItem";
import { DecentralizedJournalArtifact } from "@web3Config/artifacts/DecentralizedJournal";
import Modal from "react-modal";

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

const JournalSection = styled.section`
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 8px;
    min-height: 500px;
    min-width: 280px;
    max-width: 1920px;
    max-height: 1080px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
    padding: 0 0 2rem 0;
    height: 100%;
    width: 100%;

    & > .wallet-header {
        border-block-end: solid 1px rgba(0, 0, 0, 0.4);
        padding: 1.2rem;
        background-color: ${({ theme }) => theme.colors.fourth};
        color: ${({ theme }) => theme.colors.white};
        border-radius: 8px 8px 0 0;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        column-gap: 2rem;

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

    @media(min-width: 600px) {
        & > .wallet-data {
            & > .buttons {
                flex-direction: row;
                column-gap: 1.2rem;
                border-top: 1px solid rgba(0, 0, 0, 0.4);
                padding-top: 2rem;
            }
        }
    }
`

const AddNoteForm = styled.form`
    label {
        font-size: 1.6rem;
        font-weight: 700;
    }

    input, textarea {
        width: 100%;
        font-size: 1.6rem;
        margin: 1.2rem 0 2rem 0;
    }

    input {
        padding-bottom: 0.4rem;
        border: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    }

    textarea {
        min-height: 10rem;
        padding: 0.8rem 1.2rem;
        resize: none;
    }

    div {
        display: flex;
        flex-direction: column;
        width: 100%;
        row-gap: 1.2rem;
        
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

        button:first-child {
            background: transparent;
            border: solid 1px ${({ theme }) => theme.colors.fourth};
            color: ${({ theme }) => theme.colors.fourth};

            &:hover {
                color: ${({ theme }) => theme.colors.white};
                background-color: ${({ theme }) => theme.colors.fourth};
            }
        }
    }

    @media(min-width: 600px) {
        div {
            flex-direction: row;
            column-gap: 1.2rem;

            button {
                width: 100%;
            }
        }
    }
`

const DeleteJournalContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    text-align: center;
    row-gap: 2rem;

    p {
        font-size: 2rem;
        font-weight: 700;
        line-height: 2.8rem;
    }

    p:nth-child(2) {
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 2rem;
    }

    div {
        display: flex;
        flex-direction: column;
        width: 100%;
        row-gap: 1.2rem;
        
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

        button:first-child {
            background: transparent;
            border: solid 1px ${({ theme }) => theme.colors.fourth};
            color: ${({ theme }) => theme.colors.fourth};

            &:hover {
                color: ${({ theme }) => theme.colors.white};
                background-color: ${({ theme }) => theme.colors.fourth};
            }
        }
    }

    @media(min-width: 600px) {
        div {
            flex-direction: row;
            column-gap: 1.2rem;

            button {
                width: 100%;
            }
        }
    }
`

const AppInterface: FC = () => {

    const { abi, address } = DecentralizedJournalArtifact;

    const [totalNotes, setTotalNotes] = useState<number>(0);
    const [journal, setJournal] = useState<Note[]>([]);
    
    const [addNoteIsOpen, setAddNoteIsOpen] = useState<boolean>(false);
    const [addNoteTitle, setAddNoteTitle] = useState<string>("");
    const [addNoteContent, setAddNoteContent] = useState<string>("");
    
    const [deleteJournalIsOpen, setDeleteJournalIsOpen] = useState<boolean>(false);

    const {
        activate,
        active,
        deactivate,
        chainId,
        account,
        error,
        library
    } = useWeb3React()

    const isUnsupportedChain = error instanceof UnsupportedChainIdError;

    const ownerAccount = account?.slice(0, 6) + "..." + account?.slice(-4);

    const addNoteModal = () => {
        setAddNoteIsOpen(!addNoteIsOpen);
    }

    const addNoteTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setAddNoteTitle(event.target.value);
    }

    const addNoteContentHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setAddNoteContent(event.target.value);
    }

    const deleteJournalModal = () => {
        setDeleteJournalIsOpen(!deleteJournalIsOpen);
    }

    const connectWallet = () => {
        activate(connector);
        localStorage.setItem("CONNECTED_WALLET", JSON.stringify(true));
    }

    const disconnectWallet = () => {
        deactivate();
        localStorage.removeItem("CONNECTED_WALLET");
    }

    const DecentralizedJournal = useMemo(() => {
        if (active) {
            return new library.eth.Contract(abi, address[97]);
        }
    }, [chainId, library?.eth?.Contract, active]);

    const getTotalNotes = useCallback(async () => {
        if (DecentralizedJournal) {
            const result = await DecentralizedJournal.methods.getTotalNotes().call({
                from: account
            });

            setTotalNotes(Number(result));
        }
    }, [DecentralizedJournal])

    const getJournal = async () => {
        const result = await DecentralizedJournal.methods.getJournal().call({
            from: account
        })

        const newItemArray = [...result];
        setJournal(newItemArray.reverse());
    }

    const addNote = (event: any) => {
        event.preventDefault();

        DecentralizedJournal?.methods.addNote(addNoteTitle, addNoteContent).send({
            from: account
        }).on("receipt", () => {
            getJournal();
            getTotalNotes();
            addNoteModal();
        });
    }

    const deleteJournal = () => {
        DecentralizedJournal.methods.deleteJournal().send({
            from: account
        }).on("receipt", () => {
            getJournal();
            getTotalNotes();
            deleteJournalModal();
        })
    }

    useEffect(() => {
        if (localStorage.getItem("CONNECTED_WALLET") === "true") connectWallet();
    }, [])

    useEffect(() => {
        getTotalNotes();
    }, [getTotalNotes])

    useEffect(() => {
        if (active) getJournal();
    }, [active])

    return (
        <>
            {
                !active 
                
                ?

                <ConnectWalletSection>
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
                </ConnectWalletSection>

                :

                <JournalSection>
                        <div className="wallet-header">
                            <p>Wallet: {ownerAccount}</p>
                            <p>TotalNotes: {totalNotes}</p>
                        </div>
                        <div className="wallet-data">
                            {
                                !totalNotes

                                ?

                                <div className="firstNote">
                                    <h2>Let's save your story</h2>
                                    <p>Create your first note</p>
                                </div>

                                :

                                <>                                
                                    <ol>
                                        {
                                            journal.map((note) => {
                                                return (
                                                    <NoteItem
                                                        key={note.id}
                                                        title={note.title}
                                                        content={note.content}
                                                        // date={note.date}
                                                        id={note.id}
                                                    />
                                                )
                                            })
                                        }
                                    </ol>
                                </>
                            }
                            <div className="buttons">
                                <button onClick={addNoteModal}>Add note</button>
                                <button onClick={disconnectWallet}>Disconnect</button>
                                {
                                    totalNotes

                                    ? 
                                    
                                    <button 
                                        onClick={deleteJournalModal} 
                                        id="delete-journal-button">
                                            Delete your journal
                                    </button>

                                    :

                                    null
                                }
                            </div>
                        </div>
                </JournalSection>
            }        
            <Modal
                isOpen={addNoteIsOpen}
                style={{
                    overlay: {
                        background: "rgba(0, 0, 0, 0.4)",
                    },
                    content: {
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        maxWidth: "600px",
                        margin: "0 auto",
                        boxShadow: "0 0 8px rgba(0, 0, 0, 0.4)",
                        height: "max-content",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "90%",
                    }
                }}
            >
                <AddNoteForm
                    
                >
                    <label>Title</label>
                    <input
                        type="text"
                        placeholder="My first note"
                        onChange={addNoteTitleHandler}
                    />
                    <label>Content</label>
                    <textarea 
                        placeholder="My first note's content"
                        onChange={addNoteContentHandler}
                    ></textarea>
                    <div>
                        <button onClick={addNoteModal}>Cancel</button>
                        <button onClick={addNote}>Confirm</button>
                    </div>
                </AddNoteForm>
            </Modal>
            <Modal
                isOpen={deleteJournalIsOpen}
                style={{
                    overlay: {
                        background: "rgba(0, 0, 0, 0.4)",
                    },
                    content: {
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        maxWidth: "600px",
                        margin: "0 auto",
                        boxShadow: "0 0 8px rgba(0, 0, 0, 0.4)",
                        height: "max-content",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "90%",
                    }
                }}
            >
                <DeleteJournalContainer>
                    <p>Are you sure you want to delete your journal?</p>
                    <p>The information will not be recoverable</p>
                    <div>
                        <button onClick={deleteJournalModal}>Cancel</button>
                        <button onClick={deleteJournal}>Confirm</button>
                    </div>
                </DeleteJournalContainer>
            </Modal>
        </>
    )
}

export { AppInterface };