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

interface SpaceProps {
    spaceId: string;
}

const Space: React.FC<SpaceProps> = function ({spaceId}:SpaceProps){
    const setView = useContext(RouterContext);
    const [token, setToken] = useContext(TokenContext);
    const [user, setUser] = useContext(UserContext);
    const [space, setSpace] = useState<Response<ThematicSpaceDTO>>({})
    const [colaborators, setColaborators] = useState<Response<Array<UserDTO>>>([]);
    const [collectibles, setCollectibles] = useState<Array<CollectibleDTO>>([]);
    const [owner, setOwner] = useState<Response<UserDTO>>({nickname: "loading"});
    const [overlayQRCodeView, setOverlayQRCodeView] = useState<{component: React.FC}>({component: ()=><OverlayQRCode  isInvisible={true} continueCallback={()=>0}/>});

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
                        if (data){
                            setColaborators(data);
                        }

                    })
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
                            <div className={owner._id==user?"":"invisible"}>
                                <Edit className="clickable margin-row" onClick={()=>setView("/space-form",{spaceId: space._id})}/>
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
                        <span className="flex-text-row bold clickable">{collectibles.length} coleccionables</span>
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
                        <Button type="submit" variant="contained" color="primary" onClick={()=>{
                            alert(colaborators.some?.(c => c._id === user)||owner._id==user?"Nueva colección": "Participar")
                            // TODO: si el usuario logueado... participa y tiene alguna coleccion creada...
                            setView("/collection-create", {spaceId: space._id});
                        }}>
                            {colaborators.some?.(c => c._id === user)||owner._id===user?"Nueva colección": "Participar"} </Button>
                    </div>
                </div>

            </div>
            {collectibles.map((collectible) => <MiniCollectibleCard collectible={collectible}/> )}
            <div className="loadContent full flex-col"> Loading... </div>
        </div>

    );
}

export default Space;