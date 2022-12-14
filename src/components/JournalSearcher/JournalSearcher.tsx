import { AppContext } from "@components/AppContext/AppContext";
import { FC, FormEvent, useContext, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import styled from "styled-components";

const Container = styled.form`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 50px;
    column-gap: 0.8rem;
    padding: 0 1.2rem;

    input {
        width: 100%;
        border: none;
        min-height: 3.2rem;
        padding-left: 0.4rem;

        &:focus {
            outline: none;
        }
    }

    label {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    svg {
        cursor: pointer;
        color: ${({ theme }) => theme.colors.fourth};
        width: 14px;
        height: 14px;
        transition: 0.2s;

        &:hover {
            color: ${({ theme }) => theme.colors.third};
        }
    }
`

const JournalSearcher: FC = () => {
    const { wordToFilterHandler, setWordToFilter } = useContext(AppContext);
    const input = useRef<HTMLInputElement>(null);
    const form = useRef<HTMLFormElement>(null);

    const resetSearcher = () => {
        if (input.current) {
            input.current.value = "";
            setWordToFilter("");
        }
    }

    const disabledEnter = (event: FormEvent) => {
        event.preventDefault();
    }

    return (
        <Container ref={form} onSubmit={disabledEnter}>
            <label htmlFor="note-searcher" title="Search a note">
                <FaSearch/>
            </label>
            <input 
                ref={input}
                type="text"
                title="Searcher of notes"
                placeholder="Search for a note"
                id="note-searcher"
                onChange={wordToFilterHandler}
            />
            <FaTimes title="Remove search" onClick={resetSearcher} />
        </Container>
    )
}

export { JournalSearcher };