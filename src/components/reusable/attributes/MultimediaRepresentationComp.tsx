import React from 'react';
import ReactPlayer from 'react-player'
import {DynamicRepresentation, MultimediaType} from "../../../repositories/ValueObjects";

export interface VideoRepresentationCompProps{
    value: string
    representation: DynamicRepresentation;
}

export const MultimediaRepresentationComp: React.FC<VideoRepresentationCompProps> =  function ({value, representation}: VideoRepresentationCompProps){
    let Representation: React.FC;
    switch (representation.multimediaType) {
        case MultimediaType.Photo:
            Representation = ()=><div className="flex-col full-margin">
                <img src={value}  width={(representation?.dimensions?.[0]? representation?.dimensions?.[0]: "75") + "%"} height="auto"/>
            </div>
            ;
            break;
        case MultimediaType.Video:
            Representation = ()=><div className="flex-col full-margin">
                <ReactPlayer url={value} playing={false} controls={true}  width={(representation?.dimensions?.[0]? representation?.dimensions?.[0]: "75") + "%"} height='100%'/>
            </div>
            ;
            break;
        default:
            Representation = ()=><div className="flex-col full-margin">
                                    <ReactPlayer url={value} playing={false} controls={true}  width={(representation?.dimensions?.[0]? representation?.dimensions?.[0]: "75") + "%"} height='100%'/>
                                </div>
                            ;
            break;
    }

    return (
            <Representation/>
    );

}

export default MultimediaRepresentationComp;