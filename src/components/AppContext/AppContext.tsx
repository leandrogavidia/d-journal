import { createContext, ReactNode, useEffect, useState, useMemo } from "react";
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



    const { activate, active, chainId, library, account } = useWeb3React();

    const { abi, address } = DecentralizedJournalArtifact;

    const DecentralizedJournal = useMemo(() => {
        if (active) {
            return new library.eth.Contract(abi, address[chainId]);
        }
    }, [chainId, library?.eth?.Contract, active]);

    const disabledButtonStyles: CSSProperties = {
        pointerEvents: "none", 
        background: "rgba(0, 0, 0, 0.4)", 
        userSelect: "none"
    };


    
    const connectWallet = async () => {
        setConnectLoading(true);
        await activate(connector);
        localStorage.setItem("CONNECTED_WALLET", JSON.stringify(true));
        setConnectLoading(false);
    }

    const getJournal = async () => {
        setJournalLoading(true);

        const result = await DecentralizedJournal.methods.getJournal().call({
            from: account
        })

        const newItemArray = [...result];
        setJournal(newItemArray.reverse());
        setJournalLoading(false);
    }    

    useEffect(() => {
        if (localStorage.getItem("CONNECTED_WALLET") === "true") connectWallet();
    }, [])



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
            account
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider };