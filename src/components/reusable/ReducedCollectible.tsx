import React, {useState, useEffect, ReactElement} from 'react';

import {CollectibleDTO} from "../../repositories/CollectibleRepository";

interface ReducedCollectibleProps{
    collectible: CollectibleDTO;
}

function ReducedCollectible({collectible}: ReducedCollectibleProps){
    const tags: Array<string> = Object.keys(collectible.attributes);


    return (
        <div className="ReducedCollectible full-margin">
            <p>
                Mira, un colleccionable
            </p>
            {tags.map(function (tag){
                    return (
                        <>
                            <span>{tag}</span>
                            <span>{JSON.stringify(collectible.attributes[tag].value)}</span>
                        </>
                    )
                })
            }

        </div>

    );
}

export default ReducedCollectible;