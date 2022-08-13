import React, {useState, useEffect, useContext} from 'react';
import {TokenContext, UserContext} from "../Auth";
import {CollectionDTO, UserDTO, UserRepository} from "../repositories/UserRepository";
import CollectionCard from "../components/reusable/CollectionCard";
import {ThematicSpaceDTO, ThematicSpaceRepository} from "../repositories/ThematicSpaceRepository";
import SpaceCard from "../components/reusable/SpaceCard";
import {Response} from "../repositories/ValueObjects";
import MiniCollectibleCard from "../components/reusable/MiniCollectibleCard";
import {CollectibleDTO, CollectibleRepository} from "../repositories/CollectibleRepository";
import Link from "../components/reusable/Link";

interface SpaceProps {
    spaceId: string;
}

const Space: React.FC<SpaceProps> = function ({spaceId}:SpaceProps){
    const [token, setToken] = useContext(TokenContext);
    const [user, setUser] = useContext(UserContext);
    const [space, setSpace] = useState<Response<ThematicSpaceDTO>>({})
    const [colaborators, setColaborators] = useState<Response<Array<UserDTO>>>([]);
    const [collectibles, setCollectibles] = useState<Response<Array<CollectibleDTO>>>([]);
    const [owner, setOwner] = useState<Response<UserDTO>>({nickname: "loading"});
    ThematicSpaceRepository.token.value = token;
    useEffect(() => {
        ThematicSpaceRepository.getSpaceById(spaceId).then(
            data=> {
                console.log(data);
                setSpace(data);
                CollectibleRepository.getSpaceTimeline(data._id!)
                    .then(data => {
                        setCollectibles(data);
                    })
                UserRepository.getUserByOwnedSpaceId(data._id!)
                    .then(data => {

                        setOwner(data);
                    })
                UserRepository.getUsersByFollowedSpaceId(data._id!)
                    .then(data => {

                        setColaborators(data);
                    })
            }
        )

    },[]);


    return (
        <div className="SpaceCard flex-col halfable-margin">
            <header className="flex-row flex-col full bold big-font full-margin">
                <div className="flex-text-row flex-row-space full-margin">
                    <span className="bold clickable">{space.name}</span>
                    <span className="bold clickable">{collectibles.length} coleccionables</span>
                </div>
                <div className="flex-text-row flex-row-space full-margin">
                    <div className="flex-text-row">
                        <span className="bold">De:&nbsp;</span>
                        <Link text={owner.nickname!} onClickAction={()=>alert(owner.nickname)}/>
                    </div>
                    <span className="bold clickable">{colaborators.length} usuarios</span>
                </div>
            </header>

            <footer className="flex-row flex-row-space full-margin">
                <div className="flex-text-row ">
                    <span>{space.description}</span>
                </div>

            </footer>
        </div>
    );
}

export default Space;