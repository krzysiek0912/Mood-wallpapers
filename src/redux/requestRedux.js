const reducerName = 'request';
const createActionName = (name) => `app/${reducerName}/${name}`;

/* SELECTORS */
export const getErrorRequest = ({ request }) => request.error;
export const getRequest = ({ request }) => request;

// action name creator
export const START_REQUEST = createActionName('START_REQUEST');
export const END_REQUEST = createActionName('END_REQUEST');
export const RESET_REQUEST = createActionName('RESET_REQUEST');
export const ERROR_REQUEST = createActionName('ERROR_REQUEST');

/* ACTIONS */
export const startRequest = (palyload) => ({ palyload, type: START_REQUEST });
export const endRequest = (palyload) => ({ palyload, type: END_REQUEST });
export const resetRequest = (palyload) => ({ palyload, type: RESET_REQUEST });
export const errorRequest = (error, palyload) => ({ palyload, error, type: ERROR_REQUEST });

/* THUNKS */
export const resetRequestObj = (palyload) => {
    return (dispatch) => {
        dispatch(resetRequest(palyload));
    };
};

const initialState = {
    success: false,
    pending: false,
    error: [],
};

export default function reducer(statePart = initialState, action = {}) {
    switch (action.type) {
        case START_REQUEST:
            return {
                ...statePart,
                pending: true,
                error: [],
                success: false,
            };
        case END_REQUEST:
            return {
                ...statePart,
                pending: false,
                error: [],
                success: true,
            };
        case RESET_REQUEST:
            return {
                ...statePart,
                pending: false,
                error: [],
                success: false,
            };
        case ERROR_REQUEST:
            return {
                ...statePart,
                pending: false,
                error: [...statePart.error, action.error],
                success: false,
            };
        default:
            return statePart;
    }
}
