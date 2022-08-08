import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { AuthRepository } from "../repositories/AuthRepository";
import FormError from "./reusable/FormError";
import Link from "./reusable/Link";

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
            console.log(state)
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
    /* Descripción de las variables
     * formState: estado actual del formulario
     * dispatch: trigger. Se lanza cuando hay un evento. Envía la acción a realizar
     *           al formReducer.
     



export function register(email: any, password: any) {
    throw new Error("Function not implemented.");
}
export function register(email: any, password: any) {
        throw new Error("Function not implemented.");
    }
* formReducer: contiene todas las acciones disponibles. Cada una de ellas actualiza
     *           el formState.
     **/  
    const [formState, dispatch] = useReducer(formReducer, initialFormState);
    const [submitEvent, setSubmitEvent] = useState<React.FormEvent<HTMLFormElement> | null>(null);

    // Si alguno de los texto cambia...
    const handleTextChange = (e: any) => {
        // Enviamos la acción "HANDLE-INPUT-TEXT" al formReducer
        console.log("Entra")
        
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
        AuthRepository.register(formState.nombre, formState.apellidos, formState.nickname, 
                                formState.email, formState.password, formState.hasConsented)
        .then(data =>{
            console.log(data);
        }
    );
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
                    
                 
                    <Link text="Consulta los términos y condiciones de GalleryBox" onClickAction={()=>alert("TODO: Redirección a Términos y condiciones")}/>

                    <Button type="submit" variant="contained" color="primary"> Crear cuenta </Button>
                
                </form>
                <Link text="¿Ya tiene cuenta? Inicie sesión" onClickAction={()=>alert("TODO: Redirección a Login")}/>
            </div>
        </div>
    );
}

export default Register;