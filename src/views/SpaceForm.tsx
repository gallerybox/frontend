import React, {useState, useEffect, useContext} from 'react';
import {TokenContext, UserContext} from "../Auth";
import {CollectionDTO, UserDTO, UserRepository} from "../repositories/UserRepository";
import CollectionCard from "../components/reusable/CollectionCard";
import {ThematicSpaceDTO} from "../repositories/ThematicSpaceRepository";
import SpaceCard from "../components/reusable/SpaceCard";
import {DynamicAttribute, Response} from "../repositories/ValueObjects";
import MiniCollectibleCard from "../components/reusable/MiniCollectibleCard";
import {TextField} from "@mui/material";
import {RouterContext} from "./router";

interface SpaceFormProps {
    spaceId: string
}

const SpaceForm: React.FC<SpaceFormProps> = function ({spaceId}:SpaceFormProps){


    const setView = useContext(RouterContext);
    const [userId, setUserId] = useContext(UserContext);
    const [token, setToken] = useContext(TokenContext);
    const [user, setUser] = useState<Response<UserDTO>>({_id: ""});
    UserRepository.token.value = token;
    useEffect(()=>{
            UserRepository.getUserByOwnedSpaceId(spaceId).then(data=> {
                    setUser(data);
                    if (userId!=data._id) {
                        setView("/not-found");
                    }
                });
        },[]);


    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [attributes, setAttributes] = useState<Array<DynamicAttribute>>()

    const [submitEvent, setSubmitEvent] = useState<React.FormEvent<HTMLFormElement> | null>(null);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitEvent(e);
    };


    return (
        <div className="SpaceForm card">
            <TextField placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} type="text" name="email"
                       variant="standard" margin="normal"/>
            <TextField placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} type="text" name="email"
                       variant="standard" margin="normal"/>

        </div>
    );
}

export default SpaceForm;