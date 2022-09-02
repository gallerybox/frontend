
export const backend_url = "http://localhost:3000"

export const headers: {[header: string]: string} =  {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
    "origin": "http://localhost:4000",
    "ngrok-skip-browser-warning": "*"
    //"Access-Control-Allow-Origin": backend_url
}

export const responseMiddleware: Function = (response: Response)=>{
    if (response.status==401){
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        window.location.search="";
        window.location.pathname="/login";
        return response;
    }else{
        return response;
    }
}