import Spaces from "./Spaces";
import MainViewTimeline from "./MainViewTimeline";
import Collections from "./Collections";
import React, {ReactElement, useCallback, useReducer, useState} from "react";




const routes: {[view: string]: React.FC} = {
    "spacesOwned": () => Spaces({ownSpaces:true}),
    "spacesFollowed": () => Spaces({ownSpaces:false}),
    "mainViewTimeline": MainViewTimeline,
    "collections": Collections
}

export let RouterContext: React.Context<any> = React.createContext(null);
export let ViewContext: React.Context<React.FC> = React.createContext(MainViewTimeline);
export function RouterContextProvider({children}: any){
    const [route, setRoute] = useState("mainViewTimeline");
    const View: React.FC = routes[route];
    return (
        <RouterContext.Provider value={setRoute}>
            <ViewContext.Provider value={View}>
                {children}
            </ViewContext.Provider>
        </RouterContext.Provider>
    )
}









