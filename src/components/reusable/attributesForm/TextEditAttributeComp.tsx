import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from "@mui/material";
import { useContext, useReducer } from "react";
import { HexColorPicker } from "react-colorful";
import { handleTextBold, handleTextColor, handleTextItalics, handleTextSize, handleTextUnderlined } from "./store/actions";
import AttributeContext from "./store/attributeContext";
import {TEXT_SELECTOR_FONT} from "./store/actionTypes";
import {FontSize} from "./store/initialState";


const TextEditAttributeComp: React.FC = () => {
    const [state, dispatch]  = useContext(AttributeContext);
    const reverseMapFontSizes: {[key:number]: string}= {[FontSize.Pequenyo]: "Pequenyo" ,
                                                        [FontSize.Mediano]: "Mediano",
                                                        [FontSize.Grande]:"Grande"};

    let size: string | undefined = undefined;
    let font: string | undefined = undefined;
    if (state && state.representation ){
          if(state.representation.size){
              size = reverseMapFontSizes[state.representation.size as number]!;
          }
          if(state.representation.font){

              font = state.representation.font.split(",")[0].trim();
          }
    };
    console.log("la font, que pasa con la font")
    console.log(font)
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
                defaultValue="Mediano"
                value={size}

                >
                <MenuItem value="Pequenyo"  onClick={(e) => dispatch( handleTextSize("Pequenyo"))}>Pequeño</MenuItem>
                <MenuItem value="Mediano"   onClick={(e) => dispatch( handleTextSize("Mediano"))}>Mediano</MenuItem>
                <MenuItem value="Grande"    onClick={(e) => dispatch( handleTextSize("Grande"))}>Grande</MenuItem>
            </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Fuente</InputLabel>
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                label="Fuente"
                defaultValue='"Roboto"'
                value={font}
            >
                <MenuItem value='"Roboto"'  onClick={(e) => dispatch( {type:TEXT_SELECTOR_FONT , payload:'"Roboto"'})}>Roboto</MenuItem>
                <MenuItem value='"Roboto Serif"'  onClick={(e) => dispatch( {type:TEXT_SELECTOR_FONT , payload:'"Roboto Serif"'})}>Roboto Serif</MenuItem>
                <MenuItem value='"Roboto Mono"'  onClick={(e) => dispatch( {type:TEXT_SELECTOR_FONT , payload:'"Roboto Mono"'})}>Roboto Mono</MenuItem>
                <MenuItem value='"Rye"'  onClick={(e) => dispatch( {type:TEXT_SELECTOR_FONT , payload:'"Rye"'})}>Rye</MenuItem>
                <MenuItem value='"Gloria Hallelujah"'  onClick={(e) => dispatch( {type:TEXT_SELECTOR_FONT , payload:'"Gloria Hallelujah"'})}>Gloria Hallelujah</MenuItem>
                <MenuItem value='"Press Start 2P"'  onClick={(e) => dispatch( {type:TEXT_SELECTOR_FONT , payload:'"Press Start 2P"'})}>Press Start 2P</MenuItem>
            </Select>
        </FormControl>

        <HexColorPicker color={state.representation.color} onChange={ e => dispatch(handleTextColor(e)) }/> 
        <label id="color"> {state.representation.color} </label>
     </div>
    )
}

export default TextEditAttributeComp;