import React, {useState, useEffect, ReactElement} from 'react';

import {CollectibleDTO} from "../../repositories/CollectibleRepository";
import {Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography } from '@mui/material';
import {MoreVert} from '@mui/icons-material'
interface ReducedCollectibleProps{
    collectible: CollectibleDTO;
}

function MiniCollectibleCard({collectible}: ReducedCollectibleProps){
    const tags: Array<string> = Object.keys(collectible.attributes);
    console.log(collectible);
    return (
        <div className="MiniCollectibleCard full-margin">
            <Card sx={{ height: "100%" }}>{/*sx={{ maxWidth: 345 }}>*/}
                <CardHeader
                    title={collectible.thematicSpace.name}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {tags.map(function (tag){
                            return (
                                <>
                                    <span>{tag}</span>
                                    <span>{JSON.stringify(collectible.attributes[tag].value)}</span>
                                </>
                            )
                        })
                        }
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default MiniCollectibleCard;