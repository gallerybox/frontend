import React, {useState, useEffect, useContext} from 'react';
import {TokenContext, UserContext} from "../Auth";
import {CollectionDTO, UserRepository} from "../repositories/UserRepository";
import CollectionCard from "../components/reusable/CollectionCard";
import {ThematicSpaceDTO} from "../repositories/ThematicSpaceRepository";
import SpaceCard from "../components/reusable/SpaceCard";
import {Response} from "../repositories/ValueObjects";
import MiniCollectibleCard from "../components/reusable/MiniCollectibleCard";

interface SpacesProps {
    ownSpaces: boolean
}

const Spaces: React.FC<SpacesProps> = function ({ownSpaces}:SpacesProps){
    const [token, setToken] = useContext(TokenContext);
    const [user, setUser] = useContext(UserContext);
    const [spaces, setSpaces] = useState<Array<ThematicSpaceDTO>>([])
    UserRepository.token.value = token;
    useEffect(() => {
        UserRepository.getUser(user)
            .then(data => {
                if (ownSpaces){
                    setSpaces(data.ownedThematicSpaces!);
                }else{
                    setSpaces(data.followedThematicSpaces!);
                }
            }

            )

    },[]);

    return (
        <div className="Spaces flex-col full">

            {spaces.map((space: ThematicSpaceDTO) => <SpaceCard space={space}/> )}
            <div className="loadContent full flex-col"> Loading... </div>
        </div>
    );
}

export default Spaces;