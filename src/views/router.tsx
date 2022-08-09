import Spaces from "./Spaces";
import MainViewTimeline from "./MainViewTimeline";
import Collections from "./Collections";
import React, {ReactElement, useCallback, useContext, useEffect, useReducer, useState} from "react";
import Users from "./Users";
import Register from "../components/Register";
import Login from "../components/Login";
import {TokenContext} from "../Auth";




const routes: {[view: string]: React.FC<any>} = {
    "spacesOwned": () => Spaces({ownSpaces:true}),
    "spacesFollowed": () => Spaces({ownSpaces:false}),
    "mainViewTimeline": MainViewTimeline,
    "collections": Collections,
    "users": Users,
    "register": Register,
    "login": Login
}



export let RouterContext: React.Context<any> = React.createContext(MainViewTimeline);
export let ViewContext: React.Context<React.FC> = React.createContext(Login);
export function RouterContextProvider({children}: any){

    const [token,setToken] = useContext(TokenContext);
    const [route, setRoute] = useState<string>('mainViewTimeline');
    useEffect(()=>{
            if (!token) {
                setRoute("login")
            }else{
                setRoute("mainViewTimeline")
            }
        }
    , [token]);

    const [props, setProps] = useState<{[prop: string]: any}>({});

    const setRouteWithParams: Function = (route: string, props :{[prop: string]: any}={}) =>{
        setRoute(route);
        setProps(props);
    }

    let View: React.FC = ()=>routes[route](props);


    return (
            <RouterContext.Provider value={setRouteWithParams}>
                <ViewContext.Provider value={View}>
                    {children}
                </ViewContext.Provider>
            </RouterContext.Provider>
        )

}









