import React, {useState, useEffect, ReactElement} from 'react';

import {CollectibleDTO} from "../../repositories/CollectibleRepository";
import {Button} from "@mui/material";

export interface OverlayContinueProps{
    continueCallback: Function;
    isInvisible?: boolean;

}

const OverlayContinue: React.FC<OverlayContinueProps> = ({continueCallback, isInvisible=false}: OverlayContinueProps)=>{
    const [invisible, setInvisible] = useState(isInvisible)

    return (

        <div className={invisible?"invisible":"overlay"}>
            <div className="card halfable-margin overlay-content" style={{zIndex: 6, position: "absolute",color: "black"}}>
                <div className="flex-col full-margin">
                <span className="full-margin">
                  ¿Seguro que quieres abandonar la página? Los cambios no guardados se perderán.
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

export default OverlayContinue;