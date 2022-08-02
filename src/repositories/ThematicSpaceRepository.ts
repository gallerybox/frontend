import {JsonType} from "./ValueObjects";
import {backend_url} from "./config";

export module ThematicSpaceRepository {

    const url = backend_url
    export async function test(): Promise<JsonType> {

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
        let response: JsonType = "meh"
        response = await fetch(endpoint, options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                return data;
            });

        return response
    }
}