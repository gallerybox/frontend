import React, {useState, useEffect, useContext, useCallback} from 'react';
import menuIcon from "../assets/bars-solid.svg"
import profilePhoto from "../assets/ft.jpg";
import {RouterContext} from "../views/router";
interface MainHeaderProps {
    buttonActive: boolean;
    onActivate: React.MouseEventHandler<any>;
}

function MainHeader({buttonActive, onActivate}: MainHeaderProps){
    let setView = useContext(RouterContext);
    return (
        <header className="MainHeader">
            <div className="Menu">
                <div className={buttonActive ? 'menu-button active-color clickable' : 'menu-button clickable'} onClick={onActivate}>
                        <div className="icon" style={{backgroundImage: `url(${menuIcon})`}}></div>
                </div>
            </div>
            <span className="gallery-box clickable" onClick={()=>setView("/main-view-timeline")}>GalleryBox</span>
        </header>
    );

}

export default MainHeader;