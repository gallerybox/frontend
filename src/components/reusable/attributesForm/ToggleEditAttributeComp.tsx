import Favorite from '@mui/icons-material/Favorite';
import { useContext } from "react";
import AttributeContext from "./store/attributeContext";
import { FormControl, FormControlLabel, InputLabel, MenuItem, Select } from '@mui/material';
import { handleToggleIcon, handleToggleColorFalse, handleToggleColorTrue } from './store/actions';
import { HexColorPicker } from "react-colorful";
import { Bookmark, StarRateSharp } from '@mui/icons-material';

const ToggleEditAttributeComp: React.FC = (currentState) => {
    const [state, dispatch]  = useContext(AttributeContext);


    return (
        <div>
            <h2>Configuración del atributo Toggle</h2>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Aspecto</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    label="Aspecto"
                    defaultValue="Favorite"
                    value = {state.representation.icon}
                    >
                    <MenuItem value="Favorite"  onClick={(e) => dispatch( handleToggleIcon("Favorite"))}>Favorito</MenuItem>
                    <MenuItem value="Bookmark"  onClick={(e) => dispatch( handleToggleIcon("Bookmark"))}>Marcador</MenuItem>
                    <MenuItem value="Star"      onClick={(e) => dispatch( handleToggleIcon("Star"))}>Estrella</MenuItem>
                </Select>
            </FormControl>

                <FormControlLabel
                    label="Favorito"
                    control={
                        <Favorite style={{color: "#0000ff"}} />
                    }
                    />
                <FormControlLabel
                    label="Estrella"
                    control={
                        <StarRateSharp style={{color: "#0000ff"}} />
                    }
                    />
                <FormControlLabel
                    label="Bookmark"
                    control={
                        <Bookmark style={{color: "#0000ff"}}/>
                    }
                    />

            <HexColorPicker color={state.representation.colorTrue} onChange={ e => dispatch(handleToggleColorTrue(e)) }/> 
            <div>
                {state.representation.icon === "Favorite" && <Favorite style={{color: state.representation.colorTrue}} />}
                {state.representation.icon === "Bookmark" && <Bookmark style={{color: state.representation.colorTrue}} />}
                {state.representation.icon === "Star" && <StarRateSharp style={{color: state.representation.colorTrue}} />}
                <label>Icono seleccionado</label>
            </div>

            <HexColorPicker color={state.representation.colorFalse} onChange={ e => dispatch(handleToggleColorFalse(e)) }/> 
            <div>
                {state.representation.icon === "Favorite" && <Favorite style={{color: state.representation.colorFalse}} />}
                {state.representation.icon === "Bookmark" && <Bookmark style={{color: state.representation.colorFalse}} />}
                {state.representation.icon === "Star" && <StarRateSharp style={{color: state.representation.colorFalse}} />}
                <label>Icono no seleccionado</label>
            </div>

        </div>
    );
}

export default ToggleEditAttributeComp;