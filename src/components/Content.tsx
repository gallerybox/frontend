import React, {ReactElement, useState, useEffect, useContext} from 'react';
import {ViewContext} from "../views/router";

interface OptionalChildrenProps {
    children?: ReactElement;
}

function Content({children}: OptionalChildrenProps){
    let View: React.FC = useContext(ViewContext);
    if (children){
        View = ()=>children;
    }
    return (
        <div className="Content">
                <View/>
        </div>
    );
}

export default Content;