/* SELECTORS */
export const getFavories = ({ favorite }) => favorite;

// action name creator
const reducerName = 'favorite';
const createActionName = (name) => `app/${reducerName}/${name}`;

export const ADD_TO_FAV = createActionName('ADD_TO_FAV');

/* ACTIONS */
export const addToFavRequest = (payload) => ({ payload, type: ADD_TO_FAV });

/* THUNKS */
const localState =
    localStorage.getItem('state') !== null
        ? JSON.parse(localStorage.getItem('state')).favorite
        : [];

const initialState = localState || {};

export default function reducer(statePart = initialState, action = {}) {
    switch (action.type) {
        case ADD_TO_FAV:
            return [...statePart, action.payload];
        default:
            return statePart;
    }
}
