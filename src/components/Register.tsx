import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useContext, useEffect, useReducer, useState } from "react";
import { AuthRepository } from "../repositories/AuthRepository";
import FormError from "./reusable/FormError";
import Link from "./reusable/Link";

import {RouterContext} from "../views/router";

const formReducer = (state: any, action: any) => {
    let newState;
    switch (action.type) {
        case "HANDLE-INPUT-TEXT": 
            newState = {
                ...state,
                [action.field]: action.payload
            }
            return newState;
        case "TOGGLE-CONSENT":
            newState = {
                ...state,
                hasConsented: !state.hasConsented,
            }
            return newState;
        default:

            return state;
    }
};

const initialFormState = {
    "nombre": "",
    "apellidos": "",
    "nickname": "",
    "email": "",
    "password": "",
    "hasConsented": false
};

const Register: React.FC = () => {
    const setView = useContext(RouterContext);
    const [formState, dispatch] = useReducer(formReducer, initialFormState);
    const [submitEvent, setSubmitEvent] = useState<React.FormEvent<HTMLFormElement> | null>(null);
    const [errors, setErrors] = useState<{[error: string]: string}>({});

    const handleTextChange = (e: any) => {
        dispatch({
            type: "HANDLE-INPUT-TEXT",
            field: e.target.name,
            payload: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();             // Bloqueo el comportamiento por defecto del submit
        setSubmitEvent(e);
    };

    useEffect(() => {
        if (submitEvent != null) {
            AuthRepository.register(formState.nombre, formState.apellidos, formState.nickname, 
                                    formState.email, formState.password, formState.hasConsented)
            .then(data =>{
                if (data.error){
                    setErrors(current => {
                        current["incorrectRegister"] = data.error === undefined ? "Ha ocurrido un error": data.error;
                        const next: {[error: string]: string} = {};
                        Object.assign(next, current); // Hay que crear un objeto nuevo para que cambie la referencia del objeto y react detecte el cambio y vuelva a renderizar.
                        return next
                    })
                }
                else
                    setView("/login");
            });
    };
    },[submitEvent]);

    return (
        <div className="full flex-row">
            <div className="landing-left-side halfable flex-col-center">
                <span className="gallery-box"> GalleryBox</span>
                <p className="explicative-text halfable">Organiza tus colecciones y colabora con otros usuarios con nuestro software de gestión.</p>
            </div>
            <div className="Login halfable flex-col-center">
                <form className="flex-col full" onSubmit={e => handleSubmit(e)}>
                    <TextField type="text" value={formState.nombre} onChange={e => handleTextChange(e)} 
                               placeholder="nombre" name="nombre"
                               variant="standard" margin="normal"/>
                    <TextField type="text" value={formState.apellidos} onChange={e => handleTextChange(e)} 
                               placeholder="apellidos" name="apellidos"
                               variant="standard" margin="normal"/>
                    <TextField type="text" value={formState.nickname} onChange={e => handleTextChange(e)} 
                               placeholder="nickname" name="nickname"
                               variant="standard" margin="normal"/>
                    <TextField type="text" value={formState.email} onChange={e => handleTextChange(e)} 
                               placeholder="email" name="email"
                               variant="standard" margin="normal"/>
                    <TextField type="text" value={formState.password} onChange={e => handleTextChange(e)} 
                               placeholder="password" name="password"
                               variant="standard" margin="normal"/>
                    <FormControlLabel
                        value={formState.hasConsented}
                        label="Acepto los términos y condiciones"
                        name="hasConsented"
                        control={
                            <Checkbox   value={formState.hasConsented}
                                        name="hasConsented"
                                        checked={formState.hasConsented}
                                        onChange={ e => dispatch({ type: "TOGGLE-CONSENT" } )}/>
                                }
                        />
                    
                 

                    <Button type="submit" variant="contained" color="primary"> Crear cuenta </Button>
                
                    <FormError message={errors["incorrectRegister"]}/>
                </form>
                <Link text="Consulta los términos y condiciones de GalleryBox" onClickAction={()=>setView("/terms-and-conditions")}/>
                <Link text="¿Ya tiene cuenta? Inicie sesión" onClickAction={()=>setView("/login")}/>
            </div>
        </div>
    );
}

export default Register;