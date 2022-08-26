import React from 'react';
import {Category, DynamicRepresentation, DynamicType} from "../../../../repositories/ValueObjects";
import {TextInputComp, TextInputCompProps} from "./TextInputComp";
import MultimediaInputComp from "./MultimediaInputComp";
import ToggleInputComp from "./ToggleInputComp";

interface InputProps{
    tag: string;
    value: any;
    attribute: DynamicType;
    updateValue: Function;
    //setter: React.Dispatch<React.SetStateAction<{[p: string]: any}>>;
    className?: string;
}

function Input({tag, value, attribute, updateValue, className=""}: InputProps){
    const representation: DynamicRepresentation = attribute.representation;
    let Input: React.FC<TextInputCompProps>;
    let way_to_show_tag: string = "flex-text-row";

    switch (attribute.category) {
        case Category.Multimedia:
            Input = TextInputComp;
            way_to_show_tag = "flex-col";
            break;
        case Category.Text:
            Input = TextInputComp;

            break;
        case Category.Toggle:
            Input = TextInputComp;
            break;
    }

    return (
        <div className={"Input " + " " +className} style={{order: attribute.representationOrder}}>
            <span className={attribute.showTag?"":"invisible"}>{tag}:&nbsp;</span>
            <Input value={value} tag={tag} updateValue={updateValue}/>
        </div>
    );
}

export default Input;