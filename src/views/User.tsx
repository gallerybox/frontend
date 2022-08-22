import React, {useState, useEffect, useContext} from 'react';
import {TokenContext, UserContext} from "../Auth";
import {UserDTO, UserRepository} from "../repositories/UserRepository";
import {Response} from "../repositories/ValueObjects";
import profilePhoto from "../assets/avatar-default.png";
import {Button} from "@mui/material";
import Link from "../components/reusable/Link";
import {RouterContext} from "./router";
import OverlayYesNoDeleteUser from "../components/reusable/popups/OverlayYesNoDeleteUser";
import OverlaySendPersonalInformationUser from "../components/reusable/popups/OverlaySendPersonaInformationUser";
import OverlayQRCodeProfileUser from "../components/reusable/popups/OverlayQRCodeProfileUser";

interface UserProps {
    userId: string;
}

const User: React.FC<UserProps>= function ({userId}: UserProps){
    const setView = useContext(RouterContext);
    const [token, setToken] = useContext(TokenContext);
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    const [user, setUser] = useState<Response<UserDTO>>({followedUsers:[], ownedThematicSpaces:[]});
    // Popups
    const [overlayDeleteUserView, setOverlayDeleteUserView] = useState<{component: React.FC}>({component: ()=><OverlayYesNoDeleteUser  isInvisible={true} continueCallback={()=>0}/>});
    const [overlaySendPersonalInformationUserView, setOverlaySendPersonalInformationUserView] = useState<{component: React.FC}>({component: ()=><OverlaySendPersonalInformationUser  isInvisible={true} continueCallback={()=>0}/>});
    const [overlayQRCodeProfileView, setOverlayQRCodeProfileView] = useState<{component: React.FC}>({component: ()=><OverlayQRCodeProfileUser  isInvisible={true} continueCallback={()=>0}/>});
    
    const handleSendPersonalData = () => {
        UserRepository.sendPersonalDataToEmail(user._id as string)
            .then(data => {
                if(data.statusCode !== 200){
                    console.error(data)
                }
            });
    }

    const handleDeleteUser = () => {
        UserRepository.deleteUser(user._id as string)
            .then(data => {
                if(data.statusCode === 200){
                    setToken(false);
                    localStorage.removeItem("token");
                    setView("/login")
                }
            });
    }

    const handleShowQR = () => {

    }

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

    const OverlayDeleteUserView: React.FC = overlayDeleteUserView.component;
    const OverlaySendPersonalInformationUserView: React.FC = overlaySendPersonalInformationUserView.component;
    const OverlayQRCodeProfileUserView: React.FC = overlayQRCodeProfileView.component;

    return (
        <div className="User flex-col full">
            <OverlayDeleteUserView/>
            <OverlaySendPersonalInformationUserView/>
            <OverlayQRCodeProfileUserView/>

            <div className="card flex-col halfable-margin">

                <div className="flex-row full flex-row-space">
                    <div className="flex-text-row">
                        <div className="photo-container2 margin">
                            <div className="profile-photo" style={{backgroundImage: `url(${user.profilePhoto?user.profilePhoto:profilePhoto})`}}></div>
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
                        <span>{user.biography}</span>
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
                                <Button variant="contained" color="primary" onClick={()=>setView("/edit-personal-information", {userId:user._id})}> Editar información </Button>
                            </div>
                            <div className="margin">
                                <Button variant="contained" color="primary" 
                                onClick={
                                    ()=>
                                    setOverlaySendPersonalInformationUserView({
                                        component: ()=>
                                            <OverlaySendPersonalInformationUser 
                                                continueCallback={()=>handleSendPersonalData()}/>
                                    })
                                }> Descargar tu información </Button>
                            </div>
                        </div>
                        <div className="flex-col halfable">
                            <div className="margin">
                                <Button variant="contained" color="primary" 
                                onClick={
                                    ()=>
                                    setOverlayDeleteUserView({
                                        component: ()=>
                                            <OverlayQRCodeProfileUser
                                                continueCallback={()=>handleShowQR()}/>
                                    })
                                }> Compartir perfil </Button>
                            </div>
    
                            <div className={loggedUser==user._id?"margin":"invisible"}>
                                <Button variant="contained" color="primary" 
                                onClick={
                                    ()=>
                                    setOverlayDeleteUserView({
                                        component: ()=>
                                            <OverlayYesNoDeleteUser 
                                                continueCallback={()=>handleDeleteUser()}/>
                                    })
                                }>
                                 Eliminar perfil </Button>
                            </div>
                        </div>
                    </div>


            </div>
        </div>


    );
}

export default User;