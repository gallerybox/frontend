import {ThematicSpaceDTO} from "./ThematicSpaceRepository";
import {backend_url, headers} from "./config";
import {Response} from "./ValueObjects";
import {CollectibleDTO} from "./CollectibleRepository";
import axios from "axios";

export interface CollectionDTO {
    _id: string;
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
    "nombre"?: string;
    "apellidos"?: string;
    "profilePhoto"?: string;
    "biography"?: string;
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


        return response;
    }

    export async function updateUser( user: UserDTO): Promise<Response<UserDTO>> {
        const endpoint = url + `/personal-data/${user._id}`;
        headers["Authorization"] = `Bearer ${token.value}`
        const options = {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(user)
        };

        let response: Response<UserDTO>;

        response = await fetch(endpoint, options)
            .then(response => response.json())
            .then(data => data);


        return response;
    }

    export async function getUsersByFollowedSpaceId(spaceId: string): Promise<Response<Array<UserDTO>>> {
        const endpoint = url + `/followed-space-id/${spaceId}`;
        headers["Authorization"] = `Bearer ${token.value}`
        const options = {
            method: "GET",
            headers: headers
        };

        let response: Response<Array<UserDTO>>;

        response = await fetch(endpoint, options)
            .then(response => response.json())
            .then(data => data);

        return response;
    }

    export async function getUserByOwnedSpaceId(spaceId: string): Promise<Response<UserDTO>> {
        const endpoint = url + `/owned-space-id/${spaceId}`;
        headers["Authorization"] = `Bearer ${token.value}`
        const options = {
            method: "GET",
            headers: headers
        };

        let response: Response<UserDTO>;

        response = await fetch(endpoint, options)
            .then(response => response.json())
            .then(data => data);

        return response;
    }


    export async function getUsersByFollowedUserId(userId: string): Promise<Response<Array<UserDTO>>> {
        const endpoint = url + `/followed-user/${userId}`;
        headers["Authorization"] = `Bearer ${token.value}`
        const options = {
            method: "GET",
            headers: headers
        };

        let response: Response<Array<UserDTO>>;

        response = await fetch(endpoint, options)
            .then(response => response.json())
            .then(data => data);

        return response;
    }

    export async function sendPersonalDataToEmail(userId: string) {
        const endpoint = backend_url + `/profile/${userId}`;
        headers["Authorization"] = `Bearer ${token.value}`
        const options = {
            method: "GET",
            headers: headers
        };

        let response = await fetch(endpoint, options)
            .then(response => response.json())
            .then(data => data);

        return response;
    }

    export async function deleteUser(userId: string) {
        const endpoint = url + `/${userId}`;
        headers["Authorization"] = `Bearer ${token.value}`
        const options = {
            method: "DELETE",
            headers: headers
        };

        let response = await fetch(endpoint, options)
            .then(response => response.json())
            .then(data => data);

        return response;
    }
    
    export async function addAvatar(userId: string, file: any) {
        const endpoint = url + `/add-avatar`;
       
        let formData = new FormData();

        formData.append('userId', userId);
        formData.append('file', file);
        formData.append('fileName', file.name);

        // Meter los configs en el header
        let myHeaders = {
            'authorization': `Bearer ${token.value}`,
            "Access-Control-Allow-Origin": backend_url
        }

        alert("ESTAMOS DENTRO DE ADD-AVATAR")
        console.log(file)
        let config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        return await axios.post(endpoint, formData, config).then(data => {
            console.log(data); 
            return data;
        })
    }

    export async function deleteAvatar(userId: string) {
        const endpoint = url + `/delete-avatar/${userId}`;

        let config = {
            headers: {
                'authorization': `Bearer ${token.value}`,
                "Access-Control-Allow-Origin": backend_url
            }
        }

        return await axios.delete(endpoint, config).then(data => {
            console.log(data); 
            return data;
        })
    }
 
    
    export async function updatePersonalData(userId: string, formState?: any) {
        const endpoint = url + `/personal-data/userId`;
        alert(JSON.stringify(formState.nombre))
        headers["Authorization"] = `Bearer ${token.value}`

        const options = {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(formState)
        }

        let response: Response<Array<UserDTO>>;

        response = await fetch(endpoint, options)
            .then(response => response.json())
            .then(data => data);

        return response;
    }
    
    export async function changeFollowUser(userId: string, userIdToChange: string, isFollowed: boolean){
        const endpoint = url + `/change-follow-user/${userId}/${userIdToChange}/${isFollowed}`;

        headers["Authorization"] = `Bearer ${token.value}`
        const options = {
            method: "GET",
            headers: headers
        };

        let response: Response<UserDTO>;

        response = await fetch(endpoint, options)
            .then(response => response.json())
            .then(data => data);


        return response;        
    }

    export async function getCollectionById(collectionId: string): Promise<Response<CollectionDTO>>{
        const endpoint = url + `/collection/${collectionId}`;

        headers["Authorization"] = `Bearer ${token.value}`
        const options = {
            method: "GET",
            headers: headers
        };

        let response: Response<CollectionDTO>;

        response = await fetch(endpoint, options)
            .then(response => response.json())
            .then(data => data);


        return response;
    };

}