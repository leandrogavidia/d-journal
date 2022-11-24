import { FC } from "react";

const NoteItem: FC<Note> = ({title, content, date, id}) => {
    return (
        <li>
            <strong>{title}</strong>
            <p>{content}</p>
            <div>
                <time>{date}</time>
                <span>Note ID: {id}</span>
            </div>
        </li>
    )
}

export { NoteItem }