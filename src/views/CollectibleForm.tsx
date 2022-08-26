import React, {useState, useEffect, ReactElement, useContext, useCallback} from 'react';


import {Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography } from '@mui/material';
import {MoreVert} from '@mui/icons-material'
import {CollectibleDTO, CollectibleRepository} from "../repositories/CollectibleRepository";
import {RouterContext} from "./router";
import Attribute from "../components/reusable/attributes/Attribute";
import Link from "../components/reusable/Link";
import {TokenContext} from "../Auth";
import {DynamicType, Response} from "../repositories/ValueObjects";
import Input from "../components/reusable/attributes/form/Input";



interface CollectibleFormProps{
    collectibleId: string;
}

const CollectibleForm: React.FC<CollectibleFormProps> = ({collectibleId}: CollectibleFormProps) => {
    const setView = useContext(RouterContext);
    const [token, setToken] = useContext(TokenContext);
    const [collectible, setCollectible] = useState<Response<CollectibleDTO>>({attributes: {}});
    const [errors, setErrors] = useState<{[error: string]: string}>({});
    const [values, setValues] = useState<{[tag: string]: any}>({});


    function updateValue(tag: string, newValue: any){
        setValues(current => {
            current[tag] = newValue;
            const next: {[tag: string]: any} = {};
            Object.assign(next, current); // Hay que crear un objeto nuevo para que cambie la referencia del objeto y react detecte el cambio y vuelva a renderizar.
            return next;
        })
    }

    CollectibleRepository.token.value = token;
    useEffect( () =>{
        if (collectibleId){
            CollectibleRepository.findOne(collectibleId).then(data =>{
                console.log(JSON.stringify(data));
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
        }else {
            setView("/not-found");
        };

    }, [])


    return (

        <div className="Collectible flex-col full" >
            <div className="flex-col halfable-margin" style={{background:"white", color: "black"}}>
                <header className="flex-row full-margin bold big-font">
                    <span className={collectible?.thematicSpace?"clickable":""} style={collectible?.thematicSpace?{}:{textDecoration: "line-through"}} onClick={collectible?.thematicSpace?()=>setView("/space",{spaceId:collectible.thematicSpace?._id}):()=>0}>{collectible?.thematicSpace?collectible.thematicSpace.name:"Espacio desaparecido"}</span>
                </header>
                <div className="flex-col full-margin">
                    {
                        Object.keys(values!).sort((tag1,tag2) => collectible?.attributes![tag1].representationOrder!-collectible?.attributes![tag2].representationOrder!).map(
                            tag => {
                                return ( <Input className="full-margin" attribute={ collectible?.attributes?.[tag] as DynamicType} tag={tag} value={values[tag]} updateValue={updateValue} />);
                            }
                        )

                    }
                </div>
            </div>


        </div>
    );
}

export default CollectibleForm;