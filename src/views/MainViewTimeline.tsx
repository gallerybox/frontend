import React, {useState, useEffect, useContext} from 'react';
import {TokenContext, UserContext} from '../Auth';
import ReducedCollectible from "../components/reusable/ReducedCollectible";
import {CollectibleRepository, CollectibleDTO} from "../repositories/CollectibleRepository";
import MiniCollectibleCard from "../components/reusable/MiniCollectibleCard";


const MainViewTimeline: React.FC  = function (){
    const [token, setToken] = useContext(TokenContext);
    const [user, setUser] = useContext(UserContext);
    const [collectibles, setCollectibles] = useState<Array<CollectibleDTO>>([])
    CollectibleRepository.token.value = token;
    useEffect(() => {
        CollectibleRepository.getTimeline(user)
            .then(data => {setCollectibles(data)})
    },[]);
    return (

        <div className="MainViewTimeline flex-col full">
            {/*

            {collectibles.map((collectible) => <ReducedCollectible collectible={collectible}/> )}

             */}
            {collectibles.map((collectible) => <MiniCollectibleCard collectible={collectible}/> )}
            <div className="loadContent full flex-col"> Loading... </div>
        </div>

    );
}

export default MainViewTimeline;