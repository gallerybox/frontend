import React, {ReactElement, useState, useEffect, useContext} from 'react';
import {ViewContext} from "../views/router";

interface OptionalChildrenProps {
    children?: ReactElement;
}

function Content(){
    let View: React.FC = useContext(ViewContext);


    return (
        <div className="Content">
                <View/>
        </div>
    );
}

export default Content;