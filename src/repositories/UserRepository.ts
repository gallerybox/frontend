import {ThematicSpaceDTO} from "./ThematicSpaceRepository";

export interface CollectionDTO {
    name: string;
    collectibles: Array<CollectionDTO>;
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
