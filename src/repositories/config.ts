
export const front_config_csv = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRvGHHouR6ySPMJwbywD4hKVvgbDC-GkT4NuepIQ78D8J36va11bpVzw1gmMlaHQYy3mUe0ALW2RyBY/pub?gid=0&single=true&output=csv";
const options = {
    method: "GET",
};

export const backend_url = {url: "http://localhost:3000", update: false};

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