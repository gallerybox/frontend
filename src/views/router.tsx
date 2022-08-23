import Spaces from "./Spaces";
import MainViewTimeline from "./MainViewTimeline";
import Collections from "./Collections";
import React, {ReactElement, useCallback, useContext, useEffect, useReducer, useState} from "react";
import Users from "./Users";
import Register from "../components/Register";
import Login from "../components/Login";
import {TokenContext} from "../Auth";
import AttributeForm from "../components/reusable/attributesForm/AttributeFormComp";
import User from "./User";
import Space from "./Space";
import TermsAndConditions from "./TermsAndConditions";
import ForgotPassword from "./ForgotPassword";
import SpaceForm from "./SpaceForm";
import NotFound from "./not-found/NotFound";
import ResetPassword from "./ResetPassword";
import EditPersonalInformation from "./EditPersonalInformation";
import Collectible from "./Collectible";

/*
const routes: {[view: string]: React.FC<any>} = {
    "/spaces-owned": () => Spaces({ownSpaces:true}),
    "/spaces-followed": () => Spaces({ownSpaces:false}),
    "/space": Space,
    "/main-view-timeline": MainViewTimeline,
    "/collections": Collections,
    "/users": Users,
    "/user": User,
    "/register": Register,
    "/login": Login,
    "/space-attribute-form": AttributeForm,
    "/terms-and-conditions": TermsAndConditions,
    "/forgot-password": ForgotPassword,
    "/not-found": ()=>(<div style={{color: "black"}}><h1>Error 404, esta página no existe</h1></div>)
}
*/

const propsToQuery: Function = function (props: {[prop: string]: string|number|boolean}) {
    let query: string="";
    if (Object.keys(props).length>0){
        query = "?";
        Object.keys(props).forEach((prop: string) => {
           query = query +
                (query.slice(-1)=="?"?"":"&") + prop + "=" + JSON.stringify(props[prop]);
        });
        return query;
    }
    return query;
}

const routesNoAuth : {[view: string]: React.FC<any>} = {
    "/space": Space,
    "/collections": Collections,
    "/collectible": Collectible,
    "/users": Users,
    "/user": User,
    "/register": Register,
    "/login": Login,
    "/terms-and-conditions": TermsAndConditions,
    "/forgot-password": ForgotPassword,
    "/reset-password": ResetPassword,
    "/not-found": NotFound,//()=>(<div style={{color: "black"}}><h1>Error 404, esta página no existe</h1></div>)
    "/edit-personal-information": EditPersonalInformation,

}   
const routesAuth: {[view: string]: React.FC<any>} = {
    "/spaces-owned": () => Spaces({ownSpaces:true}),
    "/space-form": SpaceForm,
    "/spaces-followed": () => Spaces({ownSpaces:false}),
    "/main-view-timeline": MainViewTimeline,
    "/space-attribute-form": AttributeForm,
}

const routes : {[view: string]: React.FC<any>} = {...routesNoAuth, ...routesAuth};

let history: {[entry:number]: {route:string, props:string}}= {}

export let RouterContext: React.Context<any> = React.createContext(Login);
export let PathContext: React.Context<any> = React.createContext("Login");
export let ViewContext: React.Context<React.FC> = React.createContext(Login);
export function RouterContextProvider({children}: any){

    const urlRoute = window.location.pathname;

    const params = new URLSearchParams(window.location.search);
    const urlProps: {[param: string]: string|number|boolean} = {};
    params.forEach((value, param) => {
        urlProps[param] = JSON.parse(value);
    });


    if(Object.keys(history).length<=0 && localStorage.getItem("history")){
        history = JSON.parse(localStorage.getItem("history") as string);
        // Keeping contained size of history
        const historyLenght = Object.keys(history).length;
        const maxNEntries = 400;
        if (historyLenght>maxNEntries){
            let nDeletes = 0;
            for (const entry of Object.keys(history).sort(key=> key as unknown as number)){
                const n_entry = entry as unknown as number;
                delete history[n_entry];
                nDeletes +=1;
                if (nDeletes>= (historyLenght-maxNEntries)){
                    break;
                }
            }
            /*
            // Updating index of entries
            for (const entry of Object.keys(history).sort(key=> key as unknown as number)){
                const n_entry = entry as unknown as number;
                history[n_entry-nDeletes]= history[n_entry];
                delete history[n_entry];
            }
            */

            localStorage.setItem("history", JSON.stringify(history));
        }
    }

    const [props, setProps] = useState<{[prop: string]: any}>(urlProps);
    const [token,setToken] = useContext(TokenContext);
    const [route, setRoute] = useState<string>(urlRoute);

    const setRouteWithParams: Function = (newRoute: string, newProps :{[prop: string]: any}={}) =>{
        if((newRoute+JSON.stringify(newProps)) !== (route+JSON.stringify(props))){
            setRoute(newRoute);
            setProps(newProps);
            const entry: number = Object.keys(history).length!=0?Math.max(Object.keys(history).map(key=> key as unknown as number).sort(n=>-n)[0])+1:0;
            window.history.pushState({entry: entry}, "GalleryBox", newRoute+propsToQuery(newProps));
            console.log("Entry max");
            console.log(entry);
            history[entry]={route: newRoute, props: JSON.stringify(newProps)};
            localStorage.setItem("history", JSON.stringify(history));
        }
    }

    useEffect(() =>{

            const entry: number = Object.keys(history).length!=0?Math.max(Object.keys(history).map(key=> key as unknown as number).sort(n=>-n)[0])+1:0;
            history[entry]={route: route, props: JSON.stringify(props)};
            localStorage.setItem("history", JSON.stringify(history));
            window.history.pushState({entry: entry}, "GalleryBox", route+propsToQuery(props));
            console.log("entro");
            window.onpopstate = function(e){
                console.log("Broser dddddd");
                if(e.state){
                    console.log("Browser history")
                    console.log(e.state.entry);
                    const historyEntry = history[e.state.entry as unknown as number];
                    setRoute(historyEntry.route);
                    setProps(JSON.parse(historyEntry.props));
                }
            };
        },[])

    useEffect(()=>{
            if (!token && route in routesAuth) {
                setRoute("/login")
            }else{
                setRoute(route)
            }
        }
    , [token]);


    if(["/", "/login", "/register", "/forgot-password", "/reset-password"].includes(route)){
        if (token){
            setRouteWithParams("/main-view-timeline");
        }else if (route=="/"){
            setRouteWithParams("/login");
        }else{
            setRouteWithParams(route, props);
        }
    }else if (!(route in routes)){ // 404 Not Found
        setRouteWithParams("/not-found")
    }

    const View: React.FC = ()=>routes[route](props);

    return (
            <RouterContext.Provider value={setRouteWithParams}>
                <PathContext.Provider value={route}>
                    <ViewContext.Provider value={View}>
                        {children}
                    </ViewContext.Provider>
                </PathContext.Provider>
            </RouterContext.Provider>
        )

}









