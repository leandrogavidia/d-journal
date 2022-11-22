import web3 from "web3";
import { InjectedConnector } from "@web3-react/injected-connector";
import { provider } from 'web3-core';

const BNBCHAIN_NETWOEK_TESTNET_CHAINID: number = 97;

const connector = new InjectedConnector({
    supportedChainIds: [BNBCHAIN_NETWOEK_TESTNET_CHAINID]
})

const getLibrary = (provider: provider) => {
    const library = new web3(provider);
    return library;
}

export { connector, getLibrary };