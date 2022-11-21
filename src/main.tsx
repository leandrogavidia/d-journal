import { ThemeProvider } from 'styled-components'
import React from 'react';
import { theme } from './styles/theme';
import ReactDOM from 'react-dom/client'
import App from './components/App/App'
import { Global } from './styles/Global'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <Global />
    <App />
  </ThemeProvider>
)
