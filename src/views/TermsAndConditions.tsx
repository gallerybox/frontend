import React, {ReactElement, useState, useEffect, useContext} from 'react';
import {AuthRepository} from "../repositories/AuthRepository";
import {TokenContext, UserContext} from "../Auth";
import {RouterContext} from "./router";
import Link from '../components/reusable/Link';


const TermsAndConditions: React.FC = function (){
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

    return (
        <div className="full flex-row">
            <div className="landing-left-side halfable flex-col-center">
                <span className="gallery-box">GalleryBox</span>
                <p className="explicative-text halfable">Términos y condiciones.</p>
            </div>
            <div className="Login halfable flex-col-center">
            <div className="flex-col full">
            <div className='full-margin'>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text 
                    ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not 
                    only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with 
                    the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker 
                    including versions of Lorem Ipsum.
                </p>
            <p>
                Why do we use it?
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
                The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', 
                making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, 
                and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by 
                accident, sometimes on purpose (injected humour and the like).
            </p>

            </div>
               </div>
                <Link text="¿Aún no tienes cuenta en GalleryBox? ¡Registrate!" onClickAction={()=>setView("/register")}/>
            </div>
        </div>

    );
}

export default TermsAndConditions;