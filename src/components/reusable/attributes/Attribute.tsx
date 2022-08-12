import React from 'react';

import {Category, DynamicRepresentation, DynamicType} from "../../../repositories/ValueObjects";
import {TextRepresentationComp, TextRepresentationCompProps} from "./TextRepresentationComp";
import MultimediaRepresentationComp from "./MultimediaRepresentationComp";
import ToggleRepresentationComp from "./ToggleRepresentationComp";

interface AttributeProps{
    tag: string;
    attribute: DynamicType;
    className?: string;
}

function Attribute({tag, attribute, className=""}: AttributeProps){
    const representation: DynamicRepresentation = attribute.representation;
    let Representation: React.FC<TextRepresentationCompProps>;
    let way_to_show_tag: string = "flex-text-row";
    switch (attribute.category) {
        case Category.Multimedia:
            Representation = MultimediaRepresentationComp;
            way_to_show_tag = "flex-col";
            break;
        case Category.Text:
            Representation = TextRepresentationComp;
            way_to_show_tag = attribute.value.length>100? "flex-col":"flex-text-row";
            break;
        case Category.Toggle:
            Representation = ToggleRepresentationComp;
            break;
    }

    return (
        <div className={"Attribute " + way_to_show_tag + " " +className} style={{order: attribute.representationOrder}}>
            <span className={attribute.showTag?"":"invisible"}>{tag}:&nbsp;</span>
            <Representation value={attribute.value} representation={attribute.representation}/>
        </div>
    );
}

export default Attribute;