import React, {useState, useEffect, ReactElement} from 'react';

import {DynamicRepresentation, DynamicType} from "../../../repositories/ValueObjects";

export interface TextRepresentationCompProps{
    value: string
    representation: DynamicRepresentation;
}

export const TextRepresentationComp: React.FC<TextRepresentationCompProps> =  function ({value, representation}: TextRepresentationCompProps){

    return (

        <span style={
            {
                color: representation.color,
                fontSize: representation.size,
                fontStyle: representation.italics? "normal":"italic",
                fontWeight: representation.bold? "normal":"bold",
                fontFamily: representation.font
            }
        }>
            {value}
        </span>

    );

}

export default TextRepresentationComp;