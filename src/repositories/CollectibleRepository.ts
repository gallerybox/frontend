import { DynamicAttribute, JsonType } from "./ValueObjects";
import {backend_url, headers, responseMiddleware} from "./config";
import {ThematicSpaceDTO} from "./ThematicSpaceRepository";
import {UserDTO} from "./UserRepository";
import axios from "axios";

export interface CollectibleDTO {
    _id: string;
    __v: number;
    attributes: DynamicAttribute;
    thematicSpace: ThematicSpaceDTO;
    user: UserDTO;
    lastModified: Date;
}
export module CollectibleRepository {
    //const url = backend_url.url + "/collectible/"
    export const token: {value: string | boolean | null}= {value: null};

    export async function createCollection(){
        // TODO
    }
    export async function getTimeline(userId: string): Promise<Array<CollectibleDTO>> {
        const endpoint = backend_url.url + "/collectible/" + "timeline/loggedUserId/" + userId;
        headers["Authorization"] = `Bearer ${token.value}`
        const options = {
            method: "GET",
            mode: 'cors' as RequestMode,
            headers: headers
        };
        console.log(headers);
        let response: Array<CollectibleDTO> = [];

        response = await fetch(endpoint, options)
            .then(response => responseMiddleware(response).json())
            .then(data => data);


        return response;
    }
    export async function getSpaceTimeline(thematicSpaceId: string): Promise<Array<CollectibleDTO>> {

        const endpoint = backend_url.url + "/collectible/" +  `timeline/thematicSpaceId/${thematicSpaceId}`;
        headers["Authorization"] = `Bearer ${token.value}`
        const options = {
            method: "GET",
            mode: 'cors' as RequestMode,
            headers: headers
        };

        let response: Array<CollectibleDTO> = [];

        response = await fetch(endpoint, options)
            .then(response => responseMiddleware(response).json())
            .then(data => data);


        return response;
    }
    export async function findOne(id: string): Promise<CollectibleDTO>{
        const endpoint = backend_url.url + "/collectible/" + "id/" + id;
        headers["Authorization"] = `Bearer ${token.value}`
        const options = {
            method: "GET",
            mode: 'cors' as RequestMode,
            headers: headers
        };
    
        let response:  Promise<CollectibleDTO>;

        response = await fetch(endpoint, options)
            .then(response => responseMiddleware(response).json())
            .then(data => data);

        
        return response;
    }

    export async function findAll(): Promise<Array<CollectibleDTO>> {
        const endpoint = backend_url.url + "/collectible/";
        headers["Authorization"] = `Bearer ${token.value}`
        const options = {
            method: "GET",
            mode: 'cors' as RequestMode,
            headers: headers
        };

        let response: Array<CollectibleDTO> = [];
        
        response = await fetch(endpoint, options)
            .then(response => responseMiddleware(response).json())
            .then(data => data);

        return response
    }

    export async function deleteCollectible(id: string): Promise<JsonType>{
        const endpoint = backend_url.url + "/collectible/" + id;
        headers["Authorization"] = `Bearer ${token.value}`
        const options = {
            method: "DELETE",
            mode: 'cors' as RequestMode,
            headers: headers
        };

        let response = await fetch(endpoint, options)
            .then(response => responseMiddleware(response).json())
            .then(data => data);
        
        return response;
    }

    export async function upsertCollectible(formData: FormData){

        const endpoint = backend_url.url + "/collectible/" + "create";
        /*
        const options = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token.value}`// NO USAR el header de config, esto es un post de formulario.
            },
            data: formData
        };

        let response = await fetch(endpoint, options)
            .then(response => response.json())
            .then(data => data);        let myHeaders = {
            'authorization': `Bearer ${token.value}`,
            "Access-Control-Allow-Origin": backend_url
        }
*/

        let config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${token.value}`,
                //"origin": "http://localhost:4000",
                "ngrok-skip-browser-warning": "*"
            },
            validateStatus: () => true
        }

        return await axios.post(endpoint, formData, config).then(data => responseMiddleware(data))

    }


}