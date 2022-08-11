import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from "@mui/material";
import { useContext, useReducer } from "react";
import { HexColorPicker } from "react-colorful";
import { handleTextBold, handleTextColor, handleTextItalics, handleTextLargeText, handleTextSize, handleTextUnderlined } from "./store/actions";
import AttributeContext from "./store/attributeContext";


const TextEditAttributeComp: React.FC = () => {
    const [state, dispatch]  = useContext(AttributeContext);

    return (<div>
        <h2>Configuración del atributo Texto</h2>
        <FormControlLabel
            label="Negrita"
            value={state.representation.bold}
            name="bold"
            control={
                <Checkbox   value={state.representation.bold}
                            name="bold"
                            checked={state.representation.bold}
                            onChange={ e => dispatch(handleTextBold(e)) }/>
                    }
            />
        <FormControlLabel
            label="Cursiva"
            value={state.representation.italics}
            name="italics"
            control={
                <Checkbox   value={state.representation.italics}
                            name="italics"
                            checked={state.representation.italics}
                            onChange={ e => dispatch(handleTextItalics(e)) }/>
                    }
        />
        <FormControlLabel
            label="Subrayado"
            value={state.representation.underlined}
            name="underlined"
            control={
                <Checkbox   value={state.representation.underlined}
                            name="underlined"
                            checked={state.representation.underlined}
                            onChange={ e => dispatch(handleTextUnderlined(e))}/>
                    }
        />


        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Tamaño</InputLabel>
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                label="Tamanyo"
                >
                <MenuItem value="Pequenyo"  onClick={(e) => dispatch( handleTextSize("Pequenyo"))}>Pequeño</MenuItem>
                <MenuItem value="Mediano"   onClick={(e) => dispatch( handleTextSize("Mediano"))}>Mediano</MenuItem>
                <MenuItem value="Grande"    onClick={(e) => dispatch( handleTextSize("Grande"))}>Grande</MenuItem>
            </Select>
        </FormControl>

        <FormControlLabel
            label="Texto largo"
            value={state.representation.underlined}
            name="largeText"
            control={
                <Checkbox   value={state.representation.largeText}
                            name="largeText"
                            checked={state.representation.largeText}
                            onChange={ e => dispatch(handleTextLargeText(e))}/>
                    }
        />

        <HexColorPicker color={state.representation.color} onChange={ e => dispatch(handleTextColor(e)) }/> 
        <label id="color"> {state.representation.color} </label>
     </div>
    )
}

export default TextEditAttributeComp;