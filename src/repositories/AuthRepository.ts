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

export interface PasswordDTO {
    password: string
}

export module AuthRepository {
    //const url = backend_url.url;
    export async function login(email: string, password: string): Promise<Response<UserLoginDTO>> {

        const endpoint = backend_url.url + "/auth/login/"
        const options = {
            method: "POST",
            headers: headers,
            mode: 'cors' as RequestMode,
            body: JSON.stringify({
                email: email,
                password: password
            }),
        };
        let response: Response<UserLoginDTO>;
        response = await fetch(endpoint, options)
            .then((response) => response.json())
            .then((data) => {
                return data;
            });

        return response
    }

    export async function register(nombre: string, apellidos: string, nickname: string, 
        email: string, password: string, hasConsented: string) {
            
        const endpoint = backend_url.url + "/auth/register/"
        const options = {
            method: "POST",
            headers: headers,
            mode: 'cors' as RequestMode,
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
                return data;
            });

        return response
    }

    export async function validateToken(token: string) {
        const endpoint = backend_url.url + "/auth/verify-token"
        const options = {
            method: "POST",
            mode: 'cors' as RequestMode,
            headers: headers,
            body: JSON.stringify({token: token})
        }

        let response: Response<UserLoginDTO>;
        response = await fetch(endpoint, options)
            .then((response) =>
                response.json()
            ).then((data) => {
                return data;
            });

        return response
    }

    export async function forgotPassword(email: string) {
            
        const endpoint = backend_url.url + "/auth/forgot-password/"
        const options = {
            method: "POST",
            mode: 'cors' as RequestMode,
            headers: headers,

            body: JSON.stringify({
                email: email,
            }),
        }

        let response: Response<UserLoginDTO>;
        response = await fetch(endpoint, options)
            .then((response) => response.json())
            .then((data) => {
                return data;
            });

        return response
    }
    
    export async function resetPassword(userId: string, token: string, password: string) {
            
        const endpoint = backend_url.url + "/auth/reset-password/" + userId + "/" + token;
        const options = {
            method: "POST",
            headers: headers,
            mode: 'cors' as RequestMode,
            body: JSON.stringify({
                userId: userId,
                token: token,
                password: password,
            }),
        }

        let response: Response<PasswordDTO>;
        response = await fetch(endpoint, options)
            .then((response) => response.json())
            .then((data) => {
                return data;
            });

        return response
    }
}