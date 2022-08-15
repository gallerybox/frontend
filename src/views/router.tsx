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
    "/not-found": ()=>(<div style={{color: "black"}}><h1>Error 404, esta página no existe</h1></div>)
}
const history: {[entry:number]: {route:string, props:string}}= {}

export let RouterContext: React.Context<any> = React.createContext(Login);
export let ViewContext: React.Context<React.FC> = React.createContext(Login);
export function RouterContextProvider({children}: any){

    const urlRoute = window.location.pathname;

    const params = new URLSearchParams(window.location.search);
    const urlProps: {[param: string]: string|number|boolean} = {};
    params.forEach((value, param) => {
        urlProps[param] = JSON.parse(value);
    });

    const [props, setProps] = useState<{[prop: string]: any}>(urlProps);
    //const [routeOld,setRouteOld] = useState<string>("");
    console.log("Por aqui entra");

    const [token,setToken] = useContext(TokenContext);
    const [route, setRoute] = useState<string>(urlRoute);


    const setRouteWithParams: Function = (newRoute: string, newProps :{[prop: string]: any}={}) =>{
        console.log("Ruta en setRouteWithParams");
        console.log(newRoute);
        if((newRoute+JSON.stringify(newProps)) !== (route+JSON.stringify(props))){
            console.log("se guarda historial");
            setRoute(newRoute);
            setProps(newProps);
           window.history.pushState({entry: Object.keys(history).length}, "GalleryBox", newRoute);
           history[Object.keys(history).length]={route: newRoute, props: JSON.stringify(newProps)};
        }
    }

    useEffect(() =>{
            window.onpopstate = function(e){
                if(e.state){
                    const historyEntry = history[e.state.entry];
                    setRoute(historyEntry.route);
                    setProps(JSON.parse(historyEntry.props));
                }
            };
        },[])

    useEffect(()=>{
            console.log("Token changes");
            if (!token) {
                setRoute("/login")
            }else{
                setRoute(route)
            }
        }
    , [token]);

    if(route=="/"){
        console.log("la ruta es una barra");
        if (token){
            setRouteWithParams("/main-view-timeline");
        }else{
            setRouteWithParams("/login");
        }
    }else if (!(route in routes)){ // 404 Not Found
        setRouteWithParams("/not-found")
    }
    const View: React.FC = ()=>routes[route](props);

    return (
            <RouterContext.Provider value={setRouteWithParams}>
                <ViewContext.Provider value={View}>
                    {children}
                </ViewContext.Provider>
            </RouterContext.Provider>
        )

}









