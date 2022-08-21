import React, {useState, useEffect, ReactElement} from 'react';

import {CollectibleDTO} from "../../repositories/CollectibleRepository";
import {Button} from "@mui/material";

export interface OverlaySpaceLimitProps{

    isInvisible?: boolean;

}

const OverlaySpaceLimit: React.FC<OverlaySpaceLimitProps> = ({isInvisible=false}: OverlaySpaceLimitProps)=>{
    const [invisible, setInvisible] = useState(isInvisible)

    return (

        <div className={invisible?"invisible":"overlay"}>
            <div className="card halfable-margin overlay-content" style={{zIndex: 6, position: "absolute",color: "black"}}>
                <div className="flex-col full-margin">
                <span className="full-margin">
                  Lo sentimos, has alcanzado el límite de espacios temáticos propios, ya tienes 3. Puedes editar uno de los que tienes.
                </span>
                </div>
                <div className="flex-col full-margin">
                    <div className="flex-text-row">

                        <div className="margin-row">
                            <Button type="submit" variant="contained" color="primary" onClick={()=>setInvisible(true)}> Aceptar </Button>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    );
}

export default OverlaySpaceLimit;