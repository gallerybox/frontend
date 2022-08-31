import React, {useState, useEffect, useContext, useCallback} from 'react';
import {TokenContext, UserContext} from "../Auth";
import {CollectionDTO, UserDTO, UserRepository} from "../repositories/UserRepository";
import CollectionCard from "../components/reusable/CollectionCard";
import {ThematicSpaceDTO} from "../repositories/ThematicSpaceRepository";
import SpaceCard from "../components/reusable/SpaceCard";
import {Response} from "../repositories/ValueObjects";
import MiniCollectibleCard from "../components/reusable/MiniCollectibleCard";
import MiniUserCard from "../components/reusable/MiniUserCard";

interface UsersProps {
    userId?: string;
    followers?: boolean;
    spaceId?: string;
}

const Users: React.FC<UsersProps> = function ({userId, followers, spaceId}:UsersProps){
    const [token, setToken] = useContext(TokenContext);
    const [users, setUsers] = useState<Array<UserDTO>>([]);
    UserRepository.token.value = token;
    useEffect(()=>{
            if(userId){
                UserRepository.getUser(userId).then(data => {
                        if(followers){
                            UserRepository.getUsersByFollowedUserId(data._id!).then(
                                data2 => setUsers(data2 as Array<UserDTO>)
                            )
                        }else{
                            setUsers(data.followedUsers!);
                        }
                    }

                )
            }else if (spaceId) {
                UserRepository.getUsersByFollowedSpaceId(spaceId).then(
                    data => setUsers(data as Array<UserDTO>)
                )
            }
        },[])


    return (
        <div className="Spaces flex-col full">
            {users.map(user =><MiniUserCard user={user as UserDTO}/> )}
            <div style={{width:"1rem", height: "1rem"}}></div>
        </div>
    );
}

export default Users;