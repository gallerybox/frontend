import React, {useState, useEffect, ReactElement, useContext} from 'react';

import {CollectibleDTO, CollectibleRepository} from "../../repositories/CollectibleRepository";
import {Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, Button} from '@mui/material';
import {MoreVert} from '@mui/icons-material'
import {DynamicAttribute, DynamicRepresentation, DynamicType, Response} from "../../repositories/ValueObjects";
import Attribute from "./attributes/Attribute";
import Link from "./Link";
import {CollectionDTO, UserDTO, UserRepository} from "../../repositories/UserRepository";
import {ThematicSpaceDTO} from "../../repositories/ThematicSpaceRepository";
import {TokenContext} from "../../Auth";
import {RouterContext} from "../../views/router";
interface SpaceCardProps{
    space: ThematicSpaceDTO;
}

function SpaceCard({space}: SpaceCardProps){
    const [token, setToken] = useContext(TokenContext);
    const setView = useContext(RouterContext);
    const [users, setUsers] = useState<Response<Array<UserDTO>>>([]);
    const [collections, setCollections] = useState<Array<CollectionDTO>>([]);
    const [collectibles, setCollectibles] = useState<Response<Array<CollectibleDTO>>>([]);
    const [owner, setOwner] = useState<Response<UserDTO>>({nickname: "loading"});
    UserRepository.token.value = token;
    useEffect( () => {
            UserRepository.getUsersByFollowedSpaceId(space._id)
                .then(data => {
                    (data as UserDTO[]).push(owner as UserDTO);
                    setUsers(data);
                })
        }
    ,[])
    useEffect( () => {
            CollectibleRepository.getSpaceTimeline(space._id)
                .then(data => {

                    setCollectibles(data);
                })
        }
        ,[])
    useEffect( () => {
            UserRepository.getUserByOwnedSpaceId(space._id)
                .then(data => {

                    setOwner(data);
                    UserRepository.getUsersByFollowedSpaceId(space._id)
                        .then(data2 => {
                            if (data2){
                                const users = (data2 as Array<UserDTO>)
                                users.push(data as UserDTO);
                                const collections = users.filter(u=>u.collections && u.collections.length>0).map(u=>u.collections).flat().filter(c=> c.thematicSpace._id == space._id);
                                setCollections(collections);

                            }
                        })
                })

        }
        ,[])


    return (
        <div className="SpaceCard flex-col halfable-margin">
            <header className="flex-row flex-col full bold big-font full-margin">
                <div className="flex-text-row flex-row-space full-margin">
                    <span className="bold clickable" onClick={()=>setView("/space", {spaceId:space._id})}>{space.name}</span>
                    <span className="flex-text-row bold clickable" onClick={()=>setView("/collections",{spaceId:space._id})}>{collections?collections?.length:0} colecciones</span>
                </div>
                <div className="flex-text-row flex-row-space full-margin">
                    <div className="flex-text-row">
                        <span className="bold">De:&nbsp;</span>
                        <Link text={owner.nickname!} onClickAction={()=>setView("/user",{userId:owner._id})}/>
                    </div>
                    <span className="bold clickable" onClick={()=>setView("/users",{spaceId:space._id})}>{users.length} colaboradores</span>
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

export default SpaceCard;