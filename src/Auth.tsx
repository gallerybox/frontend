import React, {useState} from "react";

export let UserContext: React.Context<any> = React.createContext(null)
export let TokenContext: React.Context<any> = React.createContext(null);

export function UserContextProvider({children}: any){
    const [user, setUser] = useState<string | boolean | null>(false);
    const [userToken, setUserToken] = useState<string | boolean | null>(false);
    if(!userToken && localStorage.getItem("token")){
        setUserToken(JSON.parse(localStorage.getItem("token") as string));
        setUser(JSON.parse(localStorage.getItem("userId") as string))
    } else if (userToken){
        localStorage.setItem("token", JSON.stringify(userToken))
        localStorage.setItem("userId", JSON.stringify(user))
    }

    return (
        <UserContext.Provider value={[user, setUser]}>
            <TokenContext.Provider value={[userToken, setUserToken]}>
                    {children}
            </TokenContext.Provider>
        </UserContext.Provider>
    )
}
