import { ThemeProvider } from 'styled-components'
import { theme } from '@styles/theme';
import ReactDOM from 'react-dom/client'
import App from '@components/App/App'
import { Global } from '@styles/Global'
import { getLibrary } from "@web3Config/index";
import { Web3ReactProvider } from '@web3-react/core';
import { AppProvider } from '@components/AppContext/AppContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <AppProvider>
      <ThemeProvider theme={theme}>
        <Global />
        <App />
      </ThemeProvider>
    </AppProvider>
  </Web3ReactProvider>
)