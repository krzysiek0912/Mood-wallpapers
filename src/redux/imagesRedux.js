import axios from 'axios';
import { startRequest, endRequest, errorRequest } from './requestRedux';
import { accessKey } from '../configApp';

/* SELECTORS */
export const getImages = ({ images }) => images.list;
export const getFavImages = ({ images }) => images.fav;

// action name creator
const reducerName = 'images';
const createActionName = (name) => `app/${reducerName}/${name}`;

export const LOAD_IMAGES = createActionName('LOAD_IMAGES');

/* ACTIONS */
export const loadImages = (payload) => ({ payload, type: LOAD_IMAGES });

/* THUNKS */
export const loadImagesRequest = (term = 'night') => {
    return async (dispatch) => {
        dispatch(startRequest(reducerName));
        try {
            const res = await axios.get('https://api.unsplash.com/search/photos', {
                params: { query: term },
                headers: {
                    Authorization: `Client-ID ${accessKey}`,
                },
            });
            const results = res.data.results.slice(0, 9);
            const images = results.map((result) => {
                const { id, description, links, tags, urls, user } = result;
                const { name } = user;
                const image = {
                    id,
                    description,
                    links,
                    tags,
                    urls,
                    author: name,
                };
                return image;
            }, []);
            dispatch(loadImages(images));
            dispatch(endRequest(reducerName));
        } catch (e) {
            dispatch(errorRequest(e.message, reducerName));
        }
    };
};

const localState =
    localStorage.getItem('images') !== null ? JSON.parse(localStorage.getItem('images')) : [];

const initialState = {
    list: localState.list || [],
    fav: [],
};

export default function reducer(statePart = initialState, action = {}) {
    switch (action.type) {
        case LOAD_IMAGES:
            return { ...statePart, list: action.payload };
        default:
            return statePart;
    }
}
