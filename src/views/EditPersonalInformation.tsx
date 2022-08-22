import { ChangeEvent, useContext, useEffect, useReducer, useRef, useState } from "react";
import {Response} from "../repositories/ValueObjects";
import { UserDTO, UserRepository } from "../repositories/UserRepository";
import profilePhoto from "../assets/avatar-default.png";
import { UserContext } from "../Auth";
import { Button, TextField } from "@mui/material";
import { RouterContext } from "./router";

interface UserProps {
    userId: string;
}

const formReducer = (state: any, action: any) => {
    let newState;
    switch (action.type) {
        case "INITIAL-DATA-LOAD":
            newState = {
                "nombre": action.payload.nombre,
                "apellidos": action.payload.apellidos,
                "email": action.payload.email,
                "biography": action.payload.biography
            }
            return newState;
        case "HANDLE-INPUT-TEXT": 
            newState = {
                ...state,
                [action.field]: action.payload
            }
            return newState;
        default:
            return state;
    }
};

const initialForm2State = {
    "nombre": "",
    "apellidos": "",
    "email": "",
    "biography": ""
};

const EditPersonalInformation: React.FC<UserProps> = function ({userId}: UserProps) {
    const [user, setUser] = useState<Response<UserDTO>>({followedUsers:[], ownedThematicSpaces:[]});
    const [formState, dispatch] = useReducer(formReducer, initialForm2State);
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    const setView = useContext(RouterContext);
    const [file, setFile] = useState()
    
    // Busca el usuario de base de datos
    useEffect(()=>{
        console.log(userId);
        UserRepository.getUser(userId).then(data => {
            setUser(data);
            console.log(data);
            dispatch({
                type: "INITIAL-DATA-LOAD",
                payload: data
            })
            return data    
        })

    },[]);

    const handleTextChange = (e: any) => {
        dispatch({
            type: "HANDLE-INPUT-TEXT",
            field: e.target.name,
            payload: e.target.value
        })
    }

    const initialFormState = {
        "nombre": "",
        "apellidos": "",
        "nickname": "",
        "email": "",
        "password": "",
        "hasConsented": false
    };

    const handleChangeAddAvatar = (e: any) => {
        setFile(e.target.files[0])
    }

    const onHandleAddAvatarSubmit = (e: any) => {
        e.preventDefault();
        UserRepository.addAvatar(userId, file).then(
            data => {
                setUser({
                    ...user,
                    profilePhoto: (data as any).data.profilePhoto
                })
                // setLoggedUser({
                //     ...loggedUser,
                //     profilePhoto: (data as any).data.profilePhoto
                // })
            }
        );
    }

    const onHandleDeleteAvatarSubmit = (e: any) => {
        e.preventDefault();
        UserRepository.deleteAvatar(userId).then(
            data => {
                setUser({
                    ...user,
                    profilePhoto: undefined
                });
                // setLoggedUser({
                //     ...loggedUser,
                //     profilePhoto: undefined
                // });
            }
        );
    }

    const onHandleUpdatePersonalData = (e: any) => {
        e.preventDefault();
        alert(JSON.stringify(formState))
        UserRepository.updatePersonalData(userId, formState).then(
            data => {
                alert("Entra")
                setView("/user", {userId:user._id});
            });
    }

    return (
        <div className="User flex-col full">
            <div className="card flex-col halfable-margin">
                <div className="flex-row full flex-row-space">
                    <div className="flex-text-row">
                        <div className="photo-container2 margin">
                            <div className="profile-photo" style={{backgroundImage: `url(${user.profilePhoto?user.profilePhoto:profilePhoto})`}}></div>
                        </div>
                        <div>
                            <form className={user?.profilePhoto === (undefined || null) ? "invisible": ""} onSubmit={e => onHandleDeleteAvatarSubmit(e)}>
                            <Button type="submit" variant="contained" color="primary"> Borrar foto </Button>
                            </form>
                            <br/>
                            <form onSubmit={e => onHandleAddAvatarSubmit(e)}>
                                <Button type="submit" variant="contained" color="primary"> Actualizar foto </Button>
                                <input type="file" name="file" onChange={(e) => handleChangeAddAvatar(e)}/>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="flex-col-start full">
                    <form onSubmit={e => onHandleUpdatePersonalData(e)}>
                        <div className="flex-row flex-row-space">
                            <div className="flex-col-start margin-row full-mobile">
                                <span className="bold">Nombre</span>
                                <TextField type="text" value={formState.nombre} onChange={e => handleTextChange(e)} 
                                placeholder="nombre" name="nombre"
                                variant="standard" margin="normal"/>
                            </div>
                            <div className="flex-col-start margin-row full-mobile">
                                <span className="bold">Apellidos</span>
                                <TextField type="text" value={formState.apellidos} onChange={e => handleTextChange(e)} 
                                    placeholder="apellidos" name="apellidos"
                                    variant="standard" margin="normal"/>
                            </div>
                        </div>
                        <div className="flex-row flex-row-space full">
                            <div className="flex-col-start margin-row full-mobile">
                                <span className="bold">Email</span>
                                <TextField type="text" value={formState.email} onChange={e => handleTextChange(e)} 
                                    placeholder="email" name="email"
                                    variant="standard" margin="normal"/>
                            </div>
                        </div>
                        <div className="flex-row flex-row-space full">
                            <div className="flex-col-start margin-row full-mobile">
                                <span className="bold">Biografía</span>
                                <TextField type="text" value={formState.biography} onChange={e => handleTextChange(e)} 
                                    placeholder="bio" name="biography"
                                    variant="standard" margin="normal"/>
                            </div>
                        </div>
                        <div className="flex-row flex-row-space full">
                            <Button type="submit" variant="contained" color="primary"> Guardar </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditPersonalInformation;