import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import ft from './assets/ft.jpg'

import './App.css';
import {ThematicSpaceRepository} from "./repositories/ThematicSpaceRepository";
import Hamburger from 'hamburger-react'


interface JavascripterProps {
  [key: string]: any;
}

const App: React.FC<JavascripterProps>=  ({subject}) => {
  const [json, setJson] = useState({});
  const [isOpen, setOpen] = useState(false)
  const [profileImage, setProfileImage] = useState(ft)
  useEffect(() => {
    ThematicSpaceRepository.test().then(data => {setJson(data)})
  },[]); // Importante poner las dependencias en el array ese a vacío y se actualizará todo el rato, me ha tperato el mongodb

  return (
      <div className="App">
        <Hamburger size={80} toggled={isOpen} toggle={setOpen} />
        <header className="App-header">
          <img src={ft} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
            {JSON.stringify(json)}
            {subject}
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
  );
}

export default App;