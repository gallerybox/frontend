import React from 'react';
import {DynamicRepresentation, DynamicType} from "../../../repositories/ValueObjects";
import { StarRateSharp, Bookmark, Favorite } from '@mui/icons-material';
import {SvgIconTypeMap} from "@mui/material";
import {OverridableComponent} from "@mui/material/OverridableComponent";

export interface ToggleRepresentationCompProps{
    value: string
    representation: DynamicRepresentation;
}

export const ToggleRepresentationComp: React.FC<ToggleRepresentationCompProps> =  function ({value, representation}: ToggleRepresentationCompProps){
    const textToIcon: {[iconName:string]: React.FC} = {
        "Favorite": ()=> <Favorite fontSize='inherit' color='inherit'/>,
        "Bookmark": ()=> <Bookmark fontSize='inherit' color='inherit'/>,
        "Star": ()=> <StarRateSharp fontSize='inherit' color='inherit'/>
    };
    console.log("icon")
    console.log(representation.icon)
    const Icon: React.FC = textToIcon[representation.icon!];
    return (

        <div className="flex-row" style={{fontSize: "2rem",color: value?representation.colorTrue: representation.colorFalse}}>
            <Icon/>
        </div>

    );

}

export default ToggleRepresentationComp;