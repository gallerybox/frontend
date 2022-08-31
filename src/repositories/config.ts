
export const backend_url = "http://localhost:3000"

export const headers: {[header: string]: string} =  {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
    "origin": "http://localhost:3001",
    "ngrok-skip-browser-warning": "*"
    //"Access-Control-Allow-Origin": backend_url
}