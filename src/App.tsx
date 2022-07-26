import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import ft from './assets/ft.jpg'
import utri2 from './assets/utri2.png'
import './App.css';
import {ThematicSpaceRepository} from "./repositories/ThematicSpaceRepository";
import Hamburger from 'hamburger-react'
import MainHeader from "./components/MainHeader";
import Main from "./components/Main";

interface JavascripterProps {
  [key: string]: any;
}

const App: React.FC<JavascripterProps>=  ({subject}) => {
  const [json, setJson] = useState({});
  const [isOpen, setOpen] = useState(false)
  const [profileImage, setProfileImage] = useState(utri2)


  useEffect(() => {
    ThematicSpaceRepository.test().then(data => {setJson(data)})
  },[]); // Importante poner las dependencias en el array ese a vacío y se actualizará todo el rato, me ha tperato el mongodb

  return (
      //{...{profilePhoto:profileImage}}
    <div className="App">

        <MainHeader profilePhoto={profileImage}/>
        <Main/>

    </div>
  );
}

export default App;
