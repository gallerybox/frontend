import React, {useState, useEffect, useContext} from 'react';
import profilePhoto from '../assets/ft.jpg'
import {RouterContext} from "../views/router";
import {TokenContext, UserContext} from "../Auth";
import {HomeSharp, PowerSettingsNewSharp, AutoAwesomeMotionSharp} from '@mui/icons-material'

interface MenuProps {
    isVisible: boolean;
}

function Menu({isVisible}: MenuProps){
    const setView = useContext(RouterContext);
    const [token, setToken] = useContext(TokenContext)
    return (

        <div className={isVisible ? 'Menu active-color' : 'Menu invisible'} >
            <div className="menu-column">
                <div className="photo-container">
                    <div className="profile-photo" style={{backgroundImage: `url(${profilePhoto})`}}></div>
                </div>
                <div className="item">
                    <div className="full flex-text-row">
                        <HomeSharp/>
                        <span>
                            Espacios
                        </span>
                    </div>

                    <div className="item">
                        <div className="item clickable" onClick={()=>setView("spaces")}><span>Propios</span></div>
                        <div className="item clickable" onClick={()=>setView("spaces")}><span>De otros usuarios</span></div>
                    </div>
                </div>
                <div className="item clickable" onClick={()=>setView("collections")}>
                    <div className="full flex-text-row">
                        <AutoAwesomeMotionSharp/>
                        <span>Colecciones</span>
                    </div>
                </div>
                <div className="item clickable" onClick={()=>{
                                                        setToken(false);
                                                        localStorage.removeItem("token");

                                                        }}>
                    <div className="full flex-text-row">
                        <PowerSettingsNewSharp/>
                        <span>Cerrar sesión</span>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default Menu;