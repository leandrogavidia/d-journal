import { AppContext } from "@components/AppContext/AppContext";
import { ModalComponent } from "@components/Modal/ModalComponent";
import { ChangeEvent, FC, useContext, useState } from "react";
import styled from "styled-components";
import { Loading } from "@components/Loading/Loading";

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

        & > label {
            cursor: pointer;
            background-color: ${({ theme }) => theme.colors.fourth};
            color: ${({ theme }) => theme.colors.white};
            padding: 0.6rem 1rem;
            border-radius: 5rem;
            white-space: nowrap;
            transition: 0.2s background-color;

            &:hover {
                background-color: ${({ theme }) => theme.colors.third};
            }
        }

        & > input {
            display: none;

            &:checked + ul {
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
            transition: 0.2s transform;

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

const Form = styled.form`
    label {
        font-size: ${({ theme }) => theme.font.size.phone.medium}rem;
        font-weight: ${({ theme }) => theme.font.weight.bold};
    }

    input {
        padding-bottom: 0.4rem;
        border: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.4);
        width: 100%;
        font-size: ${({ theme }) => theme.font.size.phone.medium}rem;
        margin: 1.2rem 0 2rem 0;
    }

    div {
        display: flex;
        flex-direction: column;
        width: 100%;
        row-gap: 1.2rem;
        
        button {
            border: none;
            font-size: ${({ theme }) => theme.font.size.phone.medium}rem;
            font-weight: ${({ theme }) => theme.font.weight.bold};
            padding: 1.2rem 2rem; 
            border-radius: 4px;
            color: ${({ theme }) => theme.colors.white};
            background-color: ${({ theme }) => theme.colors.fourth};
            transition: 0.2s background;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            white-space: nowrap;

            &:hover {
                background-color: ${({ theme }) => theme.colors.third};
            }
        }

        button:first-child {
            background: transparent;
            border: solid 1px ${({ theme }) => theme.colors.fourth};
            color: ${({ theme }) => theme.colors.fourth};

            &:hover {
                color: ${({ theme }) => theme.colors.white};
                background-color: ${({ theme }) => theme.colors.fourth};
            }
        }
    }

    @media(min-width: 600px) {
        div {
            flex-direction: row;
            column-gap: 1.2rem;

            button {
                width: 100%;
            }
        }
    }
`

const NoteItem: FC<Note> = ({title, content, date, id}) => {
    const { 
        DecentralizedJournal, 
        getJournal,
        account,
        disabledButtonStyles
    } = useContext(AppContext);

    const [editTitleIsOpen, setEditTitleIsOpen] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>("");
    const [newTitleLoading, setNewTitleLoading] = useState<boolean>(false);

    const editTitleIsOpenHandler = () => {
        setEditTitleIsOpen(!editTitleIsOpen);
        setNewTitle("")
    }

    const newTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.target.value);
    }

    const changeTitle = async (event: any) => {
        event.preventDefault();

        setNewTitleLoading(true);

        await DecentralizedJournal.methods.changeNoteTitle(id, newTitle).send({
            from: account
        })
        .on("receipt", () => {
            getJournal();
            editTitleIsOpenHandler();
            setNewTitleLoading(false);
        })
        .on("error", () => {
            setNewTitleLoading(false);
        })

        setNewTitleLoading(false);
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
                    <label htmlFor={`edit-${id}`}>Edit</label>
                    <input type="checkbox" id={`edit-${id}`} />
                    <ul>
                        <li onClick={editTitleIsOpenHandler}>Edit title</li>
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
                modalFunction={editTitleIsOpenHandler}
            >
                <Form>
                    <label htmlFor={`change-title-${id}`}>New title</label>
                    <input 
                        type="text" 
                        placeholder={`Current title: ${title}`}
                        id={`change-title-${id}`}
                        onChange={newTitleHandler}
                    />
                    <div>
                        <button onClick={editTitleIsOpenHandler}>Cancel</button>
                        <button
                            disabled={!newTitle}
                            style={!newTitle ? disabledButtonStyles : null}
                            onClick={changeTitle}
                        >
                            {
                                newTitleLoading
                                ? <Loading text="In progress" />
                                : "Confirm"
                            }
                        </button>
                    </div>
                </Form>
            </ModalComponent>
        </>
    )
}

export { NoteItem }