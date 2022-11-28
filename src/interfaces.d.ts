interface Note {
    title: string,
    content: string,
    date: number,
    id: number
}

interface ContextProps {
    connectWallet: () => void,
    disabledButtonStyles: CSSProperties,
    addNoteTitle: string,
    setAddNoteTitle: (title: string) => void,
    addNoteContent, 
    setAddNoteContent: (content: string) => void,
    connectLoading: boolean,
    DecentralizedJournal: any,
    journal: Note[],
    journalLoading: boolean,
    getJournal: () => Promise<void>,
    account: string | null | undefined
}

interface LoadingElement {
    text?: string
    color?: string
}

interface ModalItem {
    children: ReactNode,
    contentLabel: string,
    open: boolean,
    modalFunction: () => void
}