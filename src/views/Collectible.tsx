import React, {useState, useEffect, ReactElement, useContext} from 'react';


import {Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography } from '@mui/material';
import {Edit, MoreVert, Share} from '@mui/icons-material'
import {CollectibleDTO, CollectibleRepository} from "../repositories/CollectibleRepository";
import {RouterContext} from "./router";
import Attribute from "../components/reusable/attributes/Attribute";
import Link from "../components/reusable/Link";
import {TokenContext, UserContext} from "../Auth";
import {DynamicType, Response} from "../repositories/ValueObjects";
import OverlayQRCode from "../components/reusable/popups/OverlayQRCode";
import {UserDTO, UserRepository} from "../repositories/UserRepository";
import {backend_url, responseMiddleware, front_config_csv} from "../repositories/config";



interface CollectibleProps{
    collectibleId: string;
}

const Collectible: React.FC<CollectibleProps> = ({collectibleId}: CollectibleProps) => {
    const setView = useContext(RouterContext);
    const [token, setToken] = useContext(TokenContext);
    const [collectible, setCollectible] = useState<Response<CollectibleDTO>>({attributes: {}});
    const [timeAgoString, setTimeAgoString] = useState("2 horas");
    const [loggedUserId, setLoggedUserId] = useContext(UserContext);
    const [owner, setOwner] = useState<Response<UserDTO>>();

    CollectibleRepository.token.value = token;
    UserRepository.token.value = token;
    useEffect( () =>{
            if (collectibleId){
                CollectibleRepository.findOne(collectibleId).then(data =>{
                    if (data && data._id){
                        setCollectible(data);
                        let time_ago_number: number = Math.abs(Date.now()-new Date(data.lastModified).getTime()) / 36e5;
                        let time_unit: string = " hora"

                        if (time_ago_number<1){
                            time_ago_number = time_ago_number * 60;
                            time_unit = " minuto"
                        } else if (time_ago_number>23){
                            time_ago_number = time_ago_number / 24;
                            time_unit = " día"
                        }
                        if (Math.round(time_ago_number) != 1){
                            time_unit = time_unit + "s";
                        }
                        setTimeAgoString(Math.round(time_ago_number) + time_unit);
                        UserRepository.getUser(data.user._id).then( data =>{
                             setOwner(data);
                            }
                        )
                    }else{
                        setView("/not-found");
                    }


                })
            }else {
                setView("/not-found");
            };

        }, [])


    return (

        <div className="Collectible flex-col full" >
            <div className="flex-col halfable-margin" style={{background:"white", color: "black"}}>
                <header className="flex-text-row full-margin bold big-font">
                    <span className={collectible?.thematicSpace?"clickable":""} style={collectible?.thematicSpace?{}:{textDecoration: "line-through"}} onClick={collectible?.thematicSpace?()=>setView("/space",{spaceId:collectible.thematicSpace?._id}):()=>0}>{collectible?.thematicSpace?collectible.thematicSpace.name:"Espacio desaparecido"}</span>
                    <div>
                        <Edit className={owner && owner!._id==loggedUserId?"clickable margin-row":"invisible"} onClick={()=>setView("/collectible-form",{collectibleId: collectible._id})}/>
                    </div>
                </header>
                <div className="flex-col full-margin">
                    {
                        Object.keys(collectible?.attributes!).sort((tag1,tag2) => collectible?.attributes![tag1].representationOrder!-collectible?.attributes![tag2].representationOrder!).map(
                            tag => {
                                return ( <Attribute className="full-margin" attribute={ collectible?.attributes?.[tag] as DynamicType} tag={tag}/>);
                            }
                        )

                    }
                </div>
                <footer className="flex-row flex-row-space full-margin">
                    <div className="flex-text-row">
                        <span className="bold">Por:&nbsp;</span><Link text={collectible?.user?.nickname!} onClickAction={()=>setView("/user", {userId: collectible?.user?._id})}/>
                    </div>
                    <div className="flex-text-row">
                        <span>Hace&nbsp;</span><span>{timeAgoString}</span>
                    </div>
                </footer>
            </div>


        </div>
    );
}

export default Collectible;