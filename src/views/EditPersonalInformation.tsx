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
    const [state, setState] = useState({
        photo: ""
    });
    
    const { photo } = state;

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


    const onChange = (e: any) => {
        alert(e.target.files[0])

        UserRepository.addAvatar(userId, e.target.files[0]).then(data => {
            alert(JSON.stringify(data));

                 
            if (data.statusCode === 201) {
                alert("Perfil modificado");
                alert("Nueva URL: " + data.profilePhoto)
            }
            setUser(data);
            console.log(data);
        })
    }


    return (
        
    <div>
        <div className="User flex-col full">
            <div className="card flex-col halfable-margin">
                <div className="flex-row full flex-row-space">
                    <div className="flex-text-row">
                        <div className="photo-container2 margin">
                            {/* <div className="profile-photo" style={{backgroundImage: `url(${user.profilePhoto?user.profilePhoto:profilePhoto})`}}>

                            </div> */}
                            <div className="profile-photo" style={{backgroundImage: `url(${user.profilePhoto?user.profilePhoto:profilePhoto})`}}></div>




                            <label>
                                Click Me
                                <input
                                type="file"
                                id="photo"
                                name="photo"
                                accept="image/png, image/jpeg"
                                onChange={onChange}
                                value={photo}
                                />
                            </label>












                            </div>
                        </div>
                        <div className="flex-col margin">
                        <header className="flex-row full-margin bold big-font">
                                <div className="flex-text-row">
                                    <span className="bold">Test</span>
                                </div>
                            </header>
                            <footer className="flex-row full-margin">
                                <div className="flex-text-row">
                                    <span>Test</span>
                                </div>
                            </footer>
                        </div>
                        <div className="flex-col-center">
                        <div className="flex-col-start">
                        <span className="flex-text-row bold clickable margin"> </span>
                            <span className="flex-text-row bold clickable margin"> </span>
                        </div>
                        <div className="flex-row flex-row-space full-margin">
                        <div className="flex-text-row ">
                            <span>TEST</span>
                        </div>
                        <div className="flex-col-start full">
                            <div className="flex-row flex-row-space">
                                <div className="flex-col-start margin-row full-mobile">
                                    <span className="bold margin">Espacios propios</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditPersonalInformation;