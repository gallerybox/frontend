import React, {useState, useEffect, useContext, useCallback} from 'react';
import {TokenContext, UserContext} from "../Auth";

import {CollectionDTO, UserRepository} from "../repositories/UserRepository";
import {DynamicType, Response} from "../repositories/ValueObjects";
import {RouterContext} from "./router";
import {CollectibleDTO} from "../repositories/CollectibleRepository";
import Link from "../components/reusable/Link";
import {Button, Box, LinearProgress} from "@mui/material";
import Attribute from "../components/reusable/attributes/Attribute";
import {ArrowBackIosNewSharp, ArrowForwardIosSharp, Share} from '@mui/icons-material';
import OverlayQRCode from "../components/reusable/popups/OverlayQRCode";

interface CollectionProps{
    collectionId: string;
}

const Collection: React.FC<CollectionProps> = function ({collectionId}: CollectionProps){
    const setView = useContext(RouterContext);
    const [token, setToken] = useContext(TokenContext);
    const [collection, setCollection] = useState<Response<CollectionDTO>>();
    const [collectibleIndex, setCollectibleIndex] = useState<number>();
    const [percentaje, setPercentaje] = useState<number>();
    const [collectible, setCollectible] = useState<Response<CollectibleDTO>>({attributes: {}});
    const [timeAgoString, setTimeAgoString] = useState("2 horas");
    const [overlayQRCodeView, setOverlayQRCodeView] = useState<{component: React.FC}>({component: ()=><OverlayQRCode  isInvisible={true} continueCallback={()=>0}/>});

    UserRepository.token.value = token;
    useEffect(() => {
        if (collectionId) {
            UserRepository.getCollectionById(collectionId)
                .then(data => {
                    if (data._id){
                        setCollection(data);
                        const collectibles = data.collectibles;

                        if (collectibles && collectibles.length>0){
                            setCollectibleIndex(0);
                            getCollectible(data as CollectionDTO,0);
                            setPercentaje(((0+1)/collectibles.length) * 100)
                        }
                    }else{
                        setView("/not-found");
                    }

                })
        } else {
            setView("/not-found");
        }
    },[]);

    function getCollectible(collection: CollectionDTO, index: number){
        if (index || index==0){

            const collectible = collection!.collectibles?.[index];
            setCollectible(collectible!);
            if (collectible) {
                let time_ago_number: number = Math.abs(Date.now() - new Date(collectible.lastModified).getTime()) / 36e5;
                let time_unit: string = " hora"

                if (time_ago_number < 1) {
                    time_ago_number = time_ago_number * 60;
                    time_unit = " minuto"
                } else if (time_ago_number > 23) {
                    time_ago_number = time_ago_number / 24;
                    time_unit = " día"
                }
                if (Math.round(time_ago_number) != 1) {
                    time_unit = time_unit + "s";
                }
                setTimeAgoString(Math.round(time_ago_number) + time_unit);

            }

        }else{
            return undefined;
        }
    }

    const memoDown = useCallback(
        () => {
            down(collectibleIndex as number);
        },
        [collectibleIndex],
    );

    function down(index: number){
        if (index!=0 && collection!.collectibles){
            console.log(index);
            setCollectibleIndex(index-1);
            getCollectible(collection as CollectionDTO,index-1);
            setPercentaje(((index)/collection!.collectibles.length) * 100)
        }
    }

    const memoUp = useCallback(
        () => {
            console.log("Holaaa")
            up(collectibleIndex as number);
        },
        [collectibleIndex],
    );

    function up(index: number){
        if (collection!.collectibles && index!=(collection!.collectibles.length-1)){
            setCollectibleIndex(index+1);
            getCollectible(collection as CollectionDTO,index+1);
            setPercentaje(((index+2)/collection!.collectibles.length) * 100)
        }
    }


    const handleShowQR = () => {

    }

    const OverlayQRCodeView: React.FC = overlayQRCodeView.component;
    return (
        <div className="Collection flex-col full" >
            <OverlayQRCodeView/>
            <div className="card flex-col halfable-margin" >
                    <header className="flex-row flex-row-space full-margin bold big-font">
                        <div className="flex-text-row">
                            <span className="bold">{collection?.name}</span>
                            <div>
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
                        <div className="flex-text-row">
                            <span className="bold">{collection?.collectibles?.length} coleccionables</span>
                        </div>
                    </header>

                    <footer className="flex-row flex-row-space full-margin">
                        <div className="flex-text-row ">
                            <span className="bold">Espacio:&nbsp;</span>
                            {
                                collection &&
                                collection?.thematicSpace?.name?
                                    <Link text={collection?.thematicSpace?.name? collection?.thematicSpace.name: ""} onClickAction={()=>setView("/collection", {spaceId: collection?.thematicSpace?._id})}/>
                                    : <span style={{textDecoration: "line-through"}}>Espacio desaparecido</span>
                            }

                        </div>
                        <div className="flex-text-row">
                            <Button variant="contained" color="primary" onClick={()=>setView("/collectible-form", {spaceId: collection?.thematicSpace?._id})}> Nuevo coleccionable </Button>
                        </div>
                    </footer>


            </div>
            {collectible && collectible._id && <>
            <div  onClick={()=>memoDown()} className="clickable invisible-mobile"  style={{color: "black", height: "50px", width: "50px", borderRadius: "50%", zIndex: 2, position: "absolute", left:  "calc(25% - 25px)", top: "calc(50% - 25px)", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <div>
                    <ArrowBackIosNewSharp/>
                    </div>
            </div>
            <div onClick={()=>memoUp()} className="clickable flex-col invisible-mobile" style={{ color: "black", height: "50px", width: "50px", borderRadius: "50%", zIndex: 2, position: "absolute", right:  "calc(25% - 25px)", top: "calc(50% - 25px)", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <div>
                        <ArrowForwardIosSharp/>
                    </div>
            </div>
            <div className="flex-col halfable-margin invisible-desktop">
                <div className="flex-row flex-row-space full">
                    <div onClick={()=>memoDown()} className="clickable flex-text-row" style={{ color: "black", height: "50px", width: "50px", borderRadius: "50%", zIndex: 2}}>
                        <div className="flex-col full">
                            <ArrowBackIosNewSharp/>
                        </div>
                    </div>
                    <div  onClick={()=>memoUp()} className="clickable flex-text-row" style={{ color: "black", height: "50px", width: "50px", borderRadius: "50%", zIndex: 2}}>
                        <div className="flex-col full">
                            <ArrowForwardIosSharp/>
                        </div>

                    </div>
                </div>
            </div>


            {collectible && collectible.attributes &&
                <>

                <div className="flex-row halfable-margin" style={{background:"white", color: "black" ,position: "relative",flexGrow:5}}>
                    <div className="flex-col full-margin">
                        {
                            Object.keys(collectible?.attributes!).sort((tag1,tag2) => collectible?.attributes![tag1].representationOrder!-collectible?.attributes![tag2].representationOrder!).map(
                                tag => {
                                    return ( <Attribute className="full-margin" attribute={ collectible?.attributes?.[tag] as DynamicType} tag={tag}/>);
                                }
                            )

                        }
                    </div>

                    <footer className="flex-row flex-row-space full-margin">
                        <div className="flex-text-row">
                            <span className="bold">Por:&nbsp;</span><Link text={collectible?.user?.nickname!} onClickAction={()=>setView("/user", {userId: collectible?.user?._id})}/>
                        </div>
                        <div className="flex-text-row">
                            <span>Hace&nbsp;</span><span>{timeAgoString}</span>
                        </div>
                    </footer>




                </div>

                <div className="flex-row halfable-margin">
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress variant="determinate" value={
                            percentaje? percentaje: 0
                        }  />

                    </Box>
                </div>
                </>
            }


                </>


            }

        </div>
    );
}

export default Collection;