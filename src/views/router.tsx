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
    console.log(props);
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
    "/users": Users,
    "/user": User,
    "/register": Register,
    "/login": Login,
    "/terms-and-conditions": TermsAndConditions,
    "/forgot-password": ForgotPassword,
    "/not-found": NotFound//()=>(<div style={{color: "black"}}><h1>Error 404, esta página no existe</h1></div>)
}
const routesAuth: {[view: string]: React.FC<any>} = {
    "/spaces-owned": () => Spaces({ownSpaces:true}),
    "/space-form": SpaceForm,
    "/spaces-followed": () => Spaces({ownSpaces:false}),
    "/main-view-timeline": MainViewTimeline,
    "/space-attribute-form": AttributeForm,
}

const routes : {[view: string]: React.FC<any>} = {...routesNoAuth, ...routesAuth};

const history: {[entry:number]: {route:string, props:string}}= {}

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
            window.history.pushState({entry: Object.keys(history).length}, "GalleryBox", newRoute+propsToQuery(newProps));
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
            if (!token && route in routesAuth) {
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
                <PathContext.Provider value={route}>
                    <ViewContext.Provider value={View}>
                        {children}
                    </ViewContext.Provider>
                </PathContext.Provider>
            </RouterContext.Provider>
        )

}









