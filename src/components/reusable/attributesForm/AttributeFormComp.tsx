import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import AttributeContext from "./store/attributeContext";
import {useReducer, useState} from "react";
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
import {ThematicSpaceDTO, ThematicSpaceRepository} from "../../../repositories/ThematicSpaceRepository";
import {Response} from "../../../repositories/ValueObjects";
import {TokenContext} from "../../../Auth";
interface AttributeFormProps{
    spaceId: string;
}
const AttributeForm: React.FC<AttributeFormProps> = ({spaceId}:AttributeFormProps) => {
    console.log("Id que llega al attribute form", spaceId);
    const [token,setToke] = useContext(TokenContext);
    const [state, dispatch] = useReducer(reduceAttribute, INITIAL_STATE);
    const [space, setSpace] = useState<Response<ThematicSpaceDTO>>({});
    // Bloqueo el comportamiento por defecto del submit (para que lo gestione React)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();    
        alert(JSON.stringify(state));         
    };
    ThematicSpaceRepository.token.value = token;
    useEffect( () = {

        }, [])
    return ( 
        <AttributeContext.Provider value={[state, dispatch]}>
            <div className="Login halfable flex-col-center">
            <form className="flex-col full" onSubmit={e => handleSubmit(e)}>
                <h2>Nuevo atributo</h2>

                <TextField  type="text" id="tag" name="tag" label="Etiqueta"
                            value={state.tag} onChange={ e => dispatch( handleInputText(e) ) } 
                            margin="normal" />

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