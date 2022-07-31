import React, {useState, useEffect} from 'react';
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

interface JavascripterProps {
  [key: string]: any;
}

const App: React.FC<JavascripterProps>=  () => {
  let [menuIsVisible, setMenuIsVisible] = useState(false);

  return (
      //{...{profilePhoto:profileImage}}
      <RouterContextProvider>
          <div className="App">
              <MainHeader
                  {...{
                      buttonActive: menuIsVisible,
                      onActivate:()=>{setMenuIsVisible(current => !current)}
                  }
                  }
              />
              <Main menuIsVisible={menuIsVisible}/>
          </div>
      </RouterContextProvider>

  );
}

export default App;
