import React, {useState, useEffect, useContext, ReactElement, ReactNode} from 'react';
import {TokenContext, UserContext} from "../Auth";
import {CollectionDTO, UserDTO, UserRepository} from "../repositories/UserRepository";
import CollectionCard from "../components/reusable/CollectionCard";
import {ThematicSpaceDTO, ThematicSpaceRepository} from "../repositories/ThematicSpaceRepository";
import SpaceCard from "../components/reusable/SpaceCard";
import {DynamicAttribute, Response} from "../repositories/ValueObjects";
import MiniCollectibleCard from "../components/reusable/MiniCollectibleCard";
import {TextField, TextareaAutosize, Button} from "@mui/material";
import {RouterContext} from "./router";
import {KeyboardArrowDown, KeyboardArrowUp, EditSharp, DeleteSharp} from '@mui/icons-material';
import {Radio, RadioGroup, FormControlLabel, FormControl , Checkbox} from '@mui/material';
import OverlayContinue, {OverlayContinueProps} from "../components/reusable/OverlayContinue";



interface SpaceFormProps {
    spaceId: string
}

const SpaceForm: React.FC<SpaceFormProps> = function ({spaceId}:SpaceFormProps){


    const setView = useContext(RouterContext);
    const [userId, setUserId] = useContext(UserContext);
    const [token, setToken] = useContext(TokenContext);
    const [user, setUser] = useState<Response<UserDTO>>({_id: ""});
    const [space, setSpace] = useState<Response<ThematicSpaceDTO>>();
    const [rows, setRows] = useState<Array<Array<ReactElement>>>([]);
    const [tableEvent, setTableEvent] = useState(false);
    const Mehggggg: React.FC = () =>{
        return (<div>Hola</div>);
    };

    const [overlayView, setOverlayView] = useState<{component: React.FC}>({component: Mehggggg});//<OverlayContinue continueCallback={()=>alert("añadir atributo")} isInvisible={true}/>);

    UserRepository.token.value = token;
    ThematicSpaceRepository.token.value = token;

    useEffect(()=>{
            UserRepository.getUserByOwnedSpaceId(spaceId).then(data=> {
                    setUser(data);
                    if (userId!=data._id) {
                        setView("/not-found");
                    }
                });
        },[]);

    const transformDataToReactElement: Function = (dataset: Array<string | number | ReactElement>, className: string="") => {
        return dataset.map( data => {
                if (typeof data === 'string' || typeof data === 'number'){
                    if ((typeof data === 'string' && data.length !== 0) || typeof data==='number'){
                        return (<span className={className}>{data}</span>);
                    }else{
                        return (<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>);
                    }
                }else{
                    return data;
                }
            }
        )
    }
    const header: Array<ReactElement> = transformDataToReactElement([
        (<div className="flex-text-row-center"><KeyboardArrowUp className="clickable" onClick={()=>alert("arriba")}/> &nbsp;<KeyboardArrowDown  className="clickable" onClick={()=>alert("abajo")}/> </div>)
        , "Etiqueta", "Tipo de Campo", "¿Aparece en la vista reducida?", "Acciones"], "bold");

    useEffect(() => {
            ThematicSpaceRepository.getSpaceById(spaceId).then( data => {
                    setSpace(data);
                    const newRows: Array<Array<ReactElement>> = [header];
                    const newAttributeRows = data.template!.attributes!.sort(attribute => attribute.representationOrder).map( attribute => {
                            const row: Array<string | number | ReactElement> = []
                            // Radio to select row
                            row.push(<div className="flex-col">
                                        <FormControlLabel value={attribute.representationOrder} control={<Radio />} label="" />
                                    </div>);
                            row.push(attribute.tag);

                            row.push(attribute.type.category);

                            row.push(<div className="flex-col">
                                        <Checkbox checked={attribute.showInReducedView} onChange={(e)=>alert(e)}/>
                                    </div>);
                                row.push( (<div className="flex-text-row-center"><EditSharp className="clickable" onClick={()=>alert("Edit")}/> &nbsp;<DeleteSharp  className="clickable" onClick={()=>alert("Delete")}/> </div>));

                            return row;
                        }
                    );
                    newRows.push(...transformDataToReactElement(newAttributeRows));
                    setRows(newRows);
                }

            )
        }, []);

    // TODO: checkBoxFunction + count<=3 disabled the rest
    // TODO: up + down function
    // TODO: delete + edit delete
    // TODO: new attribute + popup advice of lost not save changes.
    // TODO: transform changes in rows to changes in SpaceDTO, preparation to save
    // TODO: save rows and spaces inputs

    useEffect(()=>{
            // TODO,

        }
    , [tableEvent]);
    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();


    const [submitEvent, setSubmitEvent] = useState<React.FormEvent<HTMLFormElement> | null>(null);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitEvent(e);
    };


    const Row: React.FC<{cell_data:Array<ReactElement>}> = ({cell_data}: {cell_data:Array<ReactElement>})=>{
        return (
            <tr>
                {cell_data.map((data: ReactElement) => {
                    const View: React.FC = ()=> data;
                    return (<td><View/></td>);
                })}
            </tr>
        )
    }


    const OverlayView: React.FC = overlayView.component;

    return (


        <div className="SpaceForm flex-col full view">
            <OverlayView/>
            <div className="card flex-col-start halfable-margin">
                <div className="halfable-margin">
                    <TextField placeholder="Nombre del espacio" value={name} onChange={(e) => setName(e.target.value)} type="text" name="email"
                               variant="standard" margin="normal"/>
                </div>
                <div className="full-margin">
                    <TextareaAutosize
                        placeholder="Descripción del espacio temático."
                        value={description} onChange={(e) => setDescription(e.target.value)} name="description"
                        minRows={3}
                        style={{ width: "80%"}}
                    />
                </div>

                <div className="flex-col-start full" >
                    <span className="bold big-font margin">Campos de plantilla</span>
                    <div className="flex-col-start full-margin horizontal-scroll" style={{overflowX: "auto"}}>
                        <FormControl>

                            <RadioGroup
                                defaultValue="1"
                                name="radio-buttons-group"
                                onChange={()=>alert("Radio button pulsado")}
                            >
                                <div className="flex-col-start full">
                                    <table>
                                        {rows.map(row =><Row cell_data={row}/>)}
                                    </table>
                                </div>
                            </RadioGroup>
                        </FormControl>
                    </div>


                </div>
                <div className="flex-row full flex-row-space">
                    <div style={{width: "1px", height: "1px"}}>
                    </div>
                    <div className="flex-text-row">
                        <div className="margin-row">
                            <Button type="submit" variant="contained" color="primary"
                                    onClick={()=>setOverlayView({component: ()=><OverlayContinue continueCallback={()=>alert("añadir atributo")}/>})}>
                                Añadir atributo
                            </Button>
                        </div>
                        <div className="margin-row">
                            <Button type="submit" variant="contained" color="primary" onClick={()=>alert("Guardar")}> Guardar </Button>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    );
}

export default SpaceForm;