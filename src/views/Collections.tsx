import React, {useState, useEffect, useContext} from 'react';
import ReducedCollectible from "../components/reusable/ReducedCollectible";
import {ThematicSpaceRepository} from "../repositories/ThematicSpaceRepository";
import {TokenContext, UserContext} from "../Auth";

import MiniCollectibleCard from "../components/reusable/MiniCollectibleCard";
import {CollectionDTO, UserRepository} from "../repositories/UserRepository";
import CollectionCard from "../components/reusable/CollectionCard";




const Collections: React.FC = function (){
    const [token, setToken] = useContext(TokenContext);
    const [user, setUser] = useContext(UserContext);
    const [collections, setCollections] = useState<Array<CollectionDTO>| undefined>([])
    UserRepository.token.value = token;
    useEffect(() => {
        UserRepository.getUser(user)
            .then(data => {setCollections(data.collections)})
    },[]);

    return (

        <div className="Collections flex-col full">
            {collections!.map((collection) => <CollectionCard collection={collection}/> )}
            <div className="loadContent full flex-col"> Loading... </div>
        </div>

    );
}

export default Collections;