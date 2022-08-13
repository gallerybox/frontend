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
import {RouterContext, RouterContextProvider} from "./views/router";
import Login from "./components/Login";
import {TokenContext, UserContext, UserContextProvider} from "./Auth";
import Content from "./components/Content";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import blue from '@mui/material/colors/blue';
import {red} from "@mui/material/colors";
import content from "./components/Content";
import mainViewTimeline from "./views/MainViewTimeline";

interface JavascripterProps {
  [key: string]: any;
}

const App: React.FC<JavascripterProps>=  () => {
    const [menuIsVisible, setMenuIsVisible] = useState(false);
    const [token,setToken] = useContext(TokenContext);

    const setView = useContext(RouterContext);
    if (token) {
        return (
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


        );
    } else {
        return(
                  <div className="App">
                      <Content/>
                  </div>
        )
    }
}

export default App;
