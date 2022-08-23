import { 
    HANDLE_INPUT_TEXT, 
    TOGGLE_SHOWTAG, 
    SELECT_TEXT, 
    SELECT_MULTIMEDIA, 
    SELECT_Toggle, 
    TEXT_TOGGLE_BOLD,
    TEXT_TOGGLE_ITALICS,
    TEXT_TOGGLE_UNDERLINED,
    TEXT_COLOR_PICKER,
    TEXT_SELECTOR_SIZE,
    MULTIMEDIA_SELECTOR_TYPE,
    MULTIMEDIA_SELECTOR_SIZE,
    Toggle_SELECTOR_ICON,
    Toggle_COLOR_PICKER_TRUE,
    Toggle_COLOR_PICKER_FALSE
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

export const handleSelectToggle = (event: any) => ({
    type: SELECT_Toggle,
    category: "Toggle"
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

export const handleToggleIcon = (icon: any) => ({
    type: Toggle_SELECTOR_ICON,
    payload: icon
})

export const handleToggleColorTrue = (color: any) => ({
    type: Toggle_COLOR_PICKER_TRUE,
    payload: color
})

export const handleToggleColorFalse = (color: any) => ({
    type: Toggle_COLOR_PICKER_FALSE,
    payload: color
})