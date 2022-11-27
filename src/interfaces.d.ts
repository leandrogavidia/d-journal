interface Note {
    title: string,
    content: string,
    // date: number,
    id: number
}

interface ContextProps {
    connectWallet: () => void,
    disabledButtonStyles: CSSProperties
}