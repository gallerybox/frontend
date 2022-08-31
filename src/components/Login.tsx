import React, {ReactElement, useState, useEffect, useContext} from 'react';
import {AuthRepository} from "../repositories/AuthRepository";
import {CollectibleRepository} from "../repositories/CollectibleRepository";
import {TokenContext, UserContext} from "../Auth";
import FormError from "./reusable/FormError";
import Link from "./reusable/Link";
import {Button, TextField} from '@mui/material';
import {RouterContext} from "../views/router";


const Login: React.FC = function (){
    const setView = useContext(RouterContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitEvent, setSubmitEvent] = useState<React.FormEvent<HTMLFormElement> | null>(null);
    const [user, setUser] = useContext(UserContext);
    const [token, setToken] = useContext(TokenContext);
    const [errors, setErrors] = useState<{[error: string]: string}>({});


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitEvent(e);
    };

    // Submit
    useEffect(() => {
        if (submitEvent != null) {
            AuthRepository.login(email, password).then(data =>{
                    if (!data.access_token){
                        setErrors(current => {
                            current["incorrectEmailPassword"] = "Email o contraseña incorrectos.";
                            const next: {[error: string]: string} = {};
                            Object.assign(next, current); // Hay que crear un objeto nuevo para que cambie la referencia del objeto y react detecte el cambio y vuelva a renderizar.
                            return next;
                        })
                    }else{
                        setToken(data.access_token);
                        setUser(data.user!._id);
                        setView("/main-view-timeline");
                    }
                }
            );
        };

    },[submitEvent]);

    return (
        <div className="full flex-row">
            <div className="landing-left-side halfable flex-col-center">
                <span className="gallery-box">GalleryBox</span>
                <p className="explicative-text halfable">Organiza tus colecciones y colabora con otros usuarios con nuestro software de gestión.</p>
            </div>
            <div className="Login halfable flex-col-center">
                <form className="flex-col full" onSubmit={e => handleSubmit(e)}>
                    <TextField placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email"
                               variant="standard" margin="normal"/>
                    <TextField placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password"
                               variant="standard" margin="normal"/>
                    <br/>
                    <Button type="submit" variant="contained" color="primary"> Iniciar sesión </Button>
                    <FormError message={errors["incorrectEmailPassword"]}/>
                </form>
                <br/>
                <Link text="¿Olvidaste tu contraseña?" onClickAction={()=>setView("/forgot-password")}/>
                <Link text="¿Aún no tienes cuenta en GalleryBox? ¡Registrate!" onClickAction={()=>setView("/register")}/>
                <br/>
                <Link text="Términos y condiciones" onClickAction={()=>setView("/terms-and-conditions")}/>
            </div>
        </div>

    );
}

export default Login;