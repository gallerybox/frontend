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
import Link from "../components/reusable/Link";
import {RouterContext} from "./router";

interface UserProps {
    userId: string;
}


const User: React.FC<UserProps>= function ({userId}: UserProps){
    const setView = useContext(RouterContext);
    const [token, setToken] = useContext(TokenContext);
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    const [user, setUser] = useState<Response<UserDTO>>({followedUsers:[], ownedThematicSpaces:[]});
    const [followers, setFollowers] = useState<Response<Array<UserDTO>>| undefined>([]);
    UserRepository.token.value = token;
    useEffect(()=>{
        console.log(userId);
        UserRepository.getUser(userId).then(data=>{
            setUser(data);
            console.log(data);
            UserRepository.getUsersByFollowedUserId(data._id!)
                .then(data => {
                        setFollowers(data);
                    }
                )
        }
        )
        },[])
    useEffect(() => {

    },[]);
    return (
        <div className="User flex-col full">
            <div className="card flex-col halfable-margin">

                <div className="flex-row full flex-row-space">
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
                    <div className="flex-col-center">
                        <div className="flex-col-start">
                            <span className="flex-text-row bold clickable margin" onClick={()=>setView("/users",{userId:userId, followers: true})}>Seguidores {followers!.length}</span>
                            <span className="flex-text-row bold clickable margin" onClick={()=>setView("/users",{userId:userId})}>Seguidos {user.followedUsers!.length}</span>
                        </div>
                    </div>
                </div>
                <div className="flex-row flex-row-space full-margin">
                    <div className="flex-text-row ">
                        <span>{user.bio}</span>
                    </div>

                </div>
                <div className="flex-col-start full">
                    <div className="flex-row flex-row-space">
                        <div className="flex-col-start margin-row full-mobile">
                            <span className="bold margin">Espacios propios</span>
                            {user.ownedThematicSpaces?.map(space=>
                                <Link className="margin" text={space.name} onClickAction={()=>alert(space.name)}/>)}

                        </div>
                        <div className="flex-col-start margin-row full-mobile">
                            <span className="bold margin">Colaboraciones</span>
                            <Link className="margin"  text="Ver espacios" onClickAction={()=>alert("Ver espacios")}/>
                        </div>
                    </div>
                    <div className="flex-row flex-row-space full">
                        <div className="flex-col-start margin-row full-mobile">
                            <span className="bold margin">Colecciones</span>
                            <Link className="margin"  text="Ver colecciones" onClickAction={()=>alert("Ver colecciones")}/>
                        </div>
                    </div>
                </div>

                    <div className="flex-row flex-row-space full">
                        <div className={loggedUser==user._id?"flex-col halfable":"invisible"}>
                            <div className="margin">
                                <Button  type="submit" variant="contained" color="primary" onClick={()=>alert("Editar perfil")}> Editar información </Button>
                            </div>
                            <div className="margin">
                                <Button type="submit" variant="contained" color="primary" onClick={()=>alert("Editar perfil")}> Descargar tu información </Button>
                            </div>
                        </div>
                        <div className="flex-col halfable">
                            <div className="margin">
                                <Button type="submit" variant="contained" color="primary" onClick={()=>alert("Editar perfil")}> Compartir perfil </Button>
                            </div>
                            <div className={loggedUser==user._id?"margin":"invisible"}>
                                <Button type="submit" variant="contained" color="primary" onClick={()=>alert("Editar perfil")}> Eliminar perfil </Button>
                            </div>
                        </div>
                    </div>


            </div>
        </div>

    );
}

export default User;