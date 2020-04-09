/* SELECTORS */
export const getFavoriesList = ({ favorite }) => favorite.list;
export const getFavIds = ({ favorite }) => favorite.ids;
// action name creator
const reducerName = 'favorite';
const createActionName = (name) => `app/${reducerName}/${name}`;

export const ADD_TO_FAV = createActionName('ADD_TO_FAV');
export const REMOVE_FROM_FAV = createActionName('REMOVE_FROM_FAV');

/* ACTIONS */
export const addToFavRequest = (payload) => ({ payload, type: ADD_TO_FAV });
export const removeFromFavRequest = (payload) => ({ payload, type: REMOVE_FROM_FAV });

/* THUNKS */
const localState = null;
// localStorage.getItem('state') !== null
//     ? JSON.parse(localStorage.getItem('state')).favorite
//     : [];

const initialState = localState || { list: [], ids: [] };

export default function reducer(statePart = initialState, action = {}) {
    const { payload } = action;
    switch (action.type) {
        case ADD_TO_FAV:
            return {
                ...statePart,
                list: [...statePart.list, payload],
                ids: [...statePart.ids, payload.id],
            };
        case REMOVE_FROM_FAV:
            return {
                ...statePart,
                list: [...statePart.list.filter((element) => !(element.id === payload))],
                ids: [...statePart.ids.filter((element) => !(element === payload))],
            };
        default:
            return statePart;
    }
}
