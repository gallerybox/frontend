import React, {useState} from 'react';

import { StarRateSharp, Bookmark, Favorite } from '@mui/icons-material';
import {SvgIconTypeMap} from "@mui/material";
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {DynamicRepresentation} from "../../../../repositories/ValueObjects";

export interface ToggleInputCompProps{
    tag: string;
    value: any;
    representation: DynamicRepresentation
    updateValue: Function;
}

export const ToggleInputComp: React.FC<ToggleInputCompProps> =  function ({tag, value, representation, updateValue}: ToggleInputCompProps){
    const [temporalValue, setTemporalValue] = useState<boolean>(value);

    const textToIcon: {[iconName:string]: React.FC} = {
        "Favorite": ()=> <Favorite fontSize='inherit' color='inherit'/>,
        "Bookmark": ()=> <Bookmark fontSize='inherit' color='inherit'/>,
        "Star": ()=> <StarRateSharp fontSize='inherit' color='inherit'/>
    };


    const Icon: React.FC = textToIcon[representation.icon!];
    return (

        <div className="flex-row clickable"
             style={{fontSize: "2rem",color: temporalValue?representation.colorTrue: representation.colorFalse}}
             onClick={() => {
                 updateValue(tag, !temporalValue);
                 setTemporalValue(!temporalValue)
             }}
        >
            <input className="invisible" id={tag} name={tag} value={temporalValue?"#123true#":"#123false#"}/>
            <Icon/>
        </div>

    );

}

export default ToggleInputComp;