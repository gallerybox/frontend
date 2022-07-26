import React, {useState, useEffect, ReactElement, useContext} from 'react';

import {
    Button,
    TextField
} from '@mui/material';
import {Edit, MoreVert, Share} from '@mui/icons-material'
import Link from "../components/reusable/Link";
import {RouterContext} from "./router";
import {TokenContext, UserContext} from "../Auth";
import {Response} from "../repositories/ValueObjects";
import {ThematicSpaceDTO, ThematicSpaceRepository} from "../repositories/ThematicSpaceRepository";
import {CollectionDTO, UserDTO, UserRepository} from "../repositories/UserRepository";
import MiniCollectibleCard from "../components/reusable/MiniCollectibleCard";
import {KeyboardArrowDown, KeyboardArrowUp, EditSharp, DeleteSharp} from '@mui/icons-material';
import {CollectibleDTO} from "../repositories/CollectibleRepository";
import MiniCollectibleCard2 from "../components/reusable/MiniCollectibleCard2";
import OverlaySpaceLimit from "../components/reusable/OverlaySpacesLimit";
import OverlayYesNoDeleteCollection from "../components/reusable/popups/OverlayYesNoDeleteCollection";
import OverlayContinue from "../components/reusable/OverlayContinue";
interface CollectionEditProps{
    collectionId: string;
}

function CollectionEdit({collectionId}: CollectionEditProps){
    const setView = useContext(RouterContext);
    const [token, setToken] = useContext(TokenContext);
    const [loggedUserId, setLoggedUserID] = useContext(UserContext);

    const [collectionDB, setCollectionDB] = useState<Response<CollectionDTO>>();
    const [owner, setOwner] = useState<Response<UserDTO>>({nickname: "loading"});


    const [collectionName, setCollectionName] = useState<string | null>(null);

    const [submitEvent, setSubmitEvent] = useState<React.FormEvent<HTMLFormElement> | null>(null);
    const [deleteEvent, setDeleteEvent] = useState(false);
    const [errors, setErrors] = useState<{[error: string]: string}>({});

    const [overlayDelte, setOverlayDelete] = useState<{component: React.FC}>({component: ()=><OverlayYesNoDeleteCollection  continueCallback={()=>0} isInvisible={true} />});

    UserRepository.token.value = token;
    ThematicSpaceRepository.token.value = token;

    useEffect(()=>{
        if(collectionId && loggedUserId){
            UserRepository.getUser(loggedUserId).then(user => {
                if (user._id){
                    UserRepository.getCollectionById(collectionId).then(data => {
                        if(data._id){
                            setOwner(user as UserDTO);
                            setCollectionDB(data);
                            const existCollection = user!.collections!.some(collection => collection._id as unknown as string == data._id);

                            if (!existCollection)
                                setView("/not-found");
                            else
                                setCollectionName(data!.name as string);
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
        if (submitEvent) {
            if (!collectionName || collectionName.trim().length === 0) {
                setErrors(current => {
                    current["mandatoryName"] = "Una colección debe tener un nombre.";
                    const next: { [error: string]: string } = {};
                    Object.assign(next, current); // Hay que crear un objeto nuevo para que cambie la referencia del objeto y react detecte el cambio y vuelva a renderizar.
                    return next;
                })
            } else{
                const collections = owner!.collections!.map(collection => {
                    if (collection._id as unknown as string === collectionDB?._id) {
                        collection.name = collectionName as string;
                        if (collectionDB && collectionDB.collectibles)
                            collection.collectibles = collectionDB.collectibles;
                    }
                    return collection;
                });

                owner.collections = collections;

                UserRepository.updateUserCollection(owner as UserDTO).then(data => {
                    const collectionSaved: CollectionDTO | undefined = data.collections?.find(collection => collection._id as unknown as string == collectionDB?._id);
                    if (collectionSaved) {
                        setView("/collection", {collectionId: collectionSaved._id});
                    }
                });
            };
        };
    }, [submitEvent, owner, collectionDB]);


    const deleteCollectible: Function = (collectibleId: string)=>{
        console.log("delete", collectibleId)
        const collectiblesOwner: CollectibleDTO[]  = owner.collections?.find(c => c._id==collectionDB?._id)!.collectibles.filter((c2)=> c2._id!=collectibleId)!;

        console.log(JSON.stringify(collectiblesOwner));
        const collectionsOwner = owner!.collections!.map(collection =>{
            if(collection._id as unknown as string === collectionDB?._id){
                collection.collectibles = collectiblesOwner ;
            }
            return collection;
        } );

        owner.collections = collectionsOwner;
        const updatedOwner: UserDTO= JSON.parse(JSON.stringify(owner));


        console.log(JSON.stringify(collectiblesOwner));
        const collectibles = collectionDB?.collectibles!.filter((c2)=> c2._id!=collectibleId);

        collectionDB!.collectibles = collectibles;
        const updatedCollection: UserDTO= JSON.parse(JSON.stringify(collectionDB));


        setCollectionDB(updatedCollection);
        setOwner(updatedOwner);
    };

    useEffect(()=>{

            if(deleteEvent){
                const collections = owner!.collections!.map(collection =>{
                    if(collection._id as unknown as string === collectionDB?._id){
                        collection.name = collectionName as string;
                        if(collectionDB && collectionDB.collectibles)
                            collection.collectibles = [];
                    }
                    return collection;
                } );

                owner.collections = collections;
                UserRepository.updateUserCollection(owner as UserDTO).then(data =>{
                    const toKeep = data.collections?.filter(collection => collection._id as unknown as string!= collectionDB?._id);
                    data.collections = toKeep
                    UserRepository.updateUserCollection(data as UserDTO).then(data =>{
                            setView("/collections");

                        });
                });
            }
        },[deleteEvent])



    const OverlayContinue: React.FC = overlayDelte.component;
    return (
        <div className="CollectionEdit flex-col full">
            <OverlayContinue/>
            <form className=" card flex-col halfable-margin" onSubmit={(e)=>handleSubmit(e)}>
                <header className="flex-row flex-row-space full-margin bold big-font">

                    <div className="flex-text-row">
                        <div className="flex-text-row clickable margin"  onClick={()=>setOverlayDelete({component: ()=><OverlayYesNoDeleteCollection continueCallback={()=>setDeleteEvent(true)}/>})}>
                            <DeleteSharp/>
                        </div>

                        <TextField placeholder="Nombre de la colección" value={collectionName} onChange={(e) => setCollectionName(e.target.value)} type="text" name="name"
                                   error={errors["mandatoryName"]?true:false}  helperText={errors["mandatoryName"]?errors["mandatoryName"]:""}
                                   variant="standard" margin="normal"
                                   inputProps={{ maxLength: 100 }}
                        />

                    </div>
                    <div className="flex-text-row">
                        <span className="bold">{collectionDB?.collectibles?collectionDB?.collectibles?.length: 0} coleccionables</span>
                    </div>
                </header>

                <footer className="flex-row flex-row-space full-margin">
                    <div className="flex-text-row ">
                        <span className="bold">Espacio:&nbsp;</span>
                        { collectionDB?.thematicSpace && collectionDB?.thematicSpace._id &&
                            <Link text={collectionDB?.thematicSpace?.name as string}
                                  onClickAction={() => setView("/space", {spaceId: collectionDB?.thematicSpace?._id})}/>
                        }
                        { (!collectionDB?.thematicSpace || !collectionDB?.thematicSpace._id) &&
                            <span style={{textDecoration: "line-through"}} >"Espacio desaparecido"</span>
                        }
                    </div>
                    <div className="flex-text-row">
                        <Button type="submit" variant="contained" color="primary"> Guardar </Button>
                    </div>
                </footer>
            </form>

            {collectionDB && collectionDB.collectibles &&

                collectionDB.collectibles.map((collectible) =>{
                    return (
                        <div className="flex-col full">

                            <div className="card flex-text-row halfable-margin" style={{height: "0px", justifyContent: "space-between"}}>
                                <div style={{width: "0.5px",height: "0.5px"}}></div>
                                <div className="floating-button clickable" onClick={()=>deleteCollectible(collectible._id)}>
                                    <DeleteSharp/>
                                </div>
                            </div>
                            <MiniCollectibleCard2 collectible={collectible}/>

                        </div>

                    )
                })
            }
        </div>

    );
}

export default CollectionEdit;