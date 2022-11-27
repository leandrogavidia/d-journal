import { createContext, ReactNode, useEffect } from "react";
import { connector } from "@web3Config/index";
import { useWeb3React } from "@web3-react/core";
import { CSSProperties } from "styled-components";

const AppContext = createContext<ContextProps>({} as ContextProps);

const AppProvider = ({ children }: {children: ReactNode }) => {
    const { activate } = useWeb3React();

    const disabledButtonStyles: CSSProperties = {
        pointerEvents: "none", 
        background: "rgba(0, 0, 0, 0.4)", 
        userSelect: "none"
    };

    const connectWallet = () => {
        activate(connector);
        localStorage.setItem("CONNECTED_WALLET", JSON.stringify(true));
    }

    useEffect(() => {
        if (localStorage.getItem("CONNECTED_WALLET") === "true") connectWallet();
    }, [])

    return (
        <AppContext.Provider value={{
            connectWallet,
            disabledButtonStyles
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider };