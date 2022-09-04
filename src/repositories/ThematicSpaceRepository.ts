import {JsonType, Response} from "./ValueObjects";
import {backend_url, headers, responseMiddleware} from "./config";

export interface TypeDTO {
    "category": string;
    "representation": {[props: string]: any};
    "_id": string| null;
}

export interface AttributeDTO {
    "type": TypeDTO;
    "tag": string;
    "showTag": boolean;
    "showInReducedView": boolean;
    "representationOrder": number;
}
export interface TemplateDTO {
    "attributes": Array<AttributeDTO>;
    "_id": string;
}
export interface ThematicSpaceDTO {
    "_id": string;
    "__v": number;
    "description": string;
    "name": string;
    "template": TemplateDTO;
}
export module ThematicSpaceRepository {

    //const url =  backend_url.url
    export const token: {value: string | boolean | null}= {value: null};
    export async function test(): Promise<ThematicSpaceDTO> {

        const endpoint = backend_url.url + "/thematic-spaces/";
        headers["Authorization"] = `Bearer ${token.value}`;
        const options = {
            method: "GET",
            mode: 'cors' as RequestMode,
            headers: headers,
            /*
            body: JSON.stringify({
                a: 10,
                b: 20,
            }),
            */

        };
        let response: ThematicSpaceDTO;
        response = await fetch(endpoint, options)
            .then((response) => responseMiddleware(response).json())
            .then((data) => {

                return data;
            });

        return response
    }
    export async function getSpaceById(spaceId: string): Promise<Response<ThematicSpaceDTO>> {

        const endpoint = backend_url.url + `/thematic-spaces/id/${spaceId}`;
        headers["Authorization"] = `Bearer ${token.value}`;
        const options = {
            method: "GET",
            mode: 'cors' as RequestMode,
            headers: headers,
            /*
            body: JSON.stringify({
                a: 10,
                b: 20,
            }),
            */

        };
        let response: Response<ThematicSpaceDTO>;
        response = await fetch(endpoint, options)
            .then((response) => responseMiddleware(response).json())
            .then((data) => {
                return data;
            });

        return response
    }

    export async function upsertSpace(space: ThematicSpaceDTO): Promise<Response<ThematicSpaceDTO>> {

        const endpoint = backend_url.url + `/thematic-spaces`;
        headers["Authorization"] = `Bearer ${token.value}`;
        const options = {
            method: "POST",
            mode: 'cors' as RequestMode,
            headers: headers,
            body: JSON.stringify(space),

        };
        let response: Response<ThematicSpaceDTO>;
        response = await fetch(endpoint, options)
            .then((response) =>responseMiddleware(response).json())
            .then((data) => {
                return data;
            });

        return response
    }

    export async function followSpace(userId: string, thematicSpaceId: string) {
        const endpoint = backend_url.url + `/thematic-spaces/follow-space/${userId}/${thematicSpaceId}`;

        headers["Authorization"] = `Bearer ${token.value}`
        const options = {
            method: "GET",
            mode: 'cors' as RequestMode,
            headers: headers
        };

        let response: Response<ThematicSpaceDTO>;

        response = await fetch(endpoint, options)
            .then(response => responseMiddleware(response).json())
            .then(data => data);


        return response;   
    }
}