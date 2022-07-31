import React, {useState, useEffect, useContext} from 'react';
import profilePhoto from '../assets/ft.jpg'
import {RouterContext} from "../views/router";

interface MenuProps {
    isVisible: boolean;
}

function Menu({isVisible}: MenuProps){
    let setView = useContext(RouterContext);
    return (

        <div className={isVisible ? 'Menu active-color' : 'Menu invisible'} >
            <div className="menu-column">
                <div className="photo-container">
                    <div className="profile-photo" style={{backgroundImage: `url(${profilePhoto})`}}></div>
                </div>
                <div className="item">
                    <span>Espacios</span>
                    <div className="item">
                        <div className="item clickable" onClick={()=>setView("spaces")}><span>Propios</span></div>
                        <div className="item clickable" onClick={()=>setView("spaces")}><span>De otros usuarios</span></div>
                    </div>
                </div>
                <div className="item clickable" onClick={()=>setView("collections")}><span>Colecciones</span></div>
                <div className="item clickable" onClick={()=>setView("collections")}><span>Cerrar sesión</span></div>
            </div>

        </div>

    );
}

export default Menu;