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
}

interface LoadingItem {
    text?: string
    color?: string
}