import React, {useState, useEffect, ReactElement} from 'react';

import {CollectibleDTO} from "../../repositories/CollectibleRepository";

interface LinkProps{
    text: string;
    onClickAction: Function;
}

function Link({text, onClickAction}: LinkProps){

    return (
        <span className="Link clickable" onClick={()=>onClickAction()}>{text}</span>
    );
}

export default Link;