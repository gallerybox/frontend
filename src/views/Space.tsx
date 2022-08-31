import React, {useState, useEffect, useContext} from 'react';
import {TokenContext, UserContext} from "../Auth";
import {CollectionDTO, UserDTO, UserRepository} from "../repositories/UserRepository";
import CollectionCard from "../components/reusable/CollectionCard";
import {ThematicSpaceDTO, ThematicSpaceRepository} from "../repositories/ThematicSpaceRepository";
import SpaceCard from "../components/reusable/SpaceCard";
import {Response} from "../repositories/ValueObjects";
import MiniCollectibleCard from "../components/reusable/MiniCollectibleCard";
import {CollectibleDTO, CollectibleRepository} from "../repositories/CollectibleRepository";
import {Edit, Share} from '@mui/icons-material';
import Link from "../components/reusable/Link";
import {Button} from "@mui/material";
import {RouterContext} from "./router";
import OverlayQRCode from "../components/reusable/popups/OverlayQRCode";
import MiniCollectibleCard2 from "../components/reusable/MiniCollectibleCard2";

interface SpaceProps {
    spaceId: string;
}

const Space: React.FC<SpaceProps> = function ({spaceId}:SpaceProps){
    const setView = useContext(RouterContext);
    const [token, setToken] = useContext(TokenContext);
    const [user, setUser] = useContext(UserContext);
    const [space, setSpace] = useState<Response<ThematicSpaceDTO>>({})
    const [colaborators, setColaborators] = useState<Response<Array<UserDTO>>>([]);
    const [collections, setCollections] = useState<Array<CollectionDTO>>([]);
    const [collectibles, setCollectibles] = useState<Array<CollectibleDTO>>([]);
    const [owner, setOwner] = useState<Response<UserDTO>>({nickname: "loading"});
    const [overlayQRCodeView, setOverlayQRCodeView] = useState<{component: React.FC}>({component: ()=><OverlayQRCode  isInvisible={true} continueCallback={()=>0}/>});
    
    const [loggedUser, setLoggedUser] = useState<Response<UserDTO>>({});

    ThematicSpaceRepository.token.value = token;

    useEffect(() => {

        ThematicSpaceRepository.getSpaceById(spaceId).then(
            s=> {
                console.log(s);
                setSpace(s);
                CollectibleRepository.getSpaceTimeline(s._id!)
                    .then(data => {
                        setCollectibles(data);
                    })
                UserRepository.getUserByOwnedSpaceId(s._id!)
                    .then(data => {

                        setOwner(data);
                        UserRepository.getUsersByFollowedSpaceId(s._id!)
                            .then(data2 => {
                                if (data2){
                                    setColaborators(data2);
                                    const users = (data2 as Array<UserDTO>)
                                    users.push(data as UserDTO);
                                    const collections = users.filter(u=>u.collections && u.collections.length>0).map(u=>u.collections).flat().filter(c=> c.thematicSpace._id == spaceId);
                                    setCollections(collections);

                                }
                            })
                    })

                    if (user) {
                        UserRepository.getUser(user)
                            .then(data => {
                                    setLoggedUser(data);
                                }
                        )
                    }
            }
        )

    },[]);

    const handleShowQR = () => {

    }


    const OverlayQRCodeView: React.FC = overlayQRCodeView.component;
    return (
        <div className="Space flex-col full">
            <OverlayQRCodeView/>
            <div className="SpaceCard flex-col halfable-margin">
                <header className="flex-row flex-col full bold big-font full-margin">
                    <div className="flex-row flex-row-space full-margin">
                        <div className="flex-text-row">
                            <span className="bold">{space.name}</span>
                            <div>
                                <Edit className={owner._id==user?"clickable margin-row":"invisible"} onClick={()=>setView("/space-form",{spaceId: space._id})}/>
                                <Share  className="clickable margin-row"  onClick={
                                    ()=>
                                    setOverlayQRCodeView({
                                        component: ()=>
                                            <OverlayQRCode
                                                continueCallback={()=>handleShowQR()}/>
                                    })
                                }/>
                            </div>
                        </div>
                        <span className="flex-text-row bold clickable" onClick={()=>setView("/collections",{spaceId:space._id})}>{collections?collections?.length:0} colecciones</span>
                    </div>
                    <div className="flex-text-row flex-row-space full-margin">
                        <div className="flex-text-row">
                            <span className="bold">De:&nbsp;</span>
                            <Link text={owner.nickname!} onClickAction={()=>setView("/user", {userId: owner._id})}/>
                        </div>
                        <span className="bold clickable" onClick={()=>setView("/users",{spaceId:spaceId})}>{colaborators.length} colaboradores</span>
                    </div>
                </header>

                <footer className="flex-row flex-row-space full-margin">
                    <div className="flex-text-row ">
                        <span>{space.description}</span>
                    </div>

                </footer>
                <div className="flex-row flex-row-space full-margin">
                    <div className="flex-text-row" style={{width: "1px"}}></div>
                    <div className="flex-row">
                        { loggedUser && loggedUser._id && !loggedUser.collections?.some(c => c.thematicSpace._id==space._id) &&
                        <Button type="submit" variant="contained" color="primary" onClick={()=>{
                            alert(colaborators.some?.(c => c._id === user)||owner._id==user?"Nueva colección": "Participar")
                            if(colaborators.some?.(c => c._id === user)||owner._id==user){
                                setView("/collection-create", {spaceId: space._id});
                            }else{
                                
                            }
                            
                        }}>
                            {colaborators.some?.(c => c._id === user)||owner._id===user?"Nueva colección": "Participar"} </Button>
                        }
                        { loggedUser && loggedUser._id && loggedUser.collections?.some(c => c.thematicSpace._id==space._id) &&
                        <Button type="submit" variant="contained" color="primary" onClick={()=>{
                            
                            setView("/collectible-form",{spaceId: space._id});
                            
                        }}> Nuevo coleccionable </Button>
                        }
                    </div>
                </div>

            </div>
            {collectibles.map((collectible) => <MiniCollectibleCard2 collectible={collectible}/> )}
            <div style={{width:"1rem", height: "1rem"}}></div>
        </div>

    );
}

export default Space;