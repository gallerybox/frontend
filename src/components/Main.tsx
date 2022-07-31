import React, {useState, useEffect, ReactElement} from 'react';
import Menu from "./Menu";
import Content from "./Content";
interface MainProps {
    menuIsVisible: boolean
}

function Main({menuIsVisible}: MainProps){
    return (
        <div className="Main">
            <Menu isVisible={menuIsVisible}/>
            <Content/>
        </div>
    );
}

export default Main;