import {Response} from "./ValueObjects";
import {backend_url, headers} from "./config";

export interface UserAuthDTO {
    "_id": string,
    "nickname": string,
    "email": string,
    "password": string,
    "__v": 0
}

export interface UserLoginDTO {
    user: UserAuthDTO;
    access_token: string;
}
export module AuthRepository {
    const url = backend_url
    export async function login(email: string, password: string): Promise<Response<UserLoginDTO>> {

        const endpoint = url + "/auth/login/"
        const options = {
            method: "POST",
            headers: headers,

            body: JSON.stringify({
                email: email,
                password: password
            }),


        };
        let response: Response<UserLoginDTO>;
        response = await fetch(endpoint, options)
            .then((response) => response.json())
            .then((data) => {
                console.log("repo")
                console.log(data);
                return data;
            });

        return response
    }

    export async function register(nombre: string, apellidos: string, nickname: string, 
        email: string, password: string, hasConsented: string) {
            
        const endpoint = url + "/auth/register/"
        const options = {
            method: "POST",
            headers: headers,

            body: JSON.stringify({
                nombre: nombre,
                apellidos: apellidos,
                nickname: nickname,
                email: email,
                password: password,
                hasConsented: hasConsented
            }),
        }

        let response: Response<UserLoginDTO>;
        response = await fetch(endpoint, options)
            .then((response) => response.json())
            .then((data) => {
                console.log("repo")
                console.log(data);
                return data;
            });

        return response
    }
}