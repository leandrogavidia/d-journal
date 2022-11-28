import { AppContext } from "@components/AppContext/AppContext";
import { ModalComponent } from "@components/Modal/ModalComponent";
import { FC, useContext, useState } from "react";
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
    border-left: 8px solid ${({ theme }) => theme.colors.fourth};

    & > .header {
        position: relative;

        strong {
            white-space: nowrap;
            font-size: 2rem;
            font-weight: 700;
            overflow: auto;
        }

        & > span {
            cursor: pointer;

            &:hover {
                background-color: ${({ theme }) => theme.colors.third};
            }

            &:hover + ul {
                transform: scale(1);
            }
        }

        ul {
            list-style: none;
            position: absolute;
            top: 3.2rem;
            right: 0;
            background-color: ${({ theme }) => theme.colors.white};
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
            padding: 1.2rem 2rem 1.2rem 1.2rem;
            border-radius: 6px;
            flex-direction: column;
            row-gap: 1.6rem;
            display: flex;
            border-top: 8px solid ${({ theme }) => theme.colors.fourth};
            transform: scale(0);
            transition: 0.2s;

            li {
                font-size: ${({ theme }) => theme.font.size.phone.small}rem;
                font-weight: ${({ theme }) => theme.font.weight.semibold};
                border-inline-start: solid 2px ${({ theme }) => theme.colors.fourth};
                padding-left: 0.6rem;
                cursor: pointer;

                &:hover {
                    color: ${({ theme }) => theme.colors.fourth};
                    border-inline-start-color: ${({ theme }) => theme.colors.third};
                }
            }

            &:hover {
                transform: scale(1);
                display: flex;
            }
        }
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

            span {
                color: ${({ theme }) => theme.colors.fourth};
                font-weight: ${({ theme }) => theme.font.weight.semibold};
            }
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

const NoteItem: FC<Note> = ({title, content, date, id}) => {
    const { 
        DecentralizedJournal, 
        getJournal,
        account
    } = useContext(AppContext);

    const [editTitleIsOpen, setEditTitleIsOpen] = useState<boolean>(false);

    const editTitleHandler = () => {
        setEditTitleIsOpen(!editTitleIsOpen);
    }

    const changeTitle = () => {
        DecentralizedJournal.methods.changeNoteTitle(id, "Titulo cambiado").send({
            from: account
        })
        .on("receipt", () => {
            getJournal();
        })
    }

    const changeContent = () => {
        DecentralizedJournal.methods.changeNoteContent(id, "Contenido cambiado").send({
            from: account
        })
        .on("receipt", () => {
            getJournal();
        })
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



    return (
        <>        
            <ItemContainer>
                <div className="header">
                    <strong>{title}</strong>     
                    <span>Edit</span>
                    <ul>
                        <li onClick={editTitleHandler}>Edit title</li>
                        <li onClick={changeContent}>Edit content</li>
                    </ul> 
                </div>
                <p>{content}</p>
                <div>
                    <time><span>Date:</span> {formatDate(date)}</time>
                    <span>Note ID: {id}</span>
                </div>
            </ItemContainer>
            <ModalComponent
                open={editTitleIsOpen}
                contentLabel="Modal to edit the title of this note"
                modalFunction={editTitleHandler}
            >

            </ModalComponent>
        </>
    )
}

export { NoteItem }