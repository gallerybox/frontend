import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import AttributeContext from "./store/attributeContext";
import {useCallback, useContext, useEffect, useReducer, useState} from "react";
import { INITIAL_STATE } from "./store/initialState"
import { reduceAttribute } from "./store/reduceAttribute";
import { 
    handleInputText,
    handleShowTag,
    handleSelectText,
    handleSelectMultimedia,
    handleSelectToggle
} from "./store/actions";

import MultimediaEditAttributeComp from "./MultimediaEditAttributeComp";
import TextEditAttributeComp from "./TextEditAttributeComp";
import ToggleEditAttributeComp from "./ToggleEditAttributeComp";
import {
    AttributeDTO,
    ThematicSpaceDTO,
    ThematicSpaceRepository,
    TypeDTO
} from "../../../repositories/ThematicSpaceRepository";
import {Category, DynamicType, Response} from "../../../repositories/ValueObjects";
import {TokenContext} from "../../../Auth";
import {RouterContext} from "../../../views/router";
import attribute from "../attributes/Attribute";
import Attribute from "../attributes/Attribute";
import {HANDLE_INPUT_TEXT, RESET_FULL_STATE} from "./store/actionTypes";
interface AttributeFormProps{
    spaceId: string;
    attributeToUpdateTag?: string
}
const AttributeForm: React.FC<AttributeFormProps> = ({spaceId, attributeToUpdateTag}:AttributeFormProps) => {
    console.log("Id que llega al attribute form", spaceId);
    const [token,setToken] = useContext(TokenContext);
    const setView = useContext(RouterContext);

    const [state, dispatch] = useReducer(reduceAttribute, INITIAL_STATE);
    const [space, setSpace] = useState<Response<ThematicSpaceDTO>>({});
    const [attributesLength,setAttributesLength] = useState(0);
    const [newAttributeForm, setNewAttributeForm] = useState<any>({})

    // Bloqueo el comportamiento por defecto del submit (para que lo gestione React)

    const [errors, setErrors] = useState<{[error: string]: string}>({});
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>, nAttrubutes: number) => {
        e.preventDefault();
        alert(JSON.stringify(state));
        if(state.tag){
            console.log("El json");
            console.log(JSON.stringify(dynamicTypeToAttributeMapper(state, nAttrubutes)));
            setNewAttributeForm(dynamicTypeToAttributeMapper(state, nAttrubutes));

        }else{
            setErrors(current => {
                current["mandatoryTag"] = "El atributo debe tener una etiqueta";
                const next: { [error: string]: string } = {};
                Object.assign(next, current); // Hay que crear un objeto nuevo para que cambie la referencia del objeto y react detecte el cambio y vuelva a renderizar.
                return next;
            })
        }
    };

    useEffect(() => {
        if (newAttributeForm.tag) {
            memoSaveAttribute();
        }
    },[newAttributeForm])

    const memoSaveAttribute = useCallback(
        () => {

            saveAttribute(newAttributeForm, space);
        },
        [newAttributeForm, space],
    );
    const saveAttribute: Function = (newAttribute: AttributeDTO, space: ThematicSpaceDTO) => {
        if (newAttribute.tag) {
            let attributes = space!.template!.attributes!.filter(attribute => attribute.tag == newAttribute.tag || attribute.tag == attributeToUpdateTag);
            console.log("Las tags");
            console.log(JSON.stringify(space.template), attributeToUpdateTag);
            if (attributes.length > 0) {
                attributes = space!.template!.attributes!.map(attribute => {
                    if (attribute.tag == newAttribute.tag || attribute.tag == attributeToUpdateTag) {
                        if (attribute.tag == attributeToUpdateTag){
                            newAttribute.representationOrder = attribute.representationOrder;
                            newAttribute.showInReducedView = attribute.showInReducedView;
                        }
                        return newAttribute;
                    } else {
                        return attribute;
                    }
                })
            } else {
                attributes = space!.template!.attributes!;
                attributes.push(newAttribute);
            }
            console.log("En add attributes")
            console.log(JSON.stringify(attributes));
            space!.template!.attributes = attributes;
            const newSpace: ThematicSpaceDTO = JSON.parse(JSON.stringify(space));
            console.log(JSON.stringify(newSpace));
            ThematicSpaceRepository.upsertSpace(newSpace).then(data => {
                    console.log("data")
                    console.log(JSON.stringify(data));
                    setView("/space-form", {spaceId: data._id})
                }
            );
        }
    }

    const dynamicTypeToAttributeMapper: Function = (dynamicType: any, nAtributtes: number) => {
        const category: Category = dynamicType.category;
        const type: TypeDTO = {
                category: category,
                representation: dynamicType.representation,
                _id: null
            };
        const attribute: AttributeDTO = {

            type: type,
            tag: dynamicType.tag,
            showTag: dynamicType.showTag,
            showInReducedView: false,
            representationOrder: nAtributtes
        }
        return attribute;
    };

    ThematicSpaceRepository.token.value = token;
    useEffect( () => {
            if (spaceId){
                ThematicSpaceRepository.getSpaceById(spaceId).then(data=>{
                    if(!data._id){
                        setView("/not-found");
                    }else{
                        setSpace(data);
                        setAttributesLength(data.template?.attributes!.length!);
                        const attributeToEdit = data.template?.attributes.filter(attribute => attribute.tag == attributeToUpdateTag);
                        if (attributeToEdit) {
                            const INITIAL_STATE_COPY = JSON.parse(JSON.stringify(INITIAL_STATE))
                            INITIAL_STATE_COPY.tag = attributeToEdit[0].tag;
                            INITIAL_STATE_COPY.category = attributeToEdit[0].type.category;
                            INITIAL_STATE_COPY.showTag = attributeToEdit[0].showTag;
                            INITIAL_STATE_COPY.representation = attributeToEdit[0].type.representation;
                            dispatch({type: RESET_FULL_STATE, payload: INITIAL_STATE_COPY});
                        }

                    }
                });
            } else {
                setView("/not-found");
            };

        }, []);



    return ( 
        <AttributeContext.Provider value={[state, dispatch]}>
            <div className="Login full flex-col">
                <form className="flex-col halfable-margin" onSubmit={e => handleSubmit(e, attributesLength)}>
                    <h2 className="flex-row full">Nuevo atributo</h2>
                    <div className="flex-col-start full">
                            <div className=" flex-text-row margin-row">
                                <TextField  type="text" id="tag" name="tag" label="Etiqueta"
                                            value={state.tag} onChange={ e => dispatch( handleInputText(e) ) }
                                            margin="normal"
                                            error={errors["mandatoryTag"]?true:false}
                                            helperText={errors["mandatoryTag"]?errors["mandatoryTag"]:""}
                                />
                            </div>
                            <div className ="flex-row full">

                                <div className="flex-text-row margin-row fle">
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
                                </div>

                            </div>

                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="demo-select-small">Tipo</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    label="Age"
                                    value={state["category"]}
                                    defaultValue="Text"
                                >
                                    <MenuItem value="Text"       onClick={(e) => dispatch( handleSelectText(e))}>Text</MenuItem>
                                    <MenuItem value="Multimedia" onClick={(e) => dispatch( handleSelectMultimedia(e))}>Multimedia</MenuItem>
                                    <MenuItem value="Toggle"     onClick={(e) => dispatch( handleSelectToggle(e))}>Toggle</MenuItem>
                                </Select>
                            </FormControl>
                            <div>
                                {state.category === "Text" && <TextEditAttributeComp />}
                                {state.category === "Multimedia" && <MultimediaEditAttributeComp/>}
                                {state.category === "Toggle" && <ToggleEditAttributeComp/>}
                            </div>

                        </div>

                    <Button type="submit" variant="contained" color="primary"> Guardar </Button>

                </form>
            </div>
        </AttributeContext.Provider>
    )
}

export default AttributeForm;