import {DynamicType} from "./ValueObjects";

export interface CollectibleDTO {
    _id: string;
    __v: number;
    attributes: DynamicType;
    thematicSpace: string;
}
export module CollectibleRepository {
    const url = "http://localhost:3000"
    export async function test(): Promise<Array<CollectibleDTO>> {

        const endpoint = url + "/collectible/"
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
        let response: Array<CollectibleDTO> = [];
        response = await fetch(endpoint, options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                return data;
            });

        return response
    }
}