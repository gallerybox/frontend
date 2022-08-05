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
import {RouterContextProvider} from "./views/router";
import Login from "./components/Login";
import {UserContext, UserContextProvider} from "./Auth";
import Content from "./components/Content";
import { createTheme } from '@mui/material/styles';
import blue from '@mui/material/colors/blue';

interface JavascripterProps {
  [key: string]: any;
}

const App: React.FC<JavascripterProps>=  () => {
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const [token,setToken] = useContext(UserContext)
  const user: boolean = false;


    const theme = createTheme({
        palette: {
            primary: blue,
        },
    });

    if (token) {
      return (
          //{...{profilePhoto:profileImage}}
             <RouterContextProvider>
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
             </RouterContextProvider>
      );
  } else {
      return(
          <div className="App">
              <Content>
                  <Login/>
              </Content>
          </div>
      )
  }
}

export default App;
