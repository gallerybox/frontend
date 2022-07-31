import React, {useState, useEffect} from 'react';
import ReducedCollectible from "../components/reusable/ReducedCollectible";
import {ThematicSpaceRepository} from "../repositories/ThematicSpaceRepository";



const Collections: React.FC = function (){
    const list: Array<number> = [1, 2]

    return (
        <div className="Collections full">
            <span>La collecciones</span>
        </div>
    );
}

export default Collections;