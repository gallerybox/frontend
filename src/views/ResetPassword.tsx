import React, {ReactElement, useState, useEffect, useContext} from 'react';
import {AuthRepository} from "../repositories/AuthRepository";
import {TokenContext, UserContext} from "../Auth";
import {RouterContext} from "./router";
import Link from '../components/reusable/Link';
import { Button, TextField } from '@mui/material';
import { useJwt } from "react-jwt";
import { UserRepository } from "../repositories/UserRepository";
import FormError from '../components/reusable/FormError';

interface ResetProps {
    resetToken: string;
}

export interface ITokenPayload {
    id: string
    nickname: string
}

const ResetPassword: React.FC<ResetProps> = function ({resetToken}: ResetProps){
    const setView = useContext(RouterContext);
    const [submitEvent, setSubmitEvent] = useState<React.FormEvent<HTMLFormElement> | null>(null);
    const [password, setPassword] = useState("");
    const { decodedToken } = useJwt(resetToken);
    const [errors, setErrors] = useState<{[error: string]: string}>({});
    const [success, setSuccess] = useState(false);

    useEffect(()=>{
        AuthRepository.validateToken(resetToken)
            .then((data: any) => {
                if (data.statusCode === (418 | 400))
                    setView('/login')
            }).catch(error => {
                console.log(error)
            });
    }
    ,[])
    
    // Submit
    useEffect(() => {
        if (submitEvent !== null) {  
            console.log((decodedToken as ITokenPayload).id);
            if (password.length !== 0) {
                AuthRepository.resetPassword(
                    (decodedToken as ITokenPayload).id,
                    resetToken, 
                    password
                ).then((data: any) => {
                    data.statusCode === (400) 
                        ? alert("El token no es valido")
                        : setSuccess(true)
                });
            } else {
                setErrors(current => {
                    current["incorrectPassword"] = "La contraseña no puede ser vacía.";
                    const next: {[error: string]: string} = {};
                    Object.assign(next, current); 
                    return next
                });
            }
        };

    },[submitEvent]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitEvent(e);
    };


    return (
        <div className="full flex-row">
            <div className="landing-left-side halfable flex-col-center">
                <span className="gallery-box">GalleryBox</span>
                <p className="explicative-text halfable">Recuperación de contraseña</p>
            </div>
            
            <div className="Login halfable flex-col-center">
                <p className={success ? "invisible": ""}>
                    Por favor, introduzca la nueva contraseña:
                </p>
                <form className={success ? "invisible":"flex-col full"} onSubmit={e => handleSubmit(e)}>

                    <TextField  type="password" id="password" name="password" label="Password"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                margin="normal" variant='standard'/>
                    <FormError message={errors["incorrectPassword"]}/>
                    <Button type="submit" variant="contained" color="primary"> Enviar </Button>
                </form>
                <div className={success ? "":"invisible"}>
                    La contraseña se ha cambiado satisfactoriamente. Vuelva a <Link text="Iniciar sesión" onClickAction={()=>setView("/login")}/>.  
                </div>
            </div>
        </div>

    );
}

export default ResetPassword;