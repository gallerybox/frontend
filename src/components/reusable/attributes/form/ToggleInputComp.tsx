import React from 'react';

import { StarRateSharp, Bookmark, Favorite } from '@mui/icons-material';
import {SvgIconTypeMap} from "@mui/material";
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {DynamicRepresentation} from "../../../../repositories/ValueObjects";

export interface ToggleInputCompProps{
    tag: string;
    value: boolean;
    representation: DynamicRepresentation
    updateValue: Function;
}

export const ToggleInputComp: React.FC<ToggleInputCompProps> =  function ({tag, value, representation, updateValue}: ToggleInputCompProps){
    const textToIcon: {[iconName:string]: React.FC} = {
        "Favorite": ()=> <Favorite fontSize='inherit' color='inherit'/>,
        "Bookmark": ()=> <Bookmark fontSize='inherit' color='inherit'/>,
        "Star": ()=> <StarRateSharp fontSize='inherit' color='inherit'/>
    };


    const Icon: React.FC = textToIcon[representation.icon!];
    return (

        <div className="flex-row" style={{fontSize: "2rem",color: value?representation.colorTrue: representation.colorFalse}}>
            <Icon/>
        </div>

    );

}

export default ToggleInputComp;