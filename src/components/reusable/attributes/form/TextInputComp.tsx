import React, {useState, useEffect, ReactElement} from 'react';
import {DynamicRepresentation} from "../../../../repositories/ValueObjects";
import {TextareaAutosize, TextField} from "@mui/material";
import {ThematicSpaceDTO} from "../../../../repositories/ThematicSpaceRepository";



export interface TextInputCompProps{
    tag: string;
    value: any;
    representation: DynamicRepresentation;
    //setter?: React.Dispatch<React.SetStateAction<{[p: string]: any}>>;
    updateValue: Function;
    errorsByTag: {[error: string]: {[error: string]: string}};

}

export const TextInputComp: React.FC<TextInputCompProps> =  function ({tag, value,representation, updateValue, errorsByTag}: TextInputCompProps){

    return (
        <TextareaAutosize
            placeholder={tag}
            value={value}
            onChange={(e) => {
                if(e && e.target) {
                   updateValue(tag, e.target.value);
                }
            }}
            name={tag}
            id={tag}
            minRows={2}
            style={{ width: "80%"}}
            maxLength={2000}
        />


    );

}

export default TextInputComp;