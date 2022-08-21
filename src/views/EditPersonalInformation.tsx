import { ChangeEvent, useEffect, useRef, useState } from "react";
import {Response} from "../repositories/ValueObjects";
import profilePhoto from "../assets/avatar-default.png";
import { UserDTO, UserRepository } from "../repositories/UserRepository";
import { Button } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

interface UserProps {
    userId: string;
}


const EditPersonalInformation: React.FC<UserProps> = function ({userId}: UserProps) {
    const [user, setUser] = useState<Response<UserDTO>>({followedUsers:[], ownedThematicSpaces:[]});

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

    const onChangeEvent = (e: any) => {
        let files = e.target.files;
        console.warn("data files", files);

        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            console.warn("img data", e.target!.result);
            UserRepository.addAvatar(userId, e.target!.result);
        }


    }

    
    return (
        <div>
        <h1>React js File Upload Tutorial</h1>
            <form>
                <input type="file" name="file" onChange={(e) => onChangeEvent(e)}/>
            </form>
        </div>
    );
}

export default EditPersonalInformation;