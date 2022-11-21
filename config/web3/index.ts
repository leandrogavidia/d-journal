import Web3 from "web3";
import { InjectedConnector } from "@web3-react/injected-connector";
import { provider } from "web3-core";

const BNBCHAIN_NETWORK_CHAINID = 56;

const connector = new InjectedConnector({
    supportedChainIds: [BNBCHAIN_NETWORK_CHAINID]
})

const getLibrary = (provider: provider) => {
    const library = new Web3(provider);
    return library;
}

export { connector, getLibrary };