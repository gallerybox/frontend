import {JsonType} from "./ValueObjects";
import {backend_url} from "./config";

export interface TypeDTO {
    "category": string;
    "representation": {[props: string]: any};
    "_id": string;
}

export interface AttributeDTO {
    "type": TypeDTO;
    "tag": string;
    "showTag": boolean;
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
    export async function test(): Promise<ThematicSpaceDTO> {

        const endpoint = url + "/thematic-spaces/"
        const options = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
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
                console.log(data);
                return data;
            });

        return response
    }
}