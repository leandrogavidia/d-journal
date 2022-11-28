import { FC, ReactNode } from "react";
import Modal from "react-modal";
import { CSSProperties } from "styled-components";

Modal.setAppElement('body');

const ModalComponent: FC<ModalItem> = ({ children, contentLabel, open, modalFunction  }) => {

    const modalContentStyles: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "600px",
        margin: "0 auto",
        boxShadow: "0 0 8px rgba(0, 0, 0, 0.4)",
        height: "max-content",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90%",
    }

    const modalOverlayStyles: CSSProperties = {
        background: "rgba(0, 0, 0, 0.4)",
    }

    return (
        <Modal
            isOpen={open}
            contentLabel={contentLabel}
            onRequestClose={modalFunction}
            
            style={{
                overlay: modalOverlayStyles,
                content: modalContentStyles
            }}
        >
            {children}
        </Modal>
    )
}

export { ModalComponent }