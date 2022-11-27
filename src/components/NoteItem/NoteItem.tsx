import { FC } from "react";
import styled from "styled-components";

const ItemContainer = styled.li`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    width: 100%;
    padding: 1.2rem 2rem;
    background: ${({ theme }) => theme.colors.white};
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
    border-radius: 0.4rem;

    & > strong {
        white-space: nowrap;
        font-size: 2rem;
        font-weight: 700;
        overflow: auto;
    }

    & > p {
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 2.4rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.4);
        padding-bottom: 1rem;
        max-height: 6rem;
        overflow: auto;
    }

    & > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.2rem;
        font-weight: 300;
        column-gap: 2rem;

        time {
            line-height: 2rem;
        }

        & > span {
            background-color: ${({ theme }) => theme.colors.fourth};
            color: ${({ theme }) => theme.colors.white};
            padding: 0.6rem 1rem;
            border-radius: 5rem;
            white-space: nowrap;
        }
    }
`

const NoteItem: FC<Note> = ({
    title, 
    content, 
    date,
    id
    }) => {

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



    return (
        <ItemContainer>
            <strong>{title}</strong>
            <p>{content}</p>
            <div>
                <time>Date: {formatDate(date)}</time>
                <span>Note ID: {id}</span>
            </div>
        </ItemContainer>
    )
}

export { NoteItem }