import React, {useState, useEffect, ReactElement} from 'react';

import {CollectibleDTO} from "../../repositories/CollectibleRepository";
import {Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography } from '@mui/material';
import {MoreVert} from '@mui/icons-material'
import {DynamicAttribute, DynamicRepresentation, DynamicType} from "../../repositories/ValueObjects";
import Attribute from "./attributes/Attribute";
import Link from "./Link";
interface ReducedCollectibleProps{
    collectible: CollectibleDTO;
}

function MiniCollectibleCard({collectible}: ReducedCollectibleProps){
    const tags: Array<string> = Object.keys(collectible.attributes);
    console.log("date is: " + typeof collectible.lastModified);

    let time_ago_number: number = Math.abs(Date.now()-new Date(collectible.lastModified).getTime()) / 36e5;
    let time_unit: string = " hora"

    if (time_ago_number<1){
        time_ago_number = time_ago_number * 60;
        let time_unit: string = " minuto"
    } else if (time_ago_number>23){
        time_ago_number = time_ago_number / 24;
        let time_unit: string = " día"
    }
    if (Math.round(time_ago_number) != 1){
        time_unit = time_unit + "s";
    }
    let time_ago_string: string = Math.round(time_ago_number) + time_unit;
    return (
        <div className="MiniCollectibleCard flex-col halfable-margin">
            <header className="flex-row full-margin bold big-font">
                {collectible.thematicSpace.name}
            </header>
            <div className="card-body flex-col full-margin">
                {
                    tags.sort(tag => collectible.attributes[tag].representationOrder)
                        .map(function (tag) {
                              return ( <Attribute className="full-margin" attribute={ collectible.attributes[tag]} tag={tag}/>);
                        })
                }
            </div>
            <footer className="flex-row flex-row-space-between full-margin">
                <div className="flex-text-row">
                    <span className="bold">Por:&nbsp;</span><Link text={collectible.user.nickname} onClickAction={()=>alert(collectible.user.nickname)}/>
                </div>
                <div className="flex-text-row">
                    <span>Hace&nbsp;</span><span>{time_ago_string}</span>
                </div>
            </footer>

        </div>
    );
}

export default MiniCollectibleCard;