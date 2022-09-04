import React, {useEffect, useState} from "react";
import {AuthRepository} from "./repositories/AuthRepository";

export let UserContext: React.Context<any> = React.createContext(null)
export let TokenContext: React.Context<any> = React.createContext(null);

export function UserContextProvider({children}: any){
    const [user, setUser] = useState<string | boolean | null>(false);
    const [userToken, setUserToken] = useState<string | boolean | null>(false);


    useEffect(()=>{
        if(!userToken && localStorage.getItem("token")){
            AuthRepository.validateToken(JSON.parse(localStorage.getItem("token") as string)).then(response =>{
                    console.log("entro a validar el token");
                    console.log(response.message);
                    console.log(localStorage.getItem("token"));
                    /*
                    if (!response.message || response.message!='VALID_TOKEN' ){

                        localStorage.removeItem("token");
                        localStorage.removeItem("userId");
                    }
                    */

                    setUserToken(JSON.parse(localStorage.getItem("token") as string));
                    setUser(JSON.parse(localStorage.getItem("userId") as string))
                }
            );

        } else if (userToken){
            localStorage.setItem("token", JSON.stringify(userToken))
            localStorage.setItem("userId", JSON.stringify(user))
        }
    },[user, userToken]);


    return (
        <UserContext.Provider value={[user, setUser]}>
            <TokenContext.Provider value={[userToken, setUserToken]}>
                    {children}
            </TokenContext.Provider>
        </UserContext.Provider>
    )
}
