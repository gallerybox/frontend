import React, {useState} from 'react';
import {Button} from "@mui/material";

export interface OverlaySendPersonalInformationProps{
    continueCallback: Function;
    isInvisible?: boolean;

}

const OverlaySendPersonalInformationUser: React.FC<OverlaySendPersonalInformationProps> = ({continueCallback, isInvisible=false}: OverlaySendPersonalInformationProps)=>{
    const [invisible, setInvisible] = useState(isInvisible)

    return (

        <div className={invisible?"invisible":"overlay"}>
            <div className="card halfable-margin overlay-content" style={{zIndex: 6, position: "absolute",color: "black"}}>
                <div className="flex-col full-margin">
                <span className="full-margin">
                    <p>Se ha enviado por correo toda su información personal que GalleryBox tiene de usted. Contiene <b>Información personal</b>, <b>espacios temáticos</b> y <b>colecciones</b> creadas por usted.</p>
                </span>
                </div>
                <div className="flex-col full-margin">
                    <div className="flex-text-row">
                        <div className="margin-row">
                            <Button type="submit" variant="contained" color="primary"
                                    onClick={()=>{
                                        setInvisible(true);
                                        continueCallback();}}> Aceptar </Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default OverlaySendPersonalInformationUser;