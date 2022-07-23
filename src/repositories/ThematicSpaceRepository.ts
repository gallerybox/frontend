export module ThematicSpaceRepository {
    export type JSONValue =
        | string
        | number
        | boolean
        | { [x: string]: JSONValue }
        | Array<JSONValue>;

    const url = "http://localhost:3000"
    export async function test(): Promise<JSONValue> {

        const endpoint = url + "/tematic-spaces/tests"
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
        let response: JSONValue = "meh"
        response = await fetch(endpoint, options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                return data;
            });

        return response
    }
}