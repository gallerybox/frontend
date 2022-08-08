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
                            &nbsp;Espacios
                        </span>
                    </div>

                    <div className="item">
                        <div className="item clickable" onClick={()=>setView("spacesOwned")}><span>&nbsp;Propios</span></div>
                        <div className="item clickable" onClick={()=>setView("spacesFollowed")}><span>&nbsp;De otros usuarios</span></div>
                    </div>
                </div>
                <div className="item clickable" onClick={()=>setView("collections")}>
                    <div className="full flex-text-row">
                        <AutoAwesomeMotionSharp/>
                        <span>&nbsp;Colecciones</span>
                    </div>
                </div>
                <div className="item clickable" onClick={()=>{
                                                        setToken(false);
                                                        localStorage.removeItem("token");

                                                        }}>
                    <div className="full flex-text-row">
                        <PowerSettingsNewSharp/>
                        <span>&nbsp;Cerrar sesión</span>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default Menu;