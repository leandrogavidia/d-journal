import { createContext, ReactNode, useEffect, useState, useMemo, ChangeEvent } from "react";
import { connector } from "@web3Config/index";
import { useWeb3React } from "@web3-react/core";
import { CSSProperties } from "styled-components";
import { DecentralizedJournalArtifact } from "@web3Config/artifacts/DecentralizedJournal";

const AppContext = createContext<ContextProps>({} as ContextProps);

const AppProvider = ({ children }: {children: ReactNode }) => {
    const [addNoteTitle, setAddNoteTitle] = useState<string>("");
    const [addNoteContent, setAddNoteContent] = useState<string>("");
    const [connectLoading, setConnectLoading] = useState<boolean>(false);
    const [journal, setJournal] = useState<Note[]>([]);
    const [journalLoading, setJournalLoading] = useState<boolean>(false);
    const [wordToFilter, setWordToFilter] = useState<string>("");
    const [filteredJournal, setFilteredJournal] = useState<Note[]>([]);
    const [balanceModalIsOpen, setBalanceModalIsOpen] = useState<boolean>(false);



    const { activate, active, chainId, library, account } = useWeb3React();

    const { abi, address } = DecentralizedJournalArtifact;

    const DecentralizedJournal = useMemo(() => {
        if (active) {
            return new library.eth.Contract(abi, address[97]);
        }
    }, [chainId, library?.eth?.Contract, active]);

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

    const connectWallet = async () => {
        setConnectLoading(true);
        await activate(connector);
        localStorage.setItem("CONNECTED_WALLET", JSON.stringify(true));
        setConnectLoading(false);
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
            formatDate
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider };