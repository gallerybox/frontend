import React, {useState, useEffect, ReactElement, useContext} from 'react';

import {
    Button,
    TextField
} from '@mui/material';
import {MoreVert} from '@mui/icons-material'
import Link from "../components/reusable/Link";
import {RouterContext} from "./router";
import {TokenContext, UserContext} from "../Auth";
import {Response} from "../repositories/ValueObjects";
import {ThematicSpaceDTO, ThematicSpaceRepository} from "../repositories/ThematicSpaceRepository";
import {CollectionDTO, UserDTO, UserRepository} from "../repositories/UserRepository";

interface CollectionCreateProps{
    spaceId: string;
}

function CollectionCreate({spaceId}: CollectionCreateProps){
    const setView = useContext(RouterContext);
    const [token, setToken] = useContext(TokenContext);
    const [loggedUserId, setLoggedUserID] = useContext(UserContext);

    const [space, setSpaces] = useState<Response<ThematicSpaceDTO>>();
    const [owner, setOwner] = useState<Response<UserDTO>>({nickname: "loading"});


    const [collectionName, setCollectionName] = useState<string | null>(null);

    const [submitEvent, setSubmitEvent] = useState<React.FormEvent<HTMLFormElement> | null>(null);
    const [errors, setErrors] = useState<{[error: string]: string}>({});

    UserRepository.token.value = token;
    ThematicSpaceRepository.token.value = token;

    useEffect(()=>{
        if(spaceId && loggedUserId){
            UserRepository.getUser(loggedUserId).then(user => {
                if (user._id){
                    ThematicSpaceRepository.getSpaceById(spaceId).then(space =>{
                        if(space._id){
                            setOwner(user as UserDTO);
                            setSpaces(space as ThematicSpaceDTO);
                            const existCollection = user!.collections!.some(collection => collection.thematicSpace._id as unknown as string == spaceId);
                            if (existCollection)
                                setView("/not-found");


                        }else{
                            setView("/not-found");
                        }
                    })
                }else{
                    setView("/not-found");
                }
            });

        }else{
            setView("/not-found");
        }
    },[]);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitEvent(e);




    };

    useEffect(()=>{
            if (submitEvent){
                const newCollection: CollectionDTO = {
                    collectibles: [],
                    thematicSpace: space?._id as unknown as ThematicSpaceDTO,
                    name: collectionName as string,
                }
                const existCollection = owner!.collections!.some(collection => collection.thematicSpace as unknown as string === spaceId);
                owner.collections?.forEach(c => console.log(JSON.stringify(c)));
                //console.log(JSON.stringify(owner));
                if (!existCollection){
                    owner.collections?.push(newCollection);
                    setOwner(owner);
                }

                UserRepository.updateUser(owner as UserDTO).then(data =>{
                    const collectionSaved: CollectionDTO | undefined = data.collections?.find(collection => collection.thematicSpace as unknown as string== spaceId);
                    if (collectionSaved){
                        setView("/collection",{collectionId:collectionSaved._id});
                    }
                });
            };
        }, [submitEvent, owner]);





    return (
         <div className="CollectionCreate flex-col full">
             <form className="flex-col halfable-margin" onSubmit={(e)=>handleSubmit(e)} style={{background: "white", color: "black"}}>
                 <header className="flex-row flex-row-space full-margin bold big-font">

                     <div className="flex-text-row">
                         <TextField placeholder="Nombre de la colección" value={collectionName} onChange={(e) => setCollectionName(e.target.value)} type="text" name="email"
                                    variant="standard" margin="normal"/>
                     </div>
                     <div style={{width: "1px", height: "1px"}}></div>
                 </header>

                 <footer className="flex-row flex-row-space full-margin">
                     <div className="flex-text-row ">
                         <span className="bold">Espacio:&nbsp;</span>
                         { space && space._id &&
                             <Link text={space?.name as string}
                                   onClickAction={() => setView("/space", {spaceId: space?._id})}/>
                         }
                         { (!space || !space._id) &&
                             <span style={{textDecoration: "line-through"}} >"Espacio desaparecido"</span>
                         }
                     </div>
                     <div className="flex-text-row">
                         <Button type="submit" variant="contained" color="primary"> Guardar </Button>
                     </div>
                 </footer>
             </form>
         </div>

    );
}

export default CollectionCreate;