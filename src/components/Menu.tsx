import React, {useState, useEffect, useContext} from 'react';
import profilePhoto from '../assets/avatar-default.png'
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
        if (user) {
            UserRepository.getUser(user)
                .then(data => {
                        setLoggedUser(data);
                        setFollowedUsers(data!.followedUsers);
                        UserRepository.getUsersByFollowedUserId(user)
                            .then(data => {
                                    setFollowers(data);
                                }
                            )
                    }
                )
        }
    },[user]);

    return (
        <>
            <div className={isVisible && token? 'Menu active-color' : 'Menu invisible'} >
                <div className="menu-column">
                    <div className="full flex-col">
                        <div className="photo-container clickable" onClick={()=>setView("/user",{userId:user})}>
                            <div className="profile-photo" style={{backgroundImage: `url(${loggedUser.profilePhoto?loggedUser.profilePhoto:profilePhoto})`}}></div>
                        </div>
                        <div className="flex-col-start">
                            <span className="bold clickable full-margin" onClick={()=>setView("/users",{userId:user, followers: true})}>{followers?.length}&nbsp;&nbsp;seguidor{followers?.length==1?"":"es"}</span>
                            <span className="bold clickable full-margin" onClick={()=>setView("/users",{userId:user})}>{followedUsers?.length}&nbsp;&nbsp;seguido{followedUsers?.length==1?"":"s"}</span>
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
                            <div className="item clickable" onClick={()=>setView("/spaces-owned")}><span>&nbsp;Propios</span></div>
                            <div className="item clickable" onClick={()=>setView("/spaces-followed")}><span>&nbsp;Colabora</span></div>
                        </div>
                    </div>
                    <div className="item clickable" onClick={()=>setView("/collections",{userId: user})}>
                        <div className="full flex-text-row">
                            <AutoAwesomeMotionSharp/>
                            <span>&nbsp;Colecciones</span>
                        </div>
                    </div>
                    <div className="item clickable" onClick={()=>{
                                                            setToken(false);
                                                            localStorage.removeItem("token");
                                                            localStorage.removeItem("userId");
                                                            setView("/login")
                                                            }}>
                        <div className="full flex-text-row">
                            <PowerSettingsNewSharp/>
                            <span>&nbsp;Cerrar sesión</span>
                        </div>
                    </div>
                </div>


            </div>


            <div className={isVisible && !token? 'Menu active-color' : 'Menu invisible'} >
                <div className="menu-column">
                    <div className="item clickable" onClick={()=>{
                        setView("/login");

                    }}>
                        <div className="full flex-text-row">

                            <PowerSettingsNewSharp/>
                            <span>&nbsp;Iniciar sesión</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Menu;