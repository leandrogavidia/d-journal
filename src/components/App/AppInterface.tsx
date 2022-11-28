import { ChangeEvent, FC, useContext, useEffect, useMemo, useState } from "react";
import styled, { useTheme } from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { NoteItem } from "@components/NoteItem/NoteItem";
import { ConnectWalletSection } from "../../layouts/ConnectWalletSection/ConnectWalletSection";
import Modal from "react-modal";
import { AppContext } from "@components/AppContext/AppContext";
import { Loading } from "@components/Loading/Loading";
import { ModalComponent } from "@components/Modal/ModalComponent";

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
            font-size: ${({ theme }) => theme.font.size.phone.small}rem;
            font-weight: ${({ theme }) => theme.font.weight.bold};
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
                font-weight: ${({ theme }) => theme.font.weight.bold};
                color: ${({ theme }) => theme.colors.secondary};
            }

            p {
                font-size: ${({ theme }) => theme.font.size.phone.medium}rem;
                font-weight: ${({ theme }) => theme.font.weight.semibold};
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
        font-size: ${({ theme }) => theme.font.size.phone.medium}rem;
        font-weight: ${({ theme }) => theme.font.weight.bold};
    }

    input, textarea {
        width: 100%;
        font-size: ${({ theme }) => theme.font.size.phone.medium}rem;
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
            font-size: ${({ theme }) => theme.font.size.phone.medium}rem;
            font-weight: ${({ theme }) => theme.font.weight.bold};
            padding: 1.2rem 2rem; 
            border-radius: 4px;
            color: ${({ theme }) => theme.colors.white};
            background-color: ${({ theme }) => theme.colors.fourth};
            transition: 0.2s background;
            display: flex;
            justify-content: center;
            align-items: center;
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
        font-size: ${({ theme }) => theme.font.size.phone.large}rem;
        font-weight: ${({ theme }) => theme.font.weight.bold};
        line-height: 2.8rem;
    }

    p:nth-child(2) {
        font-size: ${({ theme }) => theme.font.size.phone.small}rem;
        font-weight: ${({ theme }) => theme.font.weight.semibold};
        line-height: 2rem;
    }

    div {
        display: flex;
        flex-direction: column;
        width: 100%;
        row-gap: 1.2rem;
        
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
    const { 
        addNoteTitle, 
        setAddNoteTitle,
        addNoteContent,
        setAddNoteContent,
        disabledButtonStyles,
        DecentralizedJournal,
        journal,
        journalLoading,
        getJournal,
        account
     } = useContext(AppContext);

    const theme = useTheme();

    const [totalNotes, setTotalNotes] = useState<number>(0);
    const [addNoteIsOpen, setAddNoteIsOpen] = useState<boolean>(false);
    const [deleteJournalIsOpen, setDeleteJournalIsOpen] = useState<boolean>(false);

    const [totalNotesLoading, setTotalNotesLoading] = useState<boolean>(false);
    const [AddNoteLoading, setAddNoteLoading] = useState<boolean>(false);
    const [deleteJournalLoading, setDeleteJournalLoading] = useState<boolean>(false);

    const {
        active,
        deactivate,
    } = useWeb3React()

    const ownerAccount = account?.slice(0, 6) + "..." + account?.slice(-4);

    const addNoteModal = () => {
        setAddNoteIsOpen(!addNoteIsOpen);
        setAddNoteTitle("");
        setAddNoteContent("");
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

    const disconnectWallet = () => {
        deactivate();
        localStorage.removeItem("CONNECTED_WALLET");
    }

    const getTotalNotes = async () => {
        if (DecentralizedJournal) {
            setTotalNotesLoading(true);

            const result = await DecentralizedJournal.methods.getTotalNotes().call({
                from: account
            });

            setTotalNotes(Number(result));
            setTotalNotesLoading(false);
        }
    }

    const addNote = (event: any) => {
        event.preventDefault();
        
        setAddNoteLoading(true);

        DecentralizedJournal?.methods.addNote(addNoteTitle, addNoteContent).send({
            from: account
        })
        .on("receipt", () => {
            getJournal();
            getTotalNotes();
            addNoteModal();
            setAddNoteLoading(false);
        })
        .on("error", () => {
            setAddNoteLoading(false);
        })
    }

    const deleteJournal = () => {
        setDeleteJournalLoading(true);

        DecentralizedJournal.methods.deleteJournal().send({
            from: account
        })
        .on("receipt", () => {
            getJournal();
            getTotalNotes();
            deleteJournalModal();
            setDeleteJournalLoading(false);
        })
        .on("error", () => {
            setDeleteJournalLoading(false);
        })
    }

    useEffect(() => {
        if (active) getTotalNotes();
    }, [active])

    useEffect(() => {
        if (active) getJournal();
    }, [active])

    return (
        <>
            {
                !active 
                
                ?

                <ConnectWalletSection />

                :

                <JournalSection>
                        <div className="wallet-header">
                            <p>Wallet: {ownerAccount}</p>
                            {
                                !totalNotesLoading
                                ? <p>Total notes: {totalNotes}</p>
                                : <Loading />
                            }
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
                                    {
                                        !journalLoading

                                        ?

                                        <ol>
                                            {
                                                journal.map((note) => {
                                                    return (
                                                        <NoteItem
                                                            key={note.date}
                                                            title={note.title}
                                                            content={note.content}
                                                            date={note.date}
                                                            id={note.id}
                                                        />
                                                    )
                                                })
                                            }
                                        </ol>

                                        :

                                        <Loading 
                                            text="Seaching your journal" 
                                            color={theme.colors.fourth}
                                        />
                                    }              
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
            <ModalComponent
                open={addNoteIsOpen}
                contentLabel="Modal to add a new note"
                modalFunction={addNoteModal}
            >
                <AddNoteForm>
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
                        <button 
                            onClick={addNote}
                            disabled={!addNoteTitle || !addNoteContent ? true : false}
                            style={
                                !addNoteTitle || !addNoteContent
                                ? disabledButtonStyles
                                : null
                            }
                            >
                                {
                                    AddNoteLoading
                                    ? <Loading text="In progress" />
                                    : "Confirm"
                                }
                        </button>
                    </div>
                </AddNoteForm>
            </ModalComponent>

            <ModalComponent
                open={deleteJournalIsOpen}
                contentLabel="Modal to delete journal"
                modalFunction={deleteJournalModal}
            >
                <DeleteJournalContainer>
                    <p>Are you sure you want to delete your journal?</p>
                    <p>The information will not be recoverable</p>
                    <div>
                        <button onClick={deleteJournalModal}>Cancel</button>
                        <button onClick={deleteJournal}>
                            {
                                deleteJournalLoading
                                ? <Loading text="In progress" />
                                : "Confirm"
                            }
                        </button>
                    </div>
                </DeleteJournalContainer>
            </ModalComponent>
        </>
    )
}

export { AppInterface };