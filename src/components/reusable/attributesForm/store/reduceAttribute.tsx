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
    TEXT_TOOGLE_LARGE_TEXT,
    MULTIMEDIA_SELECTOR_SIZE,
    MULTIMEDIA_SELECTOR_TYPE,
    TOOGLE_COLOR_PICKER_TRUE,
    TOOGLE_COLOR_PICKER_FALSE,
    TOOGLE_SELECTOR_ICON
} from "./actionTypes";
import { FontSize, INITIAL_STATE_MULTIMEDIA_REPRESENTATION, INITIAL_STATE_TEXT_REPRESENTATION, INITIAL_STATE_TOOGLE_REPRESENTATION, MultimediaType } from "./initialState";


export function reduceAttribute(state: any, action: any) {
    const { type, payload } = action;

    switch (type) {
        case HANDLE_INPUT_TEXT:
            return { 
                ...state, 
                [action.field]: payload 
            };
        case TOGGLE_SHOWTAG:
            return {
                ...state,
                showTag: !state.showTag,
            }
        case SELECT_TEXT:
            return { 
                ...state,
                category: "Text",
                representation: INITIAL_STATE_TEXT_REPRESENTATION
             };
        case SELECT_MULTIMEDIA:
            return {
                ...state,
                category: "Multimedia",
                representation: INITIAL_STATE_MULTIMEDIA_REPRESENTATION
            }
        case SELECT_TOOGLE: 
            return {
                ...state,
                category: "Toogle",
                representation: INITIAL_STATE_TOOGLE_REPRESENTATION
            }
        case TEXT_TOGGLE_BOLD:
            return {
                ...state,
                representation: {
                    ...state.representation,
                    bold: !state.representation.bold
                } 
            }
        case TEXT_TOGGLE_ITALICS:
            return {
                ...state,
                representation: {
                    ...state.representation,
                    italics: !state.representation.italics
                }
            }
        case TEXT_TOGGLE_UNDERLINED:
            return {
                ...state,
                representation: {
                    ...state.representation,
                    underlined: !state.representation.underlined
                }
            }
        case TEXT_COLOR_PICKER:
            return {
                ...state,
                representation: {
                    ...state.representation,
                    color: action.payload
                }
            }
        case TEXT_SELECTOR_SIZE:
            let size;

            switch (action.payload) {
                case "Pequenyo":
                    size = FontSize.Pequenyo;
                    break;
                case "Mediano":
                    size = FontSize.Mediano;
                    break;
                case "Grande":
                    size = FontSize.Grande;
                    break;
            }

            return {
                ...state,
                representation: {
                    ...state.representation,
                    size: size
                }
            }
        case TEXT_TOOGLE_LARGE_TEXT:
            return {
                ...state,
                representation: {
                    ...state.representation,
                    largeText: !state.representation.largeText
                }
            }
        case MULTIMEDIA_SELECTOR_TYPE:
            let multimediaType;

            switch (action.payload) {
                case "Video":
                    multimediaType = MultimediaType.Video;
                    break;
                case "Audio":
                    multimediaType = MultimediaType.Audio;
                    break;
                case "Photo":
                    multimediaType = MultimediaType.Photo;
                    break;
            }

            return {
                ...state,
                representation: {
                    ...state.representation,
                    multimediaType: multimediaType
                }
            }
        case MULTIMEDIA_SELECTOR_SIZE:
            let dimensions;

            switch (action.payload) {
                case "Pequenyo":
                    dimensions = [300, 500];
                    break;
                case "Mediano":
                    dimensions = [500, 800];
                    break;
                case "Grande":
                    dimensions = [700, 900];
                    break;
            }
            return {
                ...state,
                representation: {
                    ...state.representation,
                    dimensions: dimensions
                }
            }
        case TOOGLE_SELECTOR_ICON:
            let icon;
            switch (action.payload) {
                case "Favorite":
                    icon = "Favorite";
                    break;
                case "Bookmark":
                    icon = "Bookmark";
                    break;
                case "Star":
                    icon = "Star";
                    break;
            }
            return {
                ...state,
                representation: {
                    ...state.representation,
                    icon: icon
                }
            }

        case TOOGLE_COLOR_PICKER_TRUE:
            return {
                ...state,
                representation: {
                    ...state.representation,
                    colorTrue: action.payload
                }
            }
        case TOOGLE_COLOR_PICKER_FALSE:
            return {
                ...state,
                representation: {
                    ...state.representation,
                    colorFalse: action.payload
                }
            }
    }
}
