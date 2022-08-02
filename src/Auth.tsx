import React, {useEffect, useState} from "react";
import {AuthRepository} from "./repositories/AuthRepository";
export let UserContext: React.Context<any> = React.createContext(null);

export function UserContextProvider({children}: any){

    const [userToken, setUserToken] = useState<string | boolean | null>(false);
    console.log("before");
    console.log("Auth");
    console.log(localStorage.getItem("token"));
    if(!userToken && localStorage.getItem("token")){
        setUserToken(JSON.parse(localStorage.getItem("token") as string));
    } else if (userToken){
        localStorage.setItem("token", JSON.stringify(userToken))
    }
    console.log("after");
    console.log(localStorage.getItem("token"));
    return (
        <UserContext.Provider value={[userToken, setUserToken]}>
            {children}
        </UserContext.Provider>
    )
}
