import React, {ReactElement, useState, useEffect, useContext} from 'react';
import {AuthRepository} from "../repositories/AuthRepository";
import {TokenContext, UserContext} from "../Auth";
import {RouterContext} from "./router";
import Link from '../components/reusable/Link';
import { Button, TextField } from '@mui/material';
import FormError from '../components/reusable/FormError';


const ForgotPassword: React.FC = function (){
    const setView = useContext(RouterContext);
    const [user, setUser] = useContext(UserContext);
    const [token, setToken] = useContext(TokenContext);

    const [submitEvent, setSubmitEvent] = useState<React.FormEvent<HTMLFormElement> | null>(null);
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<{[error: string]: string}>({});
    const [ success, setSuccess ] = useState(false);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitEvent(e);
    };

    // Submit
    useEffect(() => {
        if (submitEvent != null) {
            AuthRepository.forgotPassword(email)
                .then((data: any) => {
                    if (data?.statusCode === 400 && data?.message === "INVALID_EMAIL" ) 
                        setErrors(current => {
                            current["incorrectEmail"] = "El email introducido no existe.";
                            const next: {[error: string]: string} = {};
                            Object.assign(next, current); 
                            return next
                        });
                    else 
                        setSuccess(true)
                }
            );
        };

    },[submitEvent]);

    return (
        <div className="full flex-row">
            <div className="landing-left-side halfable flex-col-center">
                <span className="gallery-box">GalleryBox</span>
                <p className="explicative-text halfable">Recuperación de contraseña</p>
            </div>
            
            <div className="Login halfable flex-col-center">
                <p className={success ? "invisible":""}>
                    Por favor, introduzca el email:
                </p>
                <form className={success ? "invisible":"flex-col full"} onSubmit={e => handleSubmit(e)}>

                    <TextField  type="email" id="email" name="email" label="Email"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                margin="normal" variant='standard'/>
                    <FormError message={errors["incorrectEmail"]}/> 
                    <Button type="submit" variant="contained" color="primary"> Enviar </Button>
                </form>

                <Link className={success ? "invisible":""} text="¿Aún no tienes cuenta en GalleryBox? ¡Registrate!" onClickAction={()=>setView("/register")}/>

                <div className={success ? "":"invisible"}>
                    Se ha mandado un enviado a su correo. Reviselo para resetear la contraseña.
                </div>
            </div>
        </div>

    );
}

export default ForgotPassword;