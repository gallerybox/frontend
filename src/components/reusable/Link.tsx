import React, {useState, useEffect, ReactElement} from 'react';

import {CollectibleDTO} from "../../repositories/CollectibleRepository";

interface LinkProps{
    text: string;
    onClickAction: Function;
    className?: string;
}

function Link({text, onClickAction, className=""}: LinkProps){

    return (
        <span className={"Link clickable"+" "+className} onClick={()=>onClickAction()}>{text}</span>
    );
}

export default Link;