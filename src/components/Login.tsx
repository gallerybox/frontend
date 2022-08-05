import React, {ReactElement, useState, useEffect, useContext} from 'react';
import {AuthRepository} from "../repositories/AuthRepository";
import {CollectibleRepository} from "../repositories/CollectibleRepository";
import {UserContext} from "../Auth";
import FormError from "./reusable/FormError";
import Link from "./reusable/Link";
import {Button} from '@material-ui/core';


const Login: React.FC = function (){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitEvent, setSubmitEvent] = useState<React.FormEvent<HTMLFormElement> | null>(null);
    const [token, setToken] = useContext(UserContext);
    const [errors, setErrors] = useState< {[error: string]: string}>({});


    const handleSubmit= (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitEvent(e);

    };

    // Submit
    useEffect(() => {
        if (submitEvent != null) {
            console.log("logiiiiiin")
            AuthRepository.login(email, password).then(data =>{
                    // Aquí habría que poner algún mecanismo de control... más escalable, lo del dicc no está mal, pero alguna funciocita o algo, y validators con lista de valores, etc, antes de enviar el form y eso.
                    if (!data.access_token){
                        setErrors(current => {
                            current["incorrectEmailPassword"] = "Email o contraseña incorrectos.";
                            const next: {[error: string]: string} = {};
                            Object.assign(next, current); // Hay que crear un objeto nuevo para que cambie la referencia del objeto y react detecte el cambio y vuelva a renderizar.
                            return next
                        })
                    }else {
                        setToken(data.access_token);
                    }
                }
            );
        };

    },[submitEvent]);

    // Show errors
    useEffect(() => {

    },[errors])
    return (
        <div className="full flex-row">
            <div className="landing-left-side halfable flex-col">
                <span className="gallery-box">GalleryBox</span>
                <p className="explicative-text full-margin">Organiza tu colecciones y colabora con otro usuarios con nuestro software de gestión.</p>
            </div>
            <div className="Login halfable flex-col">
                <form className="flex-col full" onSubmit={e => handleSubmit(e)}>
                    <input placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} type="text" name="email" />
                    <input placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" />
                    <input className="mdc-button" type="submit" value="Iniciar sesión" />
                    <Button variant="contained"> Press me </Button>
                    <FormError message={errors["incorrectEmailPassword"]}/>
                </form>

                <Link text="¿Olvidaste tu contraseña?" onClickAction={()=>alert("olvido contraseña")}/>

                <Link text="¿Aún no tienes cuenta en GalleryBox? ¡Registrate!" onClickAction={()=>alert("Registro")}/>
            </div>
        </div>

    );
}

export default Login;