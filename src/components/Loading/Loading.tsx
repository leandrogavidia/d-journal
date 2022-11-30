import { FC } from "react"
import styled from "styled-components"

const Container = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 1.2rem;
`

const LoadingItem = styled.span`
    width: 24px;
    height: 24px;
    border: 4px solid ${props => props.color};
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    animation: rotation 1s linear infinite;
    

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`

const Loading: FC<LoadingElement> = ({text, color = "white"}) => {
    return (
        <Container>
            <LoadingItem color={color} />
            {
                text 

                &&

                <span>{text}</span>
            }
        </Container>
    )
}

export { Loading }