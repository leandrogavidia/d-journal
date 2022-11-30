import { AppContext } from "@components/AppContext/AppContext";
import { ModalComponent } from "@components/Modal/ModalComponent";
import { ChangeEvent, FC, useContext, useState } from "react";
import styled from "styled-components";
import { Loading } from "@components/Loading/Loading";
import { AiFillSetting } from "react-icons/ai";
import { BsFillCalendarEventFill } from "react-icons/bs";

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
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            color: ${({ theme }) => theme.colors.fourth};
            border-radius: 5rem;
            white-space: nowrap;
            transition: 0.2s color;

            &:hover {
                color: ${({ theme }) => theme.colors.third};
            }

            svg {
                min-width: 24px;
                min-height: 24px;
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
            display: flex;
            justify-content: flex-start;
            align-items: center;
            column-gap: 0.8rem;
            line-height: 2rem;

            svg {
                min-width: 16px; 
                min-height: 16px;
                fill: ${({ theme }) => theme.colors.fourth};
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
    width: 100%;

    label {
        font-size: ${({ theme }) => theme.font.size.phone.medium}rem;
        font-weight: ${({ theme }) => theme.font.weight.bold};
    }

    input, textarea {
        width: 100%;
        font-size: ${({ theme }) => theme.font.size.phone.medium}rem;
        margin: 1.2rem 0 2rem 0;
    }

    input {
        padding-bottom: 0.4rem;
        border: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    }

    textarea {
        min-height: 10rem;
        padding: 0.8rem 1.2rem;
        resize: none;
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

    const [editContentIsOpen, setEditContentIsOpen] = useState<boolean>(false);
    const [newContent, setNewContent] = useState<string>("");
    const [newContentLoading, setNewContentLoading] = useState<boolean>(false);


    const editTitleIsOpenHandler = () => {
        setEditTitleIsOpen(!editTitleIsOpen);
        setNewTitle("")
    }

    const editContentIsOpenHandler = () => {
        setEditContentIsOpen(!editContentIsOpen);
        setNewContent("")
    }

    const newTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.target.value);
    }

    const newContentHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setNewContent(event.target.value)
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
    }

    const changeContent = async (event: any) => {
        event.preventDefault();

        setNewContentLoading(true);

        await DecentralizedJournal.methods.changeNoteContent(id, newContent).send({
            from: account
        })
        .on("receipt", () => {
            getJournal();
            editContentIsOpenHandler();
            setNewContentLoading(false);
        })
        .on("error", () => {
            setNewContentLoading(false);
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
                    <label title="Edit note" htmlFor={`edit-${id}`}><AiFillSetting/></label>
                    <input type="checkbox" id={`edit-${id}`} />
                    <ul>
                        <li onClick={editTitleIsOpenHandler}>Edit title</li>
                        <li onClick={editContentIsOpenHandler}>Edit content</li>
                    </ul> 
                </div>
                <p>{content}</p>
                <div>
                    <time title="Note's date"><BsFillCalendarEventFill/> {formatDate(date)}</time>
                    <span>Note n.º {id}</span>
                </div>
            </ItemContainer>
            <ModalComponent
                open={editTitleIsOpen}
                contentLabel={`Modal to edit the title of the ${title} note`}
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
            <ModalComponent
                open={editContentIsOpen}
                contentLabel={`Modal to edit the content of the ${title} note`}
                modalFunction={editContentIsOpenHandler}
            >
                <Form>
                    <label htmlFor={`change-content-${id}`}>New content</label>
                    <textarea
                        placeholder={`Current content: ${content.slice(0, 32)}...`}
                        id={`change-title-${id}`}
                        onChange={newContentHandler}
                    ></textarea>
                    <div>
                        <button onClick={editContentIsOpenHandler}>Cancel</button>
                        <button
                            disabled={!newContent}
                            style={!newContent ? disabledButtonStyles : null}
                            onClick={changeContent}
                        >
                            {
                                newContentLoading
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