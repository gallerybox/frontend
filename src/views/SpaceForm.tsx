import React, {useState, useEffect, useContext, ReactElement, ReactNode, useCallback} from 'react';
import {TokenContext, UserContext} from "../Auth";
import {CollectionDTO, UserDTO, UserRepository} from "../repositories/UserRepository";
import CollectionCard from "../components/reusable/CollectionCard";
import {
    AttributeDTO, TemplateDTO,
    ThematicSpaceDTO,
    ThematicSpaceRepository
} from "../repositories/ThematicSpaceRepository";
import SpaceCard from "../components/reusable/SpaceCard";
import {DynamicAttribute, Response} from "../repositories/ValueObjects";
import MiniCollectibleCard from "../components/reusable/MiniCollectibleCard";
import {TextField, TextareaAutosize, Button} from "@mui/material";
import {RouterContext} from "./router";
import {KeyboardArrowDown, KeyboardArrowUp, EditSharp, DeleteSharp} from '@mui/icons-material';
import {Radio, RadioGroup, FormControlLabel, FormControl , Checkbox} from '@mui/material';
import OverlayContinue, {OverlayContinueProps} from "../components/reusable/OverlayContinue";
import attribute from "../components/reusable/attributes/Attribute";
import OverlaySpaceLimit from "../components/reusable/OverlaySpacesLimit";



interface SpaceFormProps {
    spaceId?: string
}

const SpaceForm: React.FC<SpaceFormProps> = function ({spaceId}:SpaceFormProps){


    const setView = useContext(RouterContext);
    const [userId, setUserId] = useContext(UserContext);
    const [loggedUser, setLoggedUser] =  useState<Response<UserDTO>| null>(null);
    const [token, setToken] = useContext(TokenContext);
    const [user, setUser] = useState<Response<UserDTO>>({_id: ""});
    const [space, setSpace] = useState<Response<ThematicSpaceDTO>>({});
    const [rows, setRows] = useState<Array<Array<ReactElement>>>([]);
    const [tableEvent, setTableEvent] = useState(false);
    const [overlayView, setOverlayView] = useState<{component: React.FC}>({component: ()=><OverlayContinue  isInvisible={true} continueCallback={()=>0}/>});
    const [overlaySpaceLimit, setoverlaySpaceLimit] = useState<{component: React.FC}>({component: ()=><OverlaySpaceLimit  isInvisible={true} />});

    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();

    const [errors, setErrors] = useState<{[error: string]: string}>({});

    UserRepository.token.value = token;
    ThematicSpaceRepository.token.value = token;

    useEffect(()=>{
            if(userId){
                UserRepository.getUser(userId).then( data => {
                        if (data){
                            setLoggedUser(data);
                        }else{
                            setView("/not-found");
                        }
                    }
                )
            }else{
                setView("/not-found");
            }

            if(spaceId){
                UserRepository.getUserByOwnedSpaceId(spaceId!).then(data=> {
                    setUser(data);
                    if (userId!=data._id) {
                        setView("/not-found");
                    }
                });
            }
        },[]);

    useEffect(() => {
        if (spaceId){
            ThematicSpaceRepository.getSpaceById(spaceId!).then( data => {
                    if (data){
                        setSpace(data);
                        setName(data.name);
                        setDescription(data.description);
                    } else {
                        setView("/not-found");
                    }

                }
            )
        }

    }, []);

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
    const [attributeToOrder, setAttributeToOrder] = useState<{"order":number, "tag":string | null}>({"order":0, "tag": null})
    const header: Array<ReactElement> = transformDataToReactElement([
        (<div className="flex-text-row-center"><KeyboardArrowUp className="clickable" onClick={()=>memoUpAttribute()}/> &nbsp;<KeyboardArrowDown  className="clickable" onClick={()=>memoDownAttribute()}/> </div>)
        , "Etiqueta", "Tipo de Campo", "¿Aparece en la vista reducida? (max 3)", "Acciones"], "bold");

    const memoUpAttribute = useCallback(
        () => {

            upAttribute(attributeToOrder, space);
        },
        [attributeToOrder],
    );
    const memoDownAttribute = useCallback(
        () => {
            downAttribute(attributeToOrder, space);
        },
        [attributeToOrder],
    );

    const updateShowInReducedView: Function = (tag: string, check: boolean, space: ThematicSpaceDTO) =>{
        const attributes = space!.template.attributes.map( attribute =>{
                if (attribute.tag==tag){
                    attribute.showInReducedView = check;
                };
                return attribute;
            }

        );
        space!.template.attributes = attributes;
        const newSpace: ThematicSpaceDTO= JSON.parse(JSON.stringify(space));
        setSpace(newSpace);

    };

    const deleteAttribute: Function = (tag: string, space: ThematicSpaceDTO)=>{
        const attributes = space!.template.attributes.filter(attribute=>attribute.tag!=tag);
        space!.template.attributes = attributes;
        const newSpace: ThematicSpaceDTO= JSON.parse(JSON.stringify(space));
        setSpace(newSpace);
    };

    useEffect(() => {
            if(space && space._id) {
                const newRows: Array<Array<ReactElement>> = [header];
                const checkCounter: number = space!.template!.attributes!.filter(attribute=> attribute.showInReducedView).length;
                const newAttributeRows = space!.template!.attributes!.sort(function (a, b) {
                    return a.representationOrder - b.representationOrder
                }).map(attribute => {
                        console.log(JSON.stringify(attribute));
                        const row: Array<string | number | ReactElement> = []
                        // Radio to select row
                        const radioButtoValue = {order: attribute.representationOrder, tag: attribute.tag};
                        row.push(<div className="flex-col">
                            <FormControlLabel checked={radioButtoValue.tag==attributeToOrder.tag}
                                value={JSON.stringify(radioButtoValue)}
                                control={<Radio/>} label=""/>
                        </div>);
                        row.push(attribute.tag);

                        row.push(attribute.type.category);

                        row.push(<div className="flex-col">
                            <Checkbox checked={attribute.showInReducedView} disabled={!attribute.showInReducedView && checkCounter>=3}
                                      onChange={(event, checked) => updateShowInReducedView(attribute.tag, checked, space)}/>
                        </div>);
                        row.push((<div className="flex-text-row-center"><EditSharp className="clickable"
                                                                                   onClick={()=>setOverlayView({component: ()=><OverlayContinue continueCallback={()=>alert("añadir atributo")}/>})}/> &nbsp;
                            <DeleteSharp className="clickable" onClick={() => deleteAttribute(attribute.tag, space)}/></div>));

                        return row;
                    }
                );

                newRows.push(...transformDataToReactElement(newAttributeRows));
                setRows(newRows);

            }

    }, [memoUpAttribute, memoDownAttribute, space]);






    const upAttribute = (attributeToOrder: {"order":number, "tag":string | null}, space: Response<ThematicSpaceDTO>| undefined)=>{
        let attributes = space!.template!.attributes!.sort(function (a, b){ return a.representationOrder-b.representationOrder})
        if(attributeToOrder.tag && attributeToOrder.order!=0){
            attributes = attributes.map(
                attribute => {
                    if (attribute.representationOrder==attributeToOrder.order){
                        attribute.representationOrder=attribute.representationOrder-1;
                    } else if ((attribute.representationOrder+1)==attributeToOrder.order){
                        attribute.representationOrder= attribute.representationOrder+1;
                    };
                    return attribute;
                }
            )

            setAttributeToOrder({order: attributeToOrder.order-1, tag: attributeToOrder.tag})
            space!.template!.attributes = attributes;
            const newSpace: ThematicSpaceDTO= JSON.parse(JSON.stringify(space));
            setSpace(newSpace);
        }
    };


    const downAttribute = (attributeToOrder: {"order":number, "tag":string | null}, space: Response<ThematicSpaceDTO>| undefined)=>{
        let attributes = space!.template!.attributes!.sort(function (a, b){ return a.representationOrder-b.representationOrder})
        if(attributeToOrder.tag && attributeToOrder.order!=(attributes.length-1)){
            attributes = attributes.map(
                attribute => {
                    if (attribute.representationOrder==attributeToOrder.order){
                        attribute.representationOrder=attribute.representationOrder+1;
                    } else if ((attribute.representationOrder-1)==attributeToOrder.order){
                        attribute.representationOrder= attribute.representationOrder-1;
                    };
                    return attribute;
                }
            )
            setAttributeToOrder({order: attributeToOrder.order+1, tag: attributeToOrder.tag})
            space!.template!.attributes = attributes;
            const newSpace: ThematicSpaceDTO= JSON.parse(JSON.stringify(space));
            setSpace(newSpace);
        }
    };


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
    const OverlaySpaceLimitView: React.FC = overlaySpaceLimit.component;

    return (


        <div className="SpaceForm flex-col full view">
            <OverlayView/>
            <OverlaySpaceLimitView/>
            <div className="card flex-col-start halfable-margin">
                <div className="halfable-margin">
                    <TextField placeholder="Nombre del espacio" error={errors["mandatoryName"]?true:false}  helperText={errors["mandatoryName"]?errors["mandatoryName"]:""} value={name} onChange={(e) => {
                        if(e && e.target && e.target.value) {
                            setName(e.target.value);

                            const newSpace: ThematicSpaceDTO = JSON.parse(JSON.stringify(space));
                            newSpace["name"] = e.target.value;
                            console.log(newSpace);
                            setSpace(newSpace);
                        }
                    }} type="text" name="email"
                               variant="standard" margin="normal"/>
                </div>
                <div className="full-margin">
                    <TextareaAutosize
                        placeholder="Descripción del espacio temático."
                        value={description} onChange={(e) => {
                            if(e && e.target) {
                                setDescription(e.target.value);

                                const newSpace: ThematicSpaceDTO = JSON.parse(JSON.stringify(space));
                                newSpace["description"] = e.target.value;
                                setSpace(newSpace);
                            }
                    }} name="description"
                        minRows={3}
                        style={{ width: "80%"}}
                    />
                </div>

                <div className="flex-col-start full" >
                    <span className="bold big-font margin">Campos de plantilla</span>
                    <div className="flex-col-start full-margin horizontal-scroll" style={{overflowX: "auto"}}>
                        <FormControl>

                            <RadioGroup
                                name="radio-buttons-group"
                                onChange={(event, value)=>{
                                    setAttributeToOrder(JSON.parse(value));
                                }}
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

                        <div className={space && space._id?"margin-row":"invisible"}>
                            <Button type="submit" variant="contained" color="primary"
                                    onClick={()=>setOverlayView({component: ()=><OverlayContinue continueCallback={()=>setView("/space-attribute-form",space?._id?{spaceId: space._id}:{})}/>})}>
                                Añadir atributo
                            </Button>
                        </div>
                        <div className="margin-row">
                            <Button type="submit" variant="contained" color="primary" onClick={()=>{
                                console.log("HOla");
                                if (!name) {
                                    console.log("no name");
                                    setErrors(current => {
                                        current["mandatoryName"] = "Un espacio debe tener un nombre.";
                                        const next: { [error: string]: string } = {};
                                        Object.assign(next, current); // Hay que crear un objeto nuevo para que cambie la referencia del objeto y react detecte el cambio y vuelva a renderizar.
                                        return next;
                                    })
                                }
                                if(name) {
                                    console.log("si name");
                                    let spaces = loggedUser?.ownedThematicSpaces;
                                    if (spaces && spaces?.length!>=3 && !space!._id){
                                        setoverlaySpaceLimit({component: ()=><OverlaySpaceLimit/>});
                                    } else {
                                        ThematicSpaceRepository.upsertSpace(space as ThematicSpaceDTO).then(space =>{
                                                if(!loggedUser!.ownedThematicSpaces){
                                                    loggedUser!.ownedThematicSpaces = [];
                                                }
                                                if (loggedUser!.ownedThematicSpaces!.filter(s => s._id == space._id).length<=0){
                                                    loggedUser?.ownedThematicSpaces?.push(space._id! as unknown as ThematicSpaceDTO);
                                                       UserRepository.updateUser(loggedUser as UserDTO).then( data =>
                                                           setView("/space", {spaceId: space._id})
                                                       )
                                                }else {
                                                    setView("/space", {spaceId: space._id});
                                                }


                                            }
                                        )
                                    }
                                }

                            }}> Guardar </Button>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    );
}

export default SpaceForm;