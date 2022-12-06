import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window{
    ethereum?:MetaMaskInpageProvider
  }

  interface Note {
      title: string,
      content: string,
      date: number,
      id: number
  }

  interface DonwloadJournal {
    title: string,
    content: string,
    date: string,
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
      account: string | null | undefined,
      wordToFilter: string,
      setWordToFilter: (value: string) => void,
      wordToFilterHandler: (event: ChangeEvent<HTMLInputElement>) => void,
      filteredJournal: Note[],
      balanceModalIsOpen: boolean,
      setBalanceModalIsOpen: (state: boolean) => void,
      chainId: number | undefined,
      formatDate: (date: number) => string,
      totalNotes: number,
      getTotalNotes: () => void,
      totalNotesLoading: boolean,
      addNoteModal: () => void,
      addNoteIsOpen: boolean,
      AddNoteLoading: boolean,
      addNote: (event: any) => void,
      deleteJournalModal: () => void,
      deleteJournalIsOpen: boolean,
      deleteJournal: () => void,
      deleteJournalLoading: boolean,
      downloadJournal: () => void,
      disconnectWallet: () => void,
      active: boolean
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
}