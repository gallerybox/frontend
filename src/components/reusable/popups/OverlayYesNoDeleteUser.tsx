import React, {useState} from 'react';
import {Button} from "@mui/material";

export interface OverlayYesNoProps{
    continueCallback: Function;
    isInvisible?: boolean;

}

const OverlayYesNoDeleteUser: React.FC<OverlayYesNoProps> = ({continueCallback, isInvisible=false}: OverlayYesNoProps)=>{
    const [invisible, setInvisible] = useState(isInvisible)

    return (

        <div className={invisible?"invisible":"overlay"}>
            <div className="card halfable-margin overlay-content" style={{zIndex: 6, position: "absolute",color: "black"}}>
                <div className="flex-col full-margin">
                <span className="full-margin">
                  ¿Seguro que quieres borrar tu usuario? Perderas TODAS tus colecciones para siempre y no podrás recuperarlas.
                </span>
                </div>
                <div className="flex-col full-margin">
                    <div className="flex-text-row">
                        <div className="margin-row">
                            <Button type="submit" variant="contained" color="primary" onClick={()=>setInvisible(true)}> Cancelar </Button>
                        </div>
                        <div className="margin-row">
                            <Button type="submit" variant="contained" color="primary"
                                    onClick={()=>{
                                        setInvisible(true);
                                        continueCallback();}}> Continuar </Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default OverlayYesNoDeleteUser;