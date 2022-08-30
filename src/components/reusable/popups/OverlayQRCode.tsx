import React, {useState} from 'react';
import {Button, Link} from "@mui/material";
import {QRCodeSVG} from 'qrcode.react';

export interface OverlayQRCodeProps{
    continueCallback: Function;
    isInvisible?: boolean;

}

const OverlayQRCode: React.FC<OverlayQRCodeProps> = ({continueCallback, isInvisible=false}: OverlayQRCodeProps)=>{
    const [invisible, setInvisible] = useState(isInvisible)


    return (

        <div className={invisible?"invisible":"overlay"}>
            <div className="card halfable-margin overlay-content" style={{zIndex: 6, position: "absolute",color: "black"}}>
                <div className="flex-col full-margin">
                <span className="full-margin">
                    <Link href={window.location.href}>{window.location.href}</Link>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', paddingTop: '20px'}}>
                    <QRCodeSVG value={window.location.href} size={256}/>
                    </div>
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

export default OverlayQRCode;