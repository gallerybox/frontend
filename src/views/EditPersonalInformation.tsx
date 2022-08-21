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
    const [selectedImage, setSelectedImage] = useState< File | null>(null);

    userId = "63015c3010f2ca14d7eb4672";

    // Busca el usuario de base de datos
    useEffect(()=>{
        console.log(userId);
        UserRepository.getUser(userId).then(data => {
            alert(JSON.stringify(data));
            return data    
        }
        )
    },[])


    return (
        <div>
            <h1>Upload and Display Image usign React Hook's</h1>
            {selectedImage && (
                <div>
                <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                <br />
                <button onClick={()=>setSelectedImage(null)}>Remove</button>
                </div>
                )}
                <br />
            
                <br /> 
                <input
                type="file"
                name="myImage"
                onChange={(event) => { setSelectedImage(event.target.files![0]);//event!.target!.files[0]);
             }
            }
            />
      </div>
      );
}

export default EditPersonalInformation;