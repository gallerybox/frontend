import React, {useState, useEffect, ReactElement} from 'react';
import {DynamicRepresentation} from "../../../../repositories/ValueObjects";
import {TextareaAutosize, TextField} from "@mui/material";
import {ThematicSpaceDTO} from "../../../../repositories/ThematicSpaceRepository";



export interface TextInputCompProps{
    tag: string;
    value: string;
    //setter?: React.Dispatch<React.SetStateAction<{[p: string]: any}>>;
    updateValue: Function;
}

export const TextInputComp: React.FC<TextInputCompProps> =  function ({tag, value, updateValue}: TextInputCompProps){

    return (
        <TextareaAutosize
            placeholder={tag}
            value={value} onChange={(e) => {
            if(e && e.target) {
                updateValue(tag, e.target.value);
            }
        }} name="description"
            minRows={2}
            style={{ width: "80%"}}
        />


    );

}

export default TextInputComp;