import React, {useState, useEffect, useContext} from 'react';
import ReducedCollectible from "../components/reusable/ReducedCollectible";
import {ThematicSpaceRepository} from "../repositories/ThematicSpaceRepository";
import {TokenContext, UserContext} from "../Auth";

import MiniCollectibleCard from "../components/reusable/MiniCollectibleCard";
import {CollectionDTO, UserDTO, UserRepository} from "../repositories/UserRepository";
import CollectionCard from "../components/reusable/CollectionCard";
import {RouterContext} from "./router";


interface CollectionsProp{
    userId?: string;
    spaceId?: string;
}

const Collections: React.FC = function ({userId, spaceId}:CollectionsProp){
    const setView = useContext(RouterContext);

    const [token, setToken] = useContext(TokenContext);
    const [user, setUser] = useContext(UserContext);
    const [collections, setCollections] = useState<Array<CollectionDTO>| undefined>([])
    UserRepository.token.value = token;
    useEffect(() => {
        if (!userId && !spaceId){
            if(user){
                UserRepository.getUser(user)
                    .then(data => {setCollections(data.collections)})
            }else{
                setView("/not-found");
            }

        }else if(userId){
            if(user){
                UserRepository.getUser(userId)
                    .then(data => {setCollections(data.collections)})
            }else{
                setView("/not-found");
            }
        }else if(spaceId){
            UserRepository.getUserByOwnedSpaceId(spaceId)
                .then(data => {
                    UserRepository.getUsersByFollowedSpaceId(spaceId)
                        .then(data2 => {
                            if (data2){
                                const users = (data2 as Array<UserDTO>)
                                users.push(data as UserDTO);
                                const collections = users.filter(u=>u.collections && u.collections.length>0).map(u=>u.collections).flat().filter(c=> c.thematicSpace._id == spaceId);
                                setCollections(collections);

                            }
                        })
                })
        }else{
            setView("/not-found");
        }

    },[]);

    return (

        <div className="Collections flex-col full">
            {collections!.map((collection) => <CollectionCard collection={collection}/> )}
            <div style={{width:"1rem", height: "1rem"}}></div>
        </div>

    );
}

export default Collections;