import React, {useState, useEffect} from 'react';
import {ThematicSpaceRepository} from "../repositories/ThematicSpaceRepository";
import ReducedCollectible from "../components/reusable/ReducedCollectible";
import {CollectibleRepository, CollectibleDTO} from "../repositories/CollectibleRepository";
import {JsonType} from "../repositories/ValueObjects";



const MainViewTimeline: React.FC  = function (){

    const list: Array<number> = [1, 2]
    const [collectibles, setCollectibles] = useState<Array<CollectibleDTO>>([])

    useEffect(() => {
        CollectibleRepository.test().then(data => {setCollectibles(data)})
    },[]);

    return (
        <div className="MainViewTimeline">

            {collectibles.map((collectible) => <ReducedCollectible collectible={collectible}/> )}
        </div>
    );


}

export default MainViewTimeline;