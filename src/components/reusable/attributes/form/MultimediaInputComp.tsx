import React, {useState} from 'react';
import ReactPlayer from 'react-player'
import {DynamicRepresentation, MultimediaType} from "../../../../repositories/ValueObjects";


export interface MultimediaInputCompProps{
    tag: string;
    value: any;
    representation: DynamicRepresentation;
    updateValue: Function;
}

export const MultimediaInputComp: React.FC<MultimediaInputCompProps> =  function ({tag, value, representation, updateValue}: MultimediaInputCompProps){
    const [temporalValue, setTemporalValue] = useState<string>();
    let Representation: React.FC | undefined = undefined;

    let srcUrl = value;
    if (temporalValue){
        srcUrl = temporalValue;
    }

    if (srcUrl){
        switch (representation.multimediaType) {
            case MultimediaType.Photo:
                Representation = ()=><div className="flex-col full-margin">
                    <img src={srcUrl}  width={(representation?.dimensions?.[0]? representation?.dimensions?.[0]: "75") + "%"} height="auto"/>
                </div>
                ;
                break;
            case MultimediaType.Video:
                Representation = ()=><div className="flex-col full-margin">
                    <ReactPlayer url={srcUrl} playing={false} controls={true}  width={(representation?.dimensions?.[0]? representation?.dimensions?.[0]: "75") + "%"} height='100%'/>
                </div>
                ;
                break;
            default:
                Representation = ()=><div className="flex-col full-margin">
                    <ReactPlayer url={srcUrl} playing={false} controls={true}  width={(representation?.dimensions?.[0]? representation?.dimensions?.[0]: "75") + "%"} height='100%'/>
                </div>
                ;
                break;
        }
    }


    return (
            <div className="MultimediaInputComp flex-col">

                <input type="file"
                       name={temporalValue?tag:tag+"#NoEdit#"}
                       onChange={(e) => {
                           if(e && e.target && e.target.files) {
                               updateValue(tag, e.target.files[0]);
                               const reader = new FileReader();
                               reader.readAsDataURL(e.target.files[0]);
                               reader.onload = function (e) {
                                   if (e && e.target && e.target.result){
                                       setTemporalValue(e.target.result as string);
                                   };
                               };
                           }
                       }}
                       id={tag}
                />

                {   Representation &&
                    <Representation/>
                }

            </div>

    );


}

export default MultimediaInputComp;