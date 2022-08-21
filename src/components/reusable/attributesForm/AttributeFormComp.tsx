import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import AttributeContext from "./store/attributeContext";
import {useContext, useEffect, useReducer, useState} from "react";
import { INITIAL_STATE } from "./store/initialState"
import { reduceAttribute } from "./store/reduceAttribute";
import { 
    handleInputText,
    handleShowTag,
    handleSelectText,
    handleSelectMultimedia,
    handleSelectToogle
} from "./store/actions";

import MultimediaEditAttributeComp from "./MultimediaEditAttributeComp";
import TextEditAttributeComp from "./TextEditAttributeComp";
import ToogleEditAttributeComp from "./ToogleEditAttributeComp";
import {AttributeDTO, ThematicSpaceDTO, ThematicSpaceRepository} from "../../../repositories/ThematicSpaceRepository";
import {Response} from "../../../repositories/ValueObjects";
import {TokenContext} from "../../../Auth";
import {RouterContext} from "../../../views/router";
interface AttributeFormProps{
    spaceId: string;
}
const AttributeForm: React.FC<AttributeFormProps> = ({spaceId}:AttributeFormProps) => {
    console.log("Id que llega al attribute form", spaceId);
    const [token,setToken] = useContext(TokenContext);
    const setView = useContext(RouterContext);
    const [state, dispatch] = useReducer(reduceAttribute, INITIAL_STATE);
    const [space, setSpace] = useState<Response<ThematicSpaceDTO>>({});

    // Bloqueo el comportamiento por defecto del submit (para que lo gestione React)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>, space: ThematicSpaceDTO) => {
        e.preventDefault();
        alert(JSON.stringify(state));
        addAttribute(state, space);
        ThematicSpaceRepository.upsertSpace(space).then( data => {
                setView("/space-form",{spaceId: data._id})
            }
        );
    };
    ThematicSpaceRepository.token.value = token;
    useEffect( () => {
            if (spaceId){
                ThematicSpaceRepository.getSpaceById(spaceId).then(data=>{
                    if(!data._id){
                        setView("/not-found");
                    }else{
                        setSpace(data);
                    }
                });
            } else {
                setView("/not-found");
            };

        }, []);

    const addAttribute: Function = (newAttribute: AttributeDTO, space: ThematicSpaceDTO) => {
        let attributes = space!.template!.attributes!.filter(attribute => attribute.tag == newAttribute.tag);
        if (attributes.length>0){
            attributes.map(attribute=>{
                if (attribute.tag == newAttribute.tag){
                    return newAttribute;
                }else{
                    return attribute;
                }
            })
        }else{
            attributes.push(newAttribute);
        }
        space!.template!.attributes = attributes;
        const newSpace: ThematicSpaceDTO= JSON.parse(JSON.stringify(space));
        setSpace(newSpace);

    }

    return ( 
        <AttributeContext.Provider value={[state, dispatch]}>
            <div className="Login halfable flex-col-center">
            <form className="flex-col full" onSubmit={e => handleSubmit(e, space as ThematicSpaceDTO)}>
                <h2>Nuevo atributo</h2>

                <TextField  type="text" id="tag" name="tag" label="Etiqueta"
                            value={state.tag} onChange={ e => dispatch( handleInputText(e) ) } 
                            margin="normal"
                />

                <FormControlLabel
                            label="¿Mostrar la etiqueta?"
                            value={state.showTag}
                            name="showTag"
                            control={
                                <Checkbox   value={state.showTag}
                                            name="showTag"
                                            checked={state.showTag}
                                            onChange={ e => dispatch( handleShowTag(e) ) }/>
                                    }
                            />

                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">Tipo</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        label="Age"
                        >
                        <MenuItem value="Text"       onClick={(e) => dispatch( handleSelectText(e))}>Text</MenuItem>
                        <MenuItem value="Multimedia" onClick={(e) => dispatch( handleSelectMultimedia(e))}>Multimedia</MenuItem>
                        <MenuItem value="Toogle"     onClick={(e) => dispatch( handleSelectToogle(e))}>Toogle</MenuItem>
                    </Select>
                </FormControl>
                <div>
                    {state.category === "Text" && <TextEditAttributeComp />}
                    {state.category === "Multimedia" && <MultimediaEditAttributeComp/>}
                    {state.category === "Toogle" && <ToogleEditAttributeComp/>}
                </div>
                <Button type="submit" variant="contained" color="primary"> Guardar </Button>
                
                </form>
            </div>
        </AttributeContext.Provider>
    )
}

export default AttributeForm;