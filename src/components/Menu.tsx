import React, {useState, useEffect, useContext} from 'react';
import profilePhoto from '../assets/ft.jpg'
import {RouterContext} from "../views/router";
import {TokenContext, UserContext} from "../Auth";
import {HomeSharp, PowerSettingsNewSharp, AutoAwesomeMotionSharp} from '@mui/icons-material'
import {UserDTO, UserRepository} from "../repositories/UserRepository";
import {Response} from "../repositories/ValueObjects";

interface MenuProps {
    isVisible: boolean;
}

function Menu({isVisible}: MenuProps){
    const setView = useContext(RouterContext);
    const [token, setToken] = useContext(TokenContext)
    const [user, setUser] = useContext(UserContext);
    const [loggedUser, setLoggedUser] = useState<Response<UserDTO>>({});
    const [followers, setFollowers] = useState<Response<Array<UserDTO>>>([]);
    const [followedUsers, setFollowedUsers] = useState<Response<Array<UserDTO>>| undefined>([]);
    UserRepository.token.value = token;
    useEffect(() => {
        UserRepository.getUser(user)
            .then(data => {
                    setLoggedUser(data);
                    console.log("Followed")
                    console.log(data.followedUsers)
                    setFollowedUsers(data!.followedUsers);
                }
            )
    },[]);
    useEffect(() => {
        UserRepository.getUsersByFollowedUserId(user)
            .then(data => {
                    setFollowers(data);
                }
            )
    },[]);

    return (

        <div className={isVisible ? 'Menu active-color' : 'Menu invisible'} >
            <div className="menu-column">
                <div className="full flex-col">
                    <div className="photo-container">
                        <div className="profile-photo" style={{backgroundImage: `url(${profilePhoto})`}}></div>
                    </div>
                    <div className="flex-col-start">
                        <span className="bold clickable full-margin" onClick={()=>setView("users",{users:followers})}>{followers?.length}&nbsp;&nbsp;seguidor{followers?.length==1?"":"es"}</span>
                        <span className="bold clickable full-margin" onClick={()=>setView("users",{users:followedUsers})}>{followedUsers?.length}&nbsp;&nbsp;seguido{followedUsers?.length==1?"":"es"}</span>
                    </div>
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