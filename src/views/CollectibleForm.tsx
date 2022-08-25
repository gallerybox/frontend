import React, {useState, useEffect, ReactElement, useContext} from 'react';


import {Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography } from '@mui/material';
import {MoreVert} from '@mui/icons-material'
import {CollectibleDTO, CollectibleRepository} from "../repositories/CollectibleRepository";
import {RouterContext} from "./router";
import Attribute from "../components/reusable/attributes/Attribute";
import Link from "../components/reusable/Link";
import {TokenContext} from "../Auth";
import {DynamicType, Response} from "../repositories/ValueObjects";



interface CollectibleFormProps{
    collectibleId: string;
}

const CollectibleForm: React.FC<CollectibleFormProps> = ({collectibleId}: CollectibleFormProps) => {
    const setView = useContext(RouterContext);
    const [token, setToken] = useContext(TokenContext);
    const [collectible, setCollectible] = useState<Response<CollectibleDTO>>({attributes: {}});
    const [timeAgoString, setTimeAgoString] = useState("2 horas");
    CollectibleRepository.token.value = token;
    useEffect( () =>{
        if (collectibleId){
            CollectibleRepository.findOne(collectibleId).then(data =>{
                console.log(JSON.stringify(data));
                if (data){
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
                <header className="flex-row full-margin bold big-font">
                    <span className={collectible?.thematicSpace?"clickable":""} style={collectible?.thematicSpace?{}:{textDecoration: "line-through"}} onClick={collectible?.thematicSpace?()=>setView("/space",{spaceId:collectible.thematicSpace?._id}):()=>0}>{collectible?.thematicSpace?collectible.thematicSpace.name:"Espacio desaparecido"}</span>
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

export default CollectibleForm;