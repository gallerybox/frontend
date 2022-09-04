import React from 'react';
import {Category, DynamicRepresentation, DynamicType} from "../../../../repositories/ValueObjects";
import {TextInputComp, TextInputCompProps} from "./TextInputComp";
import MultimediaInputComp from "./MultimediaInputComp";
import ToggleInputComp from "./ToggleInputComp";

interface DynamicAttributeFormProps{
    tag: string;
    value: any;

    category: string;
    representation: DynamicRepresentation;
    representationOrder: number;
    showTag: boolean;

    updateValue: Function;

    errorsByTag: {[error: string]: {[error: string]: string}};
    //setter: React.Dispatch<React.SetStateAction<{[p: string]: any}>>;
    className?: string;
}

function DynamicAttributeForm({tag, value, category, representation, representationOrder, showTag, updateValue, errorsByTag, className=""}: DynamicAttributeFormProps){

    let Input: React.FC<TextInputCompProps>=TextInputComp;
    let wayToShow = " flex-col-start ";
    let width = "full"
    switch (category) {
        case Category.Multimedia:
            Input = MultimediaInputComp;
            break;
        case Category.Text:
            Input = TextInputComp;
            break;
        case Category.Toggle:
            Input = ToggleInputComp;
            wayToShow = " flex-text-row ";
            width = "";
            break;
    }

    return (
        <div className={"Input " + wayToShow +className} style={{order: representationOrder}}>
            <label htmlFor={tag} className={showTag?"margin":"invisible"}>{tag}:&nbsp;</label>
            <div className={"margin "+ width}>
                <Input value={value} tag={tag} updateValue={updateValue} representation={representation} errorsByTag={errorsByTag}/>
            </div>
        </div>
    );
}

export default DynamicAttributeForm;