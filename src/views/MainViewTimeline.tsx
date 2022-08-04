import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from '../Auth';
import ReducedCollectible from "../components/reusable/ReducedCollectible";
import {CollectibleRepository, CollectibleDTO} from "../repositories/CollectibleRepository";


const MainViewTimeline: React.FC  = function (){
    const [token, setToken] = useContext(UserContext);
    const [collectibles, setCollectibles] = useState<Array<CollectibleDTO>>([])
    CollectibleRepository.token.value = token;
    useEffect(() => {
        CollectibleRepository.findOne('62ebddad04d5451c51456640')
            .then(data => {setCollectibles(data)})
    },[]);
    return (
        <div className="MainViewTimeline">
            {collectibles.map((collectible) => <ReducedCollectible collectible={collectible}/> )}
        </div>
    );
}

export default MainViewTimeline;