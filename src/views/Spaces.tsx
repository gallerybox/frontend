import React, {useState, useEffect, useContext} from 'react';
import {TokenContext, UserContext} from "../Auth";
import {CollectionDTO, UserRepository} from "../repositories/UserRepository";
import CollectionCard from "../components/reusable/CollectionCard";
import {ThematicSpaceDTO} from "../repositories/ThematicSpaceRepository";
import SpaceCard from "../components/reusable/SpaceCard";
import {Response} from "../repositories/ValueObjects";
import MiniCollectibleCard from "../components/reusable/MiniCollectibleCard";
import {Button} from "@mui/material";
import {RouterContext} from "./router";

interface SpacesProps {
    ownSpaces: boolean
    userId?: string
}

const Spaces: React.FC<SpacesProps> = function ({ownSpaces, userId}:SpacesProps){
    const setView = useContext(RouterContext);
    const [token, setToken] = useContext(TokenContext);
    const [user, setUser] = useContext(UserContext);
    const [spaces, setSpaces] = useState<Array<ThematicSpaceDTO>>([])
    UserRepository.token.value = token;
    useEffect(() => {
        if (!userId){
            UserRepository.getUser(user)
                .then(data => {
                        if (ownSpaces){
                            setSpaces(data.ownedThematicSpaces!);
                        }else{
                            setSpaces(data.followedThematicSpaces!);
                        }
                    }
                )
        }else{
            UserRepository.getUser(userId)
                .then(data => {
                        setSpaces(data.followedThematicSpaces!);
                    }
                )
        }

    },[]);

    return (
        <div className="Spaces flex-col full">

            {spaces.map((space: ThematicSpaceDTO) => <SpaceCard space={space}/> )}

            <div className={(ownSpaces && spaces.length<3)?"flex-col halfable":"invisible"}>
                <div className="flex-row flex-row-space full-margin">
                    <div style={{width: "1px", height: "1px"}}>
                    </div>
                    <Button variant="contained" color="primary" onClick={()=>setView("/space-form")}>
                        Nuevo espacio temático
                    </Button>
                </div>

            </div>

        </div>
    );
}

export default Spaces;