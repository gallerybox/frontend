import React, {useState, useEffect, ReactElement, useContext} from 'react';

import {CollectibleDTO} from "../../repositories/CollectibleRepository";
import {Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography } from '@mui/material';
import {MoreVert} from '@mui/icons-material'
import {DynamicAttribute, DynamicRepresentation, DynamicType} from "../../repositories/ValueObjects";
import Attribute from "./attributes/Attribute";
import Link from "./Link";
import {RouterContext} from "../../views/router";
interface ReducedCollectibleProps{
    collectible: CollectibleDTO;
}

function MiniCollectibleCard({collectible}: ReducedCollectibleProps){
    const setView = useContext(RouterContext);
    const tags: Array<string> = Object.keys(collectible.attributes);
    let time_ago_number: number = Math.abs((new Date().getTime())-(new Date(collectible.lastModified).getTime())) / 36e5;
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
    let time_ago_string: string = Math.round(time_ago_number) + time_unit;
    let tagsToShow: Array<string> =tags.sort(
        function (tag1, tag2) {return collectible.attributes[tag1].representationOrder - collectible.attributes[tag2].representationOrder}
    ).filter(tag=>collectible.attributes[tag].showInReducedView);
    if (tagsToShow.length<=0){
        tagsToShow = tags.sort(function (tag1, tag2) {return collectible.attributes[tag1].representationOrder - collectible.attributes[tag2].representationOrder}).slice(0, 3);
    }
    return (
        <div className="MiniCollectibleCard flex-col halfable-margin">
            <header className="flex-row full-margin bold big-font">
                <span className={collectible.thematicSpace?"clickable":""} style={collectible.thematicSpace?{}:{textDecoration: "line-through"}} onClick={collectible.thematicSpace?()=>setView("/space",{spaceId:collectible.thematicSpace?._id}):()=>0}>{collectible.thematicSpace?collectible.thematicSpace.name:"Espacio desaparecido"}</span>
            </header>
            <div className="card-body flex-col full-margin clickable" onClick={()=>setView("/collectible", {collectibleId:collectible._id})}>
                {
                    tagsToShow.sort(function (tag1, tag2) {return collectible.attributes[tag1].representationOrder - collectible.attributes[tag2].representationOrder})
                        .map(function (tag) {
                              return ( <Attribute className="full-margin" attribute={ collectible.attributes[tag]} tag={tag}/>);
                        })
                }
            </div>
            <footer className="flex-row flex-row-space full-margin">
                <div className="flex-text-row">
                    <span className="bold">Por:&nbsp;</span><Link text={collectible.user.nickname} onClickAction={()=>setView("/user", {userId: collectible.user._id})}/>
                </div>
                <div className="flex-text-row">
                    <span>Hace&nbsp;</span><span>{time_ago_string}</span>
                </div>
            </footer>

        </div>
    );
}

export default MiniCollectibleCard;