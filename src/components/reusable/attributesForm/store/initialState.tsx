export interface State {
    "tag": string,
    "showTag": boolean,
    "category": string,
    "representation": Object
}

export interface TextRepresentation {
    "bold": boolean,
    "italics": boolean,
    "underlined": boolean,
    "size": FontSize
    "color": string,
    "largeText": boolean
}

export enum FontSize {
    Pequenyo = 9,
    Mediano = 14,
    Grande = 20
}


export interface MultimediaRepresentation {
    dimensions: Vector2D,   // Pequenyo: [300, 500], Mediano: [500, 800], Grande: [700, 900]
    multimediaType: MultimediaType
}

type Vector2D = [number, number]

export enum MultimediaType {
    Video = "Video",
    Audio = "Audio",
    Photo = "Photo"
}

export interface ToogleRepresentation {
    toogleType: string,
    icon: IconSelected,
    colorTrue: string,
    colorFalse: string
}


export enum IconSelected {
    Favorite = "Favorite",
    Bookmark = "Bookmark",
    Star = "Star"
}


export const INITIAL_STATE: State = {
    "tag": "",
    "showTag": false,
    "category": "",
    "representation": {}
}  


export const INITIAL_STATE_TEXT_REPRESENTATION: TextRepresentation = {
    "bold": false,
    "italics": false,
    "underlined": false,
    "color": "#aabbcc",
    "size": FontSize.Pequenyo,
    "largeText": false
}

export const INITIAL_STATE_MULTIMEDIA_REPRESENTATION: MultimediaRepresentation = {
    "dimensions": [50, 100],
    "multimediaType": MultimediaType.Audio
}

export const INITIAL_STATE_TOOGLE_REPRESENTATION: ToogleRepresentation = {
    "toogleType": "Icon",
    "icon": IconSelected.Favorite,
    "colorTrue": "rgb(144, 105, 172)",
    "colorFalse": "#808080",
}