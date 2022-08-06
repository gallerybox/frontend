import { DynamicType, JsonType } from "./ValueObjects";
import { backend_url } from "./config";
import {ThematicSpaceDTO} from "./ThematicSpaceRepository";

export interface CollectibleDTO {
    _id: string;
    __v: number;
    attributes: DynamicType;
    thematicSpace: ThematicSpaceDTO;
}
export module CollectibleRepository {
    const url = backend_url + "/collectible/"
    export const token: {value: string | boolean | null}= {value: null};

    export async function createCollection(){
        // TODO
    }
    export async function getTimeline(userId: string): Promise<Array<CollectibleDTO>> {
        const endpoint = url + "timeline/" + userId;
        const options = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${token.value}`
            }
        };

        let response: Array<CollectibleDTO> = [];

        response = await fetch(endpoint, options)
            .then(response => response.json())
            .then(data => data);
        console.log(response);

        return response;
    }
    export async function findOne(id: string): Promise<Array<CollectibleDTO>>{
        const endpoint = url + "id/" + id;
        const options = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${token.value}`
            }
        };
    
        let response: Array<CollectibleDTO> = [];

        response = await fetch(endpoint, options)
            .then(response => response.json())
            .then(data => data);
        console.log(response);
        
        return response;
    }

    export async function findAll(): Promise<Array<CollectibleDTO>> {
        const endpoint = url
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