import {JsonType, Response} from "./ValueObjects";
import {backend_url, headers} from "./config";

export interface TypeDTO {
    "category": string;
    "representation": {[props: string]: any};
    "_id": string;
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

    const url = backend_url
    export const token: {value: string | boolean | null}= {value: null};
    export async function test(): Promise<ThematicSpaceDTO> {

        const endpoint = url + "/thematic-spaces/";
        headers["Authorization"] = `Bearer ${token.value}`;
        const options = {
            method: "GET",
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
            .then((response) => response.json())
            .then((data) => {

                return data;
            });

        return response
    }
    export async function getSpaceById(spaceId: string): Promise<Response<ThematicSpaceDTO>> {

        const endpoint = url + `/thematic-spaces/id/${spaceId}`;
        headers["Authorization"] = `Bearer ${token.value}`;
        const options = {
            method: "GET",
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
            .then((response) => response.json())
            .then((data) => {
                return data;
            });

        return response
    }
}