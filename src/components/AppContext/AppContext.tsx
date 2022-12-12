import { createContext, ReactNode, useEffect, useState, useMemo, ChangeEvent } from "react";
import { connector } from "@web3Config/index";
import { useWeb3React } from "@web3-react/core";
import { CSSProperties } from "styled-components";
import { DecentralizedJournalArtifact } from "@web3Config/artifacts/DecentralizedJournal";
import { utils, writeFile } from "xlsx";

const AppContext = createContext<ContextProps>({} as ContextProps);

const AppProvider = ({ children }: {children: ReactNode }) => {
    const [totalNotes, setTotalNotes] = useState<number>(0);
    const [totalNotesLoading, setTotalNotesLoading] = useState<boolean>(false);
    const [addNoteTitle, setAddNoteTitle] = useState<string>("");
    const [addNoteContent, setAddNoteContent] = useState<string>("");
    const [AddNoteLoading, setAddNoteLoading] = useState<boolean>(false);
    const [connectLoading, setConnectLoading] = useState<boolean>(false);
    const [journal, setJournal] = useState<Note[]>([]);
    const [journalLoading, setJournalLoading] = useState<boolean>(false);
    const [wordToFilter, setWordToFilter] = useState<string>("");
    const [filteredJournal, setFilteredJournal] = useState<Note[]>([]);
    const [balanceModalIsOpen, setBalanceModalIsOpen] = useState<boolean>(false);
    const [addNoteIsOpen, setAddNoteIsOpen] = useState<boolean>(false);
    const [deleteJournalLoading, setDeleteJournalLoading] = useState<boolean>(false);
    const [deleteJournalIsOpen, setDeleteJournalIsOpen] = useState<boolean>(false);


    const { 
        activate, 
        active, 
        chainId, 
        library, 
        account, 
        deactivate,
    } = useWeb3React();

    const { abi, address } = DecentralizedJournalArtifact;

    const disabledButtonStyles: CSSProperties = {
        pointerEvents: "none", 
        background: "rgba(0, 0, 0, 0.4)", 
        userSelect: "none",
        border: "none",
        color: "#fff"
    };


    const wordToFilterHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setWordToFilter(newValue);
    }

    const formatDate = (date: number): string => {
        const fullDate = new Date(date * 1000);
        const day = fullDate.getDate();
        const month = fullDate.getMonth() + 1;
        const year = fullDate.getFullYear();
        const hour = fullDate.getHours();
        const minutes = "0" + fullDate.getMinutes();

        const currentDate = `${month}/${day}/${year} ${hour}:${minutes.slice(-2)}`;

        return currentDate;
    }

    const addNoteModal = () => {
        setAddNoteIsOpen(!addNoteIsOpen);
        setAddNoteTitle("");
        setAddNoteContent("");
    }

    const deleteJournalModal = () => {
        setDeleteJournalIsOpen(!deleteJournalIsOpen);
    }

    const DecentralizedJournal = useMemo(() => {
        if (active) {
            return new library.eth.Contract(abi, address[97]);
        }
    }, [chainId, library?.eth?.Contract, active]);

    const connectWallet = async () => {
        setConnectLoading(true);
        await activate(connector);
        localStorage.setItem("CONNECTED_WALLET", JSON.stringify(true));
        setConnectLoading(false);
    }

    const disconnectWallet = () => {
        deactivate();
        localStorage.removeItem("CONNECTED_WALLET");
    }

    const getWalletBalance = async () => {
        if(account && chainId) {
            const value: number = await library?.eth.getBalance(account);
            const convertValue: number = await library?.utils.fromWei(value);
            const result: number = Number(convertValue)
            if (result === 0) {
                setBalanceModalIsOpen(true);
            }
        }
    }

    const getJournal = async () => {
        setJournalLoading(true);

        const result = await DecentralizedJournal.methods.getJournal().call({
            from: account
        })

        const newItemArray = [...result];
        setJournal(newItemArray.reverse());
        setFilteredJournal(newItemArray);
        setJournalLoading(false);
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

    const downloadJournal = () => {
        const cleanedJournal: DonwloadJournal[] = [];
        
        journal.map(note => {
            const cleanedNote: DonwloadJournal = {
                title: note.title,
                content: note.content,
                date: formatDate(note.date),
                id: note.id
            }

            cleanedJournal.push(cleanedNote);
        })

        const workbook = utils.book_new();
        const worksheet = utils.json_to_sheet(cleanedJournal);
        utils.book_append_sheet(workbook, worksheet, "Notes");
        writeFile(workbook, "Journal.xlsx", { compression: true });
    }
    

    useEffect(() => {
        if (localStorage.getItem("CONNECTED_WALLET") === "true") connectWallet();
    }, [])

    useEffect(() => {
        const result = journal.filter(note => {
            const noteTitle = note.title.toLowerCase();
            const wordToFilterLowerCase = wordToFilter.toLowerCase();

            return noteTitle.includes(wordToFilterLowerCase);
        });

        setFilteredJournal(result);        
    }, [wordToFilter, account, chainId])

    useEffect(() => {
        if (account && active) getWalletBalance();
    }, [account, chainId])

    return (
        <AppContext.Provider value={{
            connectWallet,
            disabledButtonStyles,
            addNoteTitle,
            setAddNoteTitle,
            addNoteContent,
            setAddNoteContent,
            connectLoading,
            DecentralizedJournal,
            journal, 
            journalLoading, 
            getJournal,
            account,
            wordToFilter,
            setWordToFilter,
            wordToFilterHandler,
            filteredJournal,
            balanceModalIsOpen,
            setBalanceModalIsOpen,
            chainId,
            formatDate,
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
            active,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider };