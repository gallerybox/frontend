import React, {useState, useEffect} from 'react';
import ReducedCollectible from "../components/reusable/ReducedCollectible";
import {CollectibleRepository, CollectibleDTO} from "../repositories/CollectibleRepository";


const MainViewTimeline: React.FC  = function (){
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