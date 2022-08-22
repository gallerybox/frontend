import { ChangeEvent, useEffect, useRef, useState } from "react";
import {Response} from "../repositories/ValueObjects";
import { UserDTO, UserRepository } from "../repositories/UserRepository";

interface UserProps {
    userId: string;
}


const EditPersonalInformation: React.FC<UserProps> = function ({userId}: UserProps) {
    const [user, setUser] = useState<Response<UserDTO>>({followedUsers:[], ownedThematicSpaces:[]});
    const [file, setFile] = useState()
  
    
    userId = "63015c3010f2ca14d7eb4672";
    
    // Busca el usuario de base de datos
    useEffect(()=>{
        console.log(userId);
        UserRepository.getUser(userId).then(data => {
            alert(JSON.stringify(data));
            return data    
        }
        )
    },[]);

    const handleChange = (e: any) => {

        setFile(e.target.files[0])
    }

    const onHandleSubmit = (e: any) => {
        e.preventDefault();
        alert("ENTRAAA");
        UserRepository.addAvatar(userId, file).then(

            data => data
        );
    }    
    
    return (
        <div>
        <h1>React js File Upload Tutorial</h1>
            <form onSubmit={e => onHandleSubmit(e)}>
                <input type="file" name="file" onChange={(e) => handleChange(e)}/>
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

export default EditPersonalInformation;