import React, {useState, useEffect, useContext} from 'react';
import {TokenContext, UserContext} from "../Auth";
import {CollectionDTO, UserDTO, UserRepository} from "../repositories/UserRepository";
import CollectionCard from "../components/reusable/CollectionCard";
import {ThematicSpaceDTO} from "../repositories/ThematicSpaceRepository";
import SpaceCard from "../components/reusable/SpaceCard";
import {Response} from "../repositories/ValueObjects";
import MiniCollectibleCard from "../components/reusable/MiniCollectibleCard";
import MiniUserCard from "../components/reusable/MiniUserCard";
import profilePhoto from "../assets/avatar-default.png";
import {Button} from "@mui/material";

interface UserProps {
    userId: string;
}


const User: React.FC<UserProps>= function ({userId}: UserProps){
    const [token, setToken] = useContext(TokenContext);
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    const [user, setUser] = useState<Response<UserDTO>>({});

    UserRepository.token.value = token;
    useEffect(()=>{
        console.log(userId);
        UserRepository.getUser(userId).then(data=>{
            setUser(data);
        }
        )
        },[])
    return (
        <div className="User flex-col halfable-margin">
            <div className="flex-text-row full flex-row-space">
                <div className="flex-text-row">
                    <div className="photo-container2 margin">
                        <div className="profile-photo" style={{backgroundImage: `url(${user.profileImage?user.profileImage:profilePhoto})`}}></div>
                    </div>
                    <div className="flex-col margin">
                        <header className="flex-row full-margin bold big-font">
                            <div className="flex-text-row">
                                <span className="bold">{user.nickname}</span>
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
                    <Button variant="contained" color="primary" onClick={()=>alert("sdfs")}>
                        sdfsdfsdf
                    </Button>
                </div>
            </div>


        </div>

    );
}

export default User;