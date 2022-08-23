import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useContext } from "react";
import { handleMultimediaSize, handleMultimediaType } from "./store/actions";
import AttributeContext from "./store/attributeContext";

const MultimediaEditAttributeComp: React.FC = () => {
    const [state, dispatch]  = useContext(AttributeContext);

    const reverseMapDimensionsToText: {[width: number]: string} = {
        50: "Pequenyo",
        75: "Mediano",
        100: "Grande"
    }
    return (
        <div>
            <h2>Configuración del atributo Multimedia</h2>
            
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Medio</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    label="Medio"
                    defaultValue="Photo"
                    value={state.representation.multimediaType}
                    >
                    <MenuItem value="Audio"  onClick={(e) => dispatch( handleMultimediaType("Audio"))}>Audio</MenuItem>
                    <MenuItem value="Video"  onClick={(e) => dispatch( handleMultimediaType("Video"))}>Video</MenuItem>
                    <MenuItem value="Photo"  onClick={(e) => dispatch( handleMultimediaType("Photo"))}>Foto</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Tamaño</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    label="Tamanyo"
                    defaultValue="Grande"
                    value = {reverseMapDimensionsToText[state.representation.dimensions[0]]}
                    >
                    <MenuItem value="Pequenyo"  onClick={(e) => dispatch( handleMultimediaSize("Pequenyo"))}>Pequeño</MenuItem>
                    <MenuItem value="Mediano"   onClick={(e) => dispatch( handleMultimediaSize("Mediano"))}>Mediano</MenuItem>
                    <MenuItem value="Grande"    onClick={(e) => dispatch( handleMultimediaSize("Grande"))}>Grande</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

export default MultimediaEditAttributeComp;