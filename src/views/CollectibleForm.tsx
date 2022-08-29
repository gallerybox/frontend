import React, {useState, useEffect, ReactElement, useContext, useCallback, useRef, LegacyRef} from 'react';


import {Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, Button} from '@mui/material';
import {MoreVert} from '@mui/icons-material'
import {CollectibleDTO, CollectibleRepository} from "../repositories/CollectibleRepository";
import {RouterContext} from "./router";
import Attribute from "../components/reusable/attributes/Attribute";
import Link from "../components/reusable/Link";
import {TokenContext, UserContext} from "../Auth";
import {DynamicType, Response} from "../repositories/ValueObjects";

import AttributeForm from "../components/reusable/attributesForm/AttributeFormComp";
import DynamicAttributeForm from "../components/reusable/attributes/form/DynamicAttributeForm";
import {AttributeDTO, ThematicSpaceDTO, ThematicSpaceRepository} from "../repositories/ThematicSpaceRepository";



interface CollectibleFormProps{
    collectibleId?: string | undefined;
    spaceId?: string | undefined;
}

const CollectibleForm: React.FC<CollectibleFormProps> = ({collectibleId=undefined, spaceId=undefined}: CollectibleFormProps) => {
    const setView = useContext(RouterContext);
    const [loggedUserId, setLoggedUserId] = useContext(UserContext);
    const [token, setToken] = useContext(TokenContext);
    const [collectible, setCollectible] = useState<Response<CollectibleDTO>>({attributes: {}});
    const [space, setSpace] = useState<Response<ThematicSpaceDTO>>()
    const [errors, setErrors] = useState<{[error: string]: string}>({});
    const [values, setValues] = useState<{[tag: string]: any}>({});
    const [spaceAttributes, setSpacesAttributes]= useState<{[tag: string]: AttributeDTO}>({});
    const [submitEvent,setSubmitEvent] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    //const [formRef, setFormRef] = useState<HTMLFormElement | null>(null);
    function updateValue(tag: string, newValue: any){
        setValues(current => {
            current[tag] = newValue;
            const next: {[tag: string]: any} = {};
            Object.assign(next, current); // Hay que crear un objeto nuevo para que cambie la referencia del objeto y react detecte el cambio y vuelva a renderizar.
            return next;
        })
    }

    CollectibleRepository.token.value = token;
    ThematicSpaceRepository.token.value = token;
    useEffect( () =>{
        if (collectibleId){
            CollectibleRepository.findOne(collectibleId).then(data =>{
                if (data){
                    setCollectible(data);
                    const initalValues: {[tag: string]: any} = {};
                    Object.keys(data.attributes).forEach(tag =>{
                       initalValues[tag] =  data.attributes[tag].value;
                    });
                    setValues(initalValues);
                }else{
                    setView("/not-found");
                }

            })
        }else if(spaceId){
            ThematicSpaceRepository.getSpaceById(spaceId).then(data =>{
                if (data && data.template){
                    setSpace(data);
                    const initalValues: {[tag: string]: any} = {};
                    const initalAttributes: {[tag: string]: AttributeDTO} = {};

                    data.template.attributes.forEach(attribute =>{
                        initalValues[attribute.tag] = null;
                        initalAttributes[attribute.tag] = attribute;
                    });
                    console.log(JSON.stringify(data));
                    setSpacesAttributes(initalAttributes);
                    setValues(initalValues);
                }else{
                    setView("/not-found");
                }

            })
        }
        else {
            setView("/not-found");
        };

    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitEvent(current => true);
    };

    useEffect(()=>{
        if(formRef && formRef.current && submitEvent){
            const formData = new FormData(formRef.current as HTMLFormElement);
            // @ts-ignore
            for (const pair of formData.entries()) {
                if(pair[0].endsWith("#NoEdit#")){
                    formData.append(pair[0].split("#NoE")[0], values[pair[0].split("#NoE")[0]]);
                }

            }
            CollectibleRepository.upsertCollectible(formData).then( response =>{
                    setView("/collectible",{collectibleId: response.data._id});
                }
            );
            console.log("Entrar entramos");
        }

/*
        const formElement: any = document.getElementById("formularitoYeah");
        const formData2 = new FormData(formElement);
        formData2.forEach(meh=>console.log(meh));
*/

        /*
        const formData3 = new FormData();
        Object.keys(values).forEach(tag=>formData3.append(tag, values[tag]));
        formData3.forEach(meh=>console.log());

*/

    },[submitEvent]);

    return (

        <div className="Collectible flex-col full" >
            <div className="flex-col halfable" style={{background:"white", color: "black"}}>

                    <header className="flex-row full-margin bold big-font">
                        {   collectibleId && spaceId==undefined &&
                            <span className={collectible?.thematicSpace?"clickable":""} style={collectible?.thematicSpace?{}:{textDecoration: "line-through"}} onClick={collectible?.thematicSpace?()=>setView("/space",{spaceId:collectible.thematicSpace?._id}):()=>0}>{collectible?.thematicSpace?collectible.thematicSpace.name:"Espacio desaparecido"}</span>
                        }
                        {   spaceId && collectibleId==undefined &&
                            <span className={space?"clickable":""} style={space?{}:{textDecoration: "line-through"}} onClick={space?()=>setView("/space",{spaceId:space?._id}):()=>0}>{space?space.name:"Espacio desaparecido"}</span>
                        }
                    </header>



                <form ref={formRef} className="flex-col full" onSubmit={e => handleSubmit(e)}>
                    <input className="invisible" name="collectibleId" value={collectibleId}/>
                    <input className="invisible" name="thematicSpaceId" value={spaceId}/>
                    <input className="invisible" name="userId" value={loggedUserId}/>
                    <div className="flex-col full-margin">
                        { collectibleId && spaceId==undefined &&
                            Object.keys(values!).sort((tag1,tag2) => collectible?.attributes![tag1].representationOrder!-collectible?.attributes![tag2].representationOrder!).map(
                                tag => {
                                    const attri = collectible?.attributes?.[tag] as DynamicType;
                                    return ( <DynamicAttributeForm className="full-margin"
                                                                   category={attri.category}
                                                                   representation={attri.representation}
                                                                   representationOrder={attri.representationOrder}
                                                                   showTag={attri.showTag}
                                                                   tag={tag} value={values[tag]}
                                                                   updateValue={updateValue} />);
                                }
                            )

                        }
                        {   spaceId && collectibleId==undefined &&
                            Object.keys(values!).sort((tag1,tag2) => spaceAttributes[tag1].representationOrder-spaceAttributes[tag2].representationOrder).map(
                                tag => {

                                    return ( <DynamicAttributeForm className="full-margin"
                                                                   category={spaceAttributes[tag].type.category}
                                                                   representation={spaceAttributes[tag].type.representation}
                                                                   representationOrder={spaceAttributes[tag].representationOrder}
                                                                   showTag={spaceAttributes[tag].showTag}
                                                                   tag={tag} value={values[tag]}
                                                                   updateValue={updateValue} />);
                                }
                            )

                        }
                    </div>

                    <div className="flex-text-row flex-row-space full-margin">
                        <div style={{width: "1px", height: "1px"}}></div>
                        <Button type="submit" variant="contained" color="primary"> Guardar </Button>
                    </div>
                </form>
            </div>


        </div>
    );
}

export default CollectibleForm;