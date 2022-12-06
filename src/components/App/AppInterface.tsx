import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import { NoteItem } from "@components/NoteItem/NoteItem";
import { ConnectWalletSection } from "../../layouts/ConnectWalletSection/ConnectWalletSection";
import { AppContext } from "@components/AppContext/AppContext";
import { Loading } from "@components/Loading/Loading";
import { ModalComponent } from "@components/Modal/ModalComponent";
import { JournalSearcher } from "@components/JournalSearcher/JournalSearcher";
import { RiEmotionSadLine } from "react-icons/ri";
import { CiWarning } from "react-icons/ci";
import { BsDashLg, BsPlusLg } from "react-icons/bs";

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
    position: relative;
    overflow: hidden;

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
        padding: 2rem 1.2rem 4rem 1.2rem;
        position: relative;

        & > #options-button-label {
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5rem;
            font-size: 4rem;
            position: absolute;
            box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.6);
            background-color: ${({ theme }) => theme.colors.fourth};
            width: 5.2rem;
            height: 5.2rem;
            color: ${({ theme }) => theme.colors.white};
            cursor: pointer;
            transition: 0.2s;
            bottom: 1.2rem;
            right: -1rem;
            transform: translate(-50%, -50%);
            z-index: 1000;

            &:hover {
                background: ${({ theme }) => theme.colors.third};
            }

            svg {
                width: 2.4rem;
                height: 2.4rem;
            }
        }

        & > #options-button-input {
            display: none;

            &:checked + .buttons {
                position: absolute;
                padding: 2rem 1.6rem 4rem 1.6rem;
                bottom: 0;
            }

            &:checked ~ label::before {
                content: "-";
            }


        }

        .firstNote {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            row-gap: 1.2rem;
            margin: 0 1.2rem;

            h2 {
                font-size: ${({ theme }) => theme.font.size.phone.large}rem;
                font-weight: ${({ theme }) => theme.font.weight.bold};
                color: ${({ theme }) => theme.colors.secondary};
                text-align: center;
                line-height: 
            }

            p {
                font-size: ${({ theme }) => theme.font.size.phone.medium}rem;
                font-weight: ${({ theme }) => theme.font.weight.semibold};
            }
        }

        & > ol {
            padding: 1.2rem 0.8rem;
            list-style: none;
            display: flex;
            flex-direction: column;
            row-gap: 2rem;
            overflow: auto;
            width: 100%;
            height: 100%;
        }

        & > .buttons {
            display: flex;
            flex-direction: column;
            row-gap: 1rem;
            width: 100%;
            transition: 0.8s bottom;
            background-color: white;
            position: absolute;
            bottom: 0;
            box-shadow: 0 0 1.2rem rgba(0, 0, 0, 0.4);
            border-radius: 1.6rem;
            bottom: -100%;
            padding: 2rem 1.2rem;

            button {
                border: none;
                font-size: ${({ theme }) => theme.font.size.phone.medium}rem;
                font-weight: ${({ theme }) => theme.font.weight.bold};
                padding: 1.2rem 2rem; 
                border: 2px solid ${({ theme }) => theme.colors.fourth};
                border-radius: 50px;
                color: ${({ theme }) => theme.colors.fourth};
                background-color: ${({ theme }) => theme.colors.white};
                transition: 0.2s background;
                cursor: pointer;
                white-space: nowrap;

                &:hover {
                    background-color: ${({ theme }) => theme.colors.fourth};
                    color: ${({ theme }) => theme.colors.white};
                }
            }

            #delete-journal-button {
                color: white;
                background: black;
                transition: 0.2s background-color;
                border: none;

                &:hover {
                    background-color: red;
                }
            }
        }
    }

    @media(min-width: 600px) {
        & > .wallet-data {

            & > #options-button-label {
                display: none
            }

            & > .buttons {
                position: relative;
                flex-direction: row;
                flex-wrap: wrap;
                column-gap: 1.2rem;
                border-top: 1px solid rgba(0, 0, 0, 0.4);
                padding: 0;
                padding-top: 2rem;
                box-shadow: none;
                border-radius: 0;
                bottom: 0;
            }
        }
    }
`

const AddNoteForm = styled.form`
    width: 100%;

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
            white-space: nowrap;
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

    svg {
        width: 64px;
        height: 64px;
        color: red;
    }

    p {
        font-size: ${({ theme }) => theme.font.size.phone.small}rem;
        font-weight: ${({ theme }) => theme.font.weight.semibold};
        line-height: 2rem;
    }

    p:nth-child(2) {
        font-size: ${({ theme }) => theme.font.size.phone.large}rem;
        font-weight: ${({ theme }) => theme.font.weight.bold};
        line-height: 2.8rem;
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
            background-color: ${({ theme }) => theme.colors.black};
            transition: 0.2s background;
            white-space: nowrap;
            cursor: pointer;

            &:hover {
                background-color: red;
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

const BalanceModal = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    text-align: center;
    row-gap: 2rem;

    svg {
        width: 64px;
        height: 64px;
        color: ${({ theme }) => theme.colors.fourth};
    }

    p {
        font-size: ${({ theme }) => theme.font.size.phone.small}rem;
        font-weight: ${({ theme }) => theme.font.weight.semibold};
        line-height: 2rem;
    }

    p:nth-child(2) {
        font-size: ${({ theme }) => theme.font.size.phone.large}rem;
        font-weight: ${({ theme }) => theme.font.weight.bold};
        line-height: 2.8rem;
        color: ${({ theme }) => theme.colors.fourth};
    }
        
    button {
        border: none;
        font-size: ${({ theme }) => theme.font.size.phone.medium}rem;
        font-weight: ${({ theme }) => theme.font.weight.bold};
        padding: 1.2rem 2rem; 
        border-radius: 4px;
        color: ${({ theme }) => theme.colors.white};
        background-color: transparent;
        border: 2px solid ${({ theme }) => theme.colors.fourth};
        color: ${({ theme }) => theme.colors.fourth};
        transition: 0.2s background;
        white-space: nowrap;
        cursor: pointer;
        min-width: 160px;

        &:hover {
            background-color: ${({ theme }) => theme.colors.fourth};
            color: ${({ theme }) => theme.colors.white};
        }
    }

    a {
        text-decoration: none;
        font-weight: ${({ theme }) => theme.font.weight.bold};
        color: #f0b90b;
    }
`

const AppInterface: FC = () => {
    const { 
        addNoteTitle, 
        setAddNoteTitle,
        addNoteContent,
        setAddNoteContent,
        disabledButtonStyles,
        journalLoading,
        getJournal,
        account,
        filteredJournal,
        balanceModalIsOpen,
        setBalanceModalIsOpen,
        chainId,
        totalNotes,
        getTotalNotes,
        totalNotesLoading,
        addNoteModal,
        addNoteIsOpen,
        AddNoteLoading,
        addNote,
        deleteJournalModal,
        deleteJournalIsOpen,
        deleteJournal,
        deleteJournalLoading,
        downloadJournal,
        disconnectWallet,
        active
     } = useContext(AppContext);


    const theme = useTheme();

    const [showMenuIsOpen, setShowMenuIsOpen] = useState<boolean>(false);
    const ownerAccount = account?.slice(0, 6) + "..." + account?.slice(-4);


    const showMenuIsOpenHandler = () => {
        setShowMenuIsOpen(!showMenuIsOpen);
    }

    const addNoteTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setAddNoteTitle(event.target.value);
    }

    const addNoteContentHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setAddNoteContent(event.target.value);
    }

    const balanceModal = () => {
        setBalanceModalIsOpen(!balanceModal);
    }


    useEffect(() => {
        if (active) getTotalNotes();
    }, [active, account, chainId])

    useEffect(() => {
        if (active) getJournal();
    }, [active, account, chainId])

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

                                        <>                                        
                                            <JournalSearcher />

                                            <ol>
                                                {
                                                    filteredJournal.map((note) => {
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
                                        </>

                                        :

                                        <Loading 
                                            text="Seaching your journal" 
                                            color={theme.colors.fourth}
                                        />
                                    }              
                                </>
                            }
                            <label 
                                onClick={showMenuIsOpenHandler} 
                                id="options-button-label" 
                                htmlFor="options-button-input"
                            >
                                { 
                                    !showMenuIsOpen ? <BsPlusLg/> : <BsDashLg/>
                                }
                            </label>
                            <input id="options-button-input" type="checkbox"/>
                            <div className="buttons">
                                <button 
                                    onClick={addNoteModal}
                                    disabled={journalLoading || totalNotesLoading}
                                    style={journalLoading || totalNotesLoading ? disabledButtonStyles : null}
                                >
                                    Add note
                                </button>
                                <button onClick={disconnectWallet}>Disconnect</button>
                                {
                                    totalNotes

                                    ? 
                                    
                                    <>                                    
                                        <button 
                                            onClick={downloadJournal}
                                            disabled={journalLoading || totalNotesLoading}
                                            style={journalLoading || totalNotesLoading ? disabledButtonStyles : null}
                                        >
                                            Download journal
                                        </button>
                                        <button 
                                            onClick={deleteJournalModal} 
                                            disabled={journalLoading || totalNotesLoading}
                                            style={journalLoading || totalNotesLoading ? disabledButtonStyles : null}
                                            id="delete-journal-button">
                                                Delete your journal
                                        </button>
                                    </>

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
                    <label htmlFor="add-note-input">Title</label>
                    <input
                        required
                        type="text"
                        placeholder="My first note"
                        onChange={addNoteTitleHandler}
                        id="add-note-input"
                        disabled={AddNoteLoading}
                    />
                    <label htmlFor="add-note-textarea">Content</label>
                    <textarea 
                        required
                        placeholder="My first note's content"
                        onChange={addNoteContentHandler}
                        id="add-note-textarea"
                        disabled={AddNoteLoading}
                    ></textarea>
                    <div>
                        <button onClick={addNoteModal}>Cancel</button>
                        <button 
                            onClick={addNote}
                            disabled={!addNoteTitle || !addNoteContent || AddNoteLoading ? true : false}
                            style={
                                !addNoteTitle || !addNoteContent || AddNoteLoading
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
                    <CiWarning />
                    <p>Are you sure you want to delete your journal?</p>
                    <p>The information will not be recoverable</p>
                    <div>
                        <button onClick={deleteJournalModal}>Cancel</button>
                        <button 
                            onClick={deleteJournal}
                            style={deleteJournalLoading ? disabledButtonStyles : null}
                            disabled={deleteJournalLoading}
                        >
                            {
                                deleteJournalLoading
                                ? <Loading text="In progress" />
                                : "Confirm"
                            }
                        </button>
                    </div>
                </DeleteJournalContainer>
            </ModalComponent>
            <ModalComponent
                open={balanceModalIsOpen}
                contentLabel="Modal about your current balance"
                modalFunction={balanceModal}
            >
                <BalanceModal>
                    <RiEmotionSadLine />
                    <p>You have not funds!</p>
                    <p>You need to have some funds to start adding, editing or deleting your notes.</p>
                    <p>You are in a testnet, you can obtain funds in the <a href="https://testnet.bnbchain.org/faucet-smart" target="_blank">BNB Chain faucet</a>.</p>
                    <button onClick={balanceModal}>Close</button>
                </BalanceModal>
            </ModalComponent>
        </>
    )
}

export { AppInterface };