import { ChangeEvent, useContext, useEffect, useReducer, useRef, useState } from "react";
import {Response} from "../repositories/ValueObjects";
import { UserDTO, UserRepository } from "../repositories/UserRepository";
import profilePhoto from "../assets/avatar-default.png";
import {TokenContext, UserContext} from "../Auth";
import { Button, TextareaAutosize, TextField } from "@mui/material";
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
            console.log(JSON.stringify(action.payload))
            console.log(action.payload)
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
    const [token, setToken] = useContext(TokenContext);
    const [formState, dispatch] = useReducer(formReducer, initialForm2State);
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    const setView = useContext(RouterContext);
    const [file, setFile] = useState()
    UserRepository.token.value = token;
    // Busca el usuario de base de datos
    useEffect(()=>{
        console.log(userId);
        UserRepository.getUser(userId).then(data => {
            setUser(data);
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
                window.location.href = window.location.href;
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
                window.location.href = window.location.href;
                // setLoggedUser({
                //     ...loggedUser,
                //     profilePhoto: undefined
                // });
            }
        );
    }

    const onHandleUpdatePersonalData = (e: any) => {
        e.preventDefault();
        user.nombre = formState.nombre;
        user.apellidos = formState.apellidos;
        user.email = formState.email;
        user.biography = formState.biography;

        UserRepository.updateUser(user as UserDTO).then(
            data => {
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
                                <input type="file" name="file" accept="image/*" onChange={(e) => handleChangeAddAvatar(e)}/>
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
                                variant="standard" margin="normal"
                                inputProps={{ maxLength: 100 }}
                                />

                            </div>
                            <div className="flex-col-start margin-row full-mobile">
                                <span className="bold">Apellidos</span>
                                <TextField type="text" value={formState.apellidos} onChange={e => handleTextChange(e)} 
                                    placeholder="apellidos" name="apellidos"
                                    variant="standard" margin="normal"
                                    inputProps={{ maxLength: 100 }}
                                />

                            </div>
                        </div>
                        <div className="flex-row flex-row-space full">
                            <div className="flex-col-start margin-row full-mobile">
                                <span className="bold">Email</span>
                                <TextField type="text" value={formState.email} onChange={e => handleTextChange(e)} 
                                    placeholder="email" name="email"
                                    variant="standard" margin="normal"
                                    inputProps={{ maxLength: 100 }}
                                />

                            </div>
                        </div>
                        <div className="full.margin">
                            <div className="flex-col-start margin-row full-mobile full-margin">
                                <span className="bold">Biografía</span>
                                <TextareaAutosize
                                    placeholder="Biografía"
                                    name="biography"
                                    value={formState.biography} onChange={e => handleTextChange(e)}
                                    style={{ width: "100%"}}
                                    minRows={8}
                                    maxLength={500}
                                />
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