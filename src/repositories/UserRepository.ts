import {ThematicSpaceDTO} from "./ThematicSpaceRepository";
import {backend_url, headers} from "./config";
import {Response} from "./ValueObjects";
import {CollectibleDTO} from "./CollectibleRepository";

export interface CollectionDTO {
    name: string;
    collectibles: Array<CollectibleDTO>;
}

// Este DTO es distinto del de auth, es la versión completa del objeto
export interface UserDTO  {
    "_id": string;
    "nickname": string;
    "email": string;
    "password": string;
    "isPrivate": boolean;
    "followedUsers": Array<UserDTO>;
    "ownedThematicSpaces": Array<ThematicSpaceDTO>;
    "followedThematicSpaces": Array<ThematicSpaceDTO>;
    "collections": Array<CollectionDTO>;
    "__v": number;
}

export module UserRepository {
    const url = backend_url + "/users"
    export const token: { value: string | boolean | null } = {value: null};

    export async function createCollection() {
        // TODO
    }

    export async function getUser(userId: string): Promise<Response<UserDTO>> {
        const endpoint = url + `/id/${userId}`;
        headers["Authorization"] = `Bearer ${token.value}`
        const options = {
            method: "GET",
            headers: headers
        };

        let response: Response<UserDTO>;

        response = await fetch(endpoint, options)
            .then(response => response.json())
            .then(data => data);
        console.log(response);

        return response;
    }
}