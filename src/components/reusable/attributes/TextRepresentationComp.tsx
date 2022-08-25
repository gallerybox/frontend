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
                fontStyle: representation.italics? "italic":"normal",
                fontWeight: representation.bold? "bold":"normal",
                textDecoration: representation.underlined?"underline":"normal",
                fontFamily: representation.font
            }
        }>
            {value}
        </span>

    );

}

export default TextRepresentationComp;