import { 
    HANDLE_INPUT_TEXT, 
    TOGGLE_SHOWTAG, 
    SELECT_TEXT, 
    SELECT_MULTIMEDIA, 
    SELECT_TOOGLE, 
    TEXT_TOGGLE_BOLD,
    TEXT_TOGGLE_ITALICS,
    TEXT_TOGGLE_UNDERLINED,
    TEXT_COLOR_PICKER,
    TEXT_SELECTOR_SIZE,
    MULTIMEDIA_SELECTOR_TYPE,
    MULTIMEDIA_SELECTOR_SIZE,
    TOOGLE_SELECTOR_ICON,
    TOOGLE_COLOR_PICKER_TRUE,
    TOOGLE_COLOR_PICKER_FALSE
} from "./actionTypes";

// Contiene las acciones definidas como funciones que se enviarán al dispatch (trigger)

export const handleInputText = (event: any) => ({
    type: HANDLE_INPUT_TEXT,
    field: event.target.name,
    payload: event.target.value
})

export const handleShowTag = (event: any) => ({
    type: TOGGLE_SHOWTAG
})

export const handleSelectText = (event: any) => ({
    type: SELECT_TEXT,
    category: "Text"
})

export const handleSelectMultimedia = (event: any) => ({
    type: SELECT_MULTIMEDIA,
    category: "Multimedia"
})

export const handleSelectToogle = (event: any) => ({
    type: SELECT_TOOGLE,
    category: "Toogle"
})

export const handleTextBold = (event: any) => ({
    type: TEXT_TOGGLE_BOLD
})

export const handleTextItalics = (event: any) => ({
    type: TEXT_TOGGLE_ITALICS
})

export const handleTextUnderlined = (event: any) => ({
    type: TEXT_TOGGLE_UNDERLINED
})

export const handleTextColor = (color: any) => ({
    type: TEXT_COLOR_PICKER,
    payload: color
})

export const handleTextSize = (event: any) => ({
    type: TEXT_SELECTOR_SIZE,
    payload: event
})

export const handleMultimediaType = (multimediaType: any) => ({
    type: MULTIMEDIA_SELECTOR_TYPE,
    payload: multimediaType
})

export const handleMultimediaSize = (tamanyo: any) => ({
    type: MULTIMEDIA_SELECTOR_SIZE,
    payload: tamanyo
})

export const handleToogleIcon = (icon: any) => ({
    type: TOOGLE_SELECTOR_ICON,
    payload: icon
})

export const handleToogleColorTrue = (color: any) => ({
    type: TOOGLE_COLOR_PICKER_TRUE,
    payload: color
})

export const handleToogleColorFalse = (color: any) => ({
    type: TOOGLE_COLOR_PICKER_FALSE,
    payload: color
})