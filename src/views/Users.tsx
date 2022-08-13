import React, {useState, useEffect, useContext} from 'react';
import {TokenContext, UserContext} from "../Auth";
import {CollectionDTO, UserDTO, UserRepository} from "../repositories/UserRepository";
import CollectionCard from "../components/reusable/CollectionCard";
import {ThematicSpaceDTO} from "../repositories/ThematicSpaceRepository";
import SpaceCard from "../components/reusable/SpaceCard";
import {Response} from "../repositories/ValueObjects";
import MiniCollectibleCard from "../components/reusable/MiniCollectibleCard";
import MiniUserCard from "../components/reusable/MiniUserCard";

interface UsersProps {
    users: Array<UserDTO>;
}

const Users: React.FC<UsersProps> = function ({users}:UsersProps){
    console.log(JSON.stringify(users));
    return (
        <div className="Spaces flex-col full">
            {users.map(user => <MiniUserCard user={user}/> )}
            <div className="loadContent full flex-col"> Loading... </div>
        </div>
    );
}

export default Users;