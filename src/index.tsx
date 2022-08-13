import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {UserContextProvider} from "./Auth";
import {RouterContextProvider} from "./views/router";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const appTheme = createTheme({
    palette: {
        primary: {
            main: "rgb(144, 105, 172)"
        },
    },
});
root.render(
  <React.StrictMode>
    <UserContextProvider>
        <RouterContextProvider>
            <ThemeProvider theme={appTheme}>
                <App/>
            </ThemeProvider>
        </RouterContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log)
