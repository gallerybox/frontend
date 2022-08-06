import {Response} from "./ValueObjects";
import {backend_url} from "./config";

export interface UserDTO {
    "_id": string,
    "nickname": string,
    "email": string,
    "password": string,
    "isPrivate": true,
    "__v": 0
}

export interface UserLoginDTO {
    user: UserDTO;
    access_token: string;
}
export module AuthRepository {
    const url = backend_url
    export async function login(email: string, password: string): Promise<Response<UserLoginDTO>> {

        const endpoint = url + "/auth/login/"
        const options = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },

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
}