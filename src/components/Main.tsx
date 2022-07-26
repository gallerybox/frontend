import React, {useState, useEffect} from 'react';
import Menu from "./Menu";
import Content from "./Content";

interface MainHeaderProps {
    profilePhoto: string
}

function Main(){

    return (
        <div className="Main">
            <Menu/>
            <Content/>
        </div>
    );
}

export default Main;