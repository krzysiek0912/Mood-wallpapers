import axios from 'axios';
import { startRequest, endRequest, errorRequest } from './requestRedux';
import { accessKey } from '../configApp';
import { changeParamsToString, defaultSearchOptions } from '../utils';
/* SELECTORS */
export const getImages = ({ images }) => images.list;
export const getFavImages = ({ images }) => images.fav;
export const getSearchParams = ({ images }) => images.searchParams;
export const getSearchString = ({ images }) => {
    return changeParamsToString(images.searchParams);
};

// action name creator
const reducerName = 'images';
const createActionName = (name) => `app/${reducerName}/${name}`;

export const LOAD_IMAGES = createActionName('LOAD_IMAGES');
export const SET_SEARCH_PARAMS = createActionName('SET_SEARCH_PARAMS');
export const SET_DEFAULT_SEARCH_PARAMS = createActionName('SET_DEFAULT_SEARCH_PARAMS');

/* ACTIONS */
export const loadImages = (payload) => ({ payload, type: LOAD_IMAGES });
export const setSearchParams = (payload) => ({ payload, type: SET_SEARCH_PARAMS });
export const setDefaultSearchParams = (payload) => ({ payload, type: SET_DEFAULT_SEARCH_PARAMS });

/* THUNKS */
export const loadDefaultImagesRequest = () => {
    return async (dispatch) => {
        const defaultParams = defaultSearchOptions();
        dispatch(startRequest(reducerName));
        dispatch(setSearchParams(defaultParams));
        const term = changeParamsToString(defaultParams);
        try {
            const res = await axios.get('https://api.unsplash.com/photos/random', {
                params: { query: term, count: 9 },
                headers: {
                    Authorization: `Client-ID ${accessKey}`,
                },
            });
            const results = res.data;
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
export const loadImagesRequest = (term = '') => {
    return async (dispatch) => {
        dispatch(startRequest(reducerName));
        try {
            const res = await axios.get('https://api.unsplash.com/photos/random/', {
                params: { query: term, count: 9 },
                headers: {
                    Authorization: `Client-ID ${accessKey}`,
                },
            });
            const results = res.data;
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
export const setSearchParamsRequest = (searchParams = []) => {
    return async (dispatch) => {
        dispatch(startRequest(reducerName));
        dispatch(setSearchParams(searchParams));
        const searchString = changeParamsToString(searchParams);
        try {
            dispatch(loadImagesRequest(searchString));
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
    searchParams: localState.searchParams || {
        timeOfDay: '',
        timeOfYear: '',
        weather: '',
        customText: '',
    },
};

export default function reducer(statePart = initialState, action = {}) {
    const params = action.payload;
    switch (action.type) {
        case LOAD_IMAGES:
            return { ...statePart, list: action.payload };
        case SET_SEARCH_PARAMS:
            return { ...statePart, searchParams: { ...statePart.searchParams, ...params } };
        default:
            return statePart;
    }
}
