import React, {useState, useEffect, ReactElement, useContext} from 'react';

import {CollectibleDTO} from "../../repositories/CollectibleRepository";
import {Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, Button} from '@mui/material';
import {MoreVert} from '@mui/icons-material'
import {DynamicAttribute, DynamicRepresentation, DynamicType, Response} from "../../repositories/ValueObjects";
import Attribute from "./attributes/Attribute";
import Link from "./Link";
import {CollectionDTO, UserDTO, UserRepository} from "../../repositories/UserRepository";
import profilePhoto from "../../assets/avatar-default.png";
import {UserContext} from "../../Auth";
import {RouterContext} from "../../views/router";
interface MiniUserCardProps{
    user: UserDTO;
}

function MiniUserCard({user}: MiniUserCardProps){
    const [userId, setUserId] = useContext(UserContext);
    const [loggedUser, setLoggedUser] = useState<Response<UserDTO>>({followedUsers:[]});
    const setView = useContext(RouterContext);
    useEffect(() => {
        UserRepository.getUser(userId)
            .then(data => {
                    console.log("Holaaaaa");
                    console.log(loggedUser);
                    setLoggedUser(data);

                }
            )
    },[]);
    return (
        <div className="MiniUserCard flex-col halfable-margin">
            <div className="flex-text-row full flex-row-space">
                <div className="flex-text-row">
                    <div className="photo-container2 margin clickable" onClick={()=>setView("/user",{userId:user._id})}>
                        <div className="profile-photo" style={{backgroundImage: `url(${user.profileImage?user.profileImage:profilePhoto})`}}></div>
                    </div>
                    <div className="flex-col margin">
                        <header className="flex-row full-margin bold big-font">
                            <div className="flex-text-row">
                                <span className="bold clickable" onClick={()=>setView("/user",{userId:user._id})}>{user.nickname}</span>
                            </div>
                        </header>

                        <footer className="flex-row full-margin">
                            <div className="flex-text-row">
                                <span>{user.nombre}&nbsp;{user.apellidos}</span>
                            </div>
                        </footer>
                    </div>
                </div>
                <div className="margin">
                    <Button variant="contained" color="primary" onClick={()=>alert(loggedUser.followedUsers!.some(f => f._id === user._id)?"Dejar de seguir": "Seguir")}>
                        {loggedUser.followedUsers!.some(f => f._id === user._id)?"Dejar de seguir": "Seguir"}
                    </Button>
                </div>
            </div>


        </div>

    );
}

export default MiniUserCard;