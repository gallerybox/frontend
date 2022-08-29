import React, {useState, useEffect, ReactElement, useContext} from 'react';

import {CollectibleDTO} from "../../repositories/CollectibleRepository";
import {Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, Button} from '@mui/material';
import {MoreVert} from '@mui/icons-material'
import {DynamicAttribute, DynamicRepresentation, DynamicType} from "../../repositories/ValueObjects";
import Attribute from "./attributes/Attribute";
import Link from "./Link";
import {CollectionDTO} from "../../repositories/UserRepository";
import {RouterContext} from "../../views/router";
interface CollectionCardProps{
    collection: CollectionDTO;
}

function CollectionCard({collection}: CollectionCardProps){
    const setView = useContext(RouterContext);

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
                <div className="flex-text-row">
                    <Button variant="contained" color="primary" onClick={()=>alert("Editar")}> Editar </Button>
                </div>
            </footer>
        </div>
    );
}

export default CollectionCard;