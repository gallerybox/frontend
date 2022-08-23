import { DynamicAttribute, JsonType } from "./ValueObjects";
import {backend_url, headers} from "./config";
import {ThematicSpaceDTO} from "./ThematicSpaceRepository";
import {UserDTO} from "./UserRepository";

export interface CollectibleDTO {
    _id: string;
    __v: number;
    attributes: DynamicAttribute;
    thematicSpace: ThematicSpaceDTO;
    user: UserDTO;
    lastModified: Date;
}
export module CollectibleRepository {
    const url = backend_url + "/collectible/"
    export const token: {value: string | boolean | null}= {value: null};

    export async function createCollection(){
        // TODO
    }
    export async function getTimeline(userId: string): Promise<Array<CollectibleDTO>> {
        const endpoint = url + "timeline/loggedUserId/" + userId;
        headers["Authorization"] = `Bearer ${token.value}`
        const options = {
            method: "GET",
            headers: headers
        };

        let response: Array<CollectibleDTO> = [];

        response = await fetch(endpoint, options)
            .then(response => response.json())
            .then(data => data);


        return response;
    }
    export async function getSpaceTimeline(thematicSpaceId: string): Promise<Array<CollectibleDTO>> {

        const endpoint = url +  `timeline/thematicSpaceId/${thematicSpaceId}`;
        headers["Authorization"] = `Bearer ${token.value}`
        const options = {
            method: "GET",
            headers: headers
        };

        let response: Array<CollectibleDTO> = [];

        response = await fetch(endpoint, options)
            .then(response => response.json())
            .then(data => data);


        return response;
    }
    export async function findOne(id: string): Promise<CollectibleDTO>{
        const endpoint = url + "id/" + id;
        headers["Authorization"] = `Bearer ${token.value}`
        const options = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${token.value}`
            }
        };
    
        let response:  Promise<CollectibleDTO>;

        response = await fetch(endpoint, options)
            .then(response => response.json())
            .then(data => data);

        
        return response;
    }

    export async function findAll(): Promise<Array<CollectibleDTO>> {

        const endpoint = url;
        headers["Authorization"] = `Bearer ${token.value}`
        const options = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            }
        };

        let response: Array<CollectibleDTO> = [];
        
        response = await fetch(endpoint, options)
            .then(response => response.json())
            .then(data => data);

        return response
    }

    export async function deleteCollectible(id: string): Promise<JsonType>{

        const endpoint = url + id;
        headers["Authorization"] = `Bearer ${token.value}`
        const options = {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            }
        };

        let response = await fetch(endpoint, options)
            .then(response => response.json())
            .then(data => data);
        
        return response;
    }
}