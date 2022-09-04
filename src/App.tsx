import React, {useState, useEffect, useContext} from 'react';
import logo from './logo.svg';
import ft from './assets/ft.jpg'
import menuIcon from './assets/bars-solid.svg'
import utri2 from './assets/utri2.png'
import './App.css';
import {ThematicSpaceRepository} from "./repositories/ThematicSpaceRepository";
import Hamburger from 'hamburger-react'
import MainHeader from "./components/MainHeader";
import Main from "./components/Main";
import {PathContext, RouterContext, RouterContextProvider, ViewContext} from "./views/router";
import Login from "./components/Login";
import {TokenContext, UserContext, UserContextProvider} from "./Auth";
import Content from "./components/Content";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import blue from '@mui/material/colors/blue';
import {red} from "@mui/material/colors";
import content from "./components/Content";
import mainViewTimeline from "./views/MainViewTimeline";
import TermsAndConditions from "./views/TermsAndConditions";
import ForgotPassword from "./views/ForgotPassword";
import {backend_url, front_config_csv} from "./repositories/config";

interface JavascripterProps {
  [key: string]: any;
}

const App: React.FC<JavascripterProps>=  () => {
    const [menuIsVisible, setMenuIsVisible] = useState(false);
    const [token,setToken] = useContext(TokenContext);
    const path = useContext(PathContext);
    const [configLoaded, setConfigLoaded] = useState(true);

    const noMenuViews: Array<string> = ["/login",  "/terms-and-conditions", "/forgot-password", "/reset-password", "/register"];
/*
    useEffect(()=>{
        fetch(front_config_csv, {
            method: "GET",
        })
            .then(response => response.text())
            .then(data =>{
                backend_url.url=data;
                backend_url.update=true;
                setConfigLoaded(true);
            } );
    },[])
    */

    if (!noMenuViews.includes(path)) {
        return (
            <>
                {configLoaded &&
                    <div className="App">
                        <MainHeader
                            {...{
                                buttonActive: menuIsVisible,
                                onActivate: () => {
                                    setMenuIsVisible(current => !current)
                                }
                            }
                            }
                        />
                        <Main menuIsVisible={menuIsVisible}/>
                    </div>
                }
            </>
        );
    } else {
        return(
            <>
                {configLoaded &&
                <div className="App">
                    <Content/>
                </div>
                }
            </>
        )
    }
}

export default App;
