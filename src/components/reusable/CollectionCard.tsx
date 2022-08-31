import React, {useState, useEffect, ReactElement, useContext} from 'react';

import {CollectibleDTO} from "../../repositories/CollectibleRepository";
import {Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, Button} from '@mui/material';
import {MoreVert} from '@mui/icons-material'
import {DynamicAttribute, DynamicRepresentation, DynamicType, Response} from "../../repositories/ValueObjects";
import Attribute from "./attributes/Attribute";
import Link from "./Link";
import {CollectionDTO, UserDTO, UserRepository} from "../../repositories/UserRepository";
import {RouterContext} from "../../views/router";
import {TokenContext, UserContext} from "../../Auth";
interface CollectionCardProps{
    collection: CollectionDTO;
}

function CollectionCard({collection}: CollectionCardProps){


    const setView = useContext(RouterContext);

    const [token, setToken] = useContext(TokenContext);
    const [loggedUserId, setLoggedUserID] = useContext(UserContext);

    const [collectionDB, setCollectionDB] = useState<Response<CollectionDTO>>();
    const [owner, setOwner] = useState<Response<UserDTO>>({nickname: "loading"});
    const [isOwner, setIsOwner] = useState(false);
    useEffect(()=>{
        if(collection && loggedUserId){
            UserRepository.getUser(loggedUserId).then(user => {
                if (user._id){
                    UserRepository.getCollectionById(collection._id as string).then(data => {
                        if(data._id){
                            setOwner(user as UserDTO);
                            setCollectionDB(data);
                            const existCollection = user!.collections!.some(collection => collection._id as unknown as string == data._id);
                            setIsOwner(existCollection);


                        }
                    })
                }
            });
        }
    },[]);

    return (
        <div className="CollectionCard flex-col halfable-margin">
            <header className="flex-row flex-row-space full-margin bold big-font">
                <div className="flex-text-row clickable" onClick={()=>setView("/collection", {collectionId: collection._id})}>
                    <span className="bold">{collection.name}</span>
                </div>
                <div className="flex-text-row">
                    <span className="bold">{collection.collectibles.length} coleccionables</span>
                </div>
            </header>

            <footer className="flex-row flex-row-space full-margin">
                <div className="flex-text-row ">
                    <span className="bold">Espacio:&nbsp;</span>
                    { collection.thematicSpace && collection.thematicSpace._id &&
                        <Link text={collection.thematicSpace?.name as string}
                              onClickAction={() => setView("/space", {spaceId: collection.thematicSpace?._id})}/>
                    }
                    { (!collection.thematicSpace || !collection.thematicSpace._id) &&
                        <span style={{textDecoration: "line-through"}} >"Espacio desaparecido"</span>
                    }
                </div>
                <div className={isOwner?"flex-text-row":"invisible"}>
                    <Button variant="contained" color="primary" onClick={()=>setView("/collection-edit", {collectionId: collection._id})}> Editar </Button>
                </div>
            </footer>
        </div>
    );
}

export default CollectionCard;