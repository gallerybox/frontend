import React, {ReactElement, useState, useEffect, useContext} from 'react';
import {AuthRepository} from "../repositories/AuthRepository";
import {CollectibleRepository} from "../repositories/CollectibleRepository";
import {UserContext} from "../Auth";
import FormError from "./reusable/FormError";


function Login(){
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
        <div className="flex-row full">
            <div className="halfable">

            </div>
            <div className="Login halfable">
                <form className="flex-col full" onSubmit={e => handleSubmit(e)}>
                    <label className="flex-row full">
                        email:
                        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" name="email" />
                    </label>
                    <label className="flex-row full">
                        password:
                        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" />
                    </label>
                    <input type="submit" value="Submit" />
                    <FormError message={errors["incorrectEmailPassword"]}/>
                </form>
            </div>
        </div>

    );
}

export default Login;