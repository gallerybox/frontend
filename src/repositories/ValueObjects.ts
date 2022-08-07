export type JsonType =
    | string
    | number
    | boolean
    | { [x: string]: JsonType }
    | Array<JsonType>;


type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
type Color = RGB | RGBA | HEX;
export type TextRepresentation = {
    color: Color;
    size: number;
    font: string;
    italics: boolean;
    bold: boolean;
    maxLength: number;
}

export enum ToggleType {
    Switch = "switch",
    Check = "Check",
    Icon = "Icon"
}
export type ToggleRepresentation = {

    toggleType: ToggleType;

    icon?: string; // Means to be svg image, color could be change

    colorTrue: Color;

    colorFalse: Color;
}

type Vector2D = [number, number]

export enum MultimediaType {
    Video = "Video",
    Audio = "Audio",
    Photo = "Photo"
}

export type MultimediaRepresentation = {
    dimensions: Vector2D;
    multimediaType: MultimediaType;
}

export enum Category {
    Multimedia = "Multimedia",
    Text = "Text",
    Toggle = "Toggle"
}
export type DynamicRepresentation = Partial<TextRepresentation & ToggleRepresentation & MultimediaRepresentation>
export type DynamicType = {
    representation: DynamicRepresentation,//{ [key:string]: any},
    value: string,
    representationOrder: number,
    showTag: boolean,
    category: Category
}

export type DynamicAttribute = {
    [tag: string] : DynamicType
}



type ErrorMessage = {
    message?: any,
    error?: string,
    statusCode?: number
}

export type Response<T> = Partial<T & ErrorMessage>;
