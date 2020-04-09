import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

// import reducers
import images from './imagesRedux';
import favorite from './favoriteReedux';
import request from './requestRedux';

const localStorageMiddleware = ({ getState }) => {
    return (next) => (action) => {
        const result = next(action);
        if (action.payload) localStorage.setItem('state', JSON.stringify(getState()));
        return result;
    };
};

// combine reducers
const rootReducer = combineReducers({
    images,
    favorite,
    request,
});

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
          })
        : compose;
// create store
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, localStorageMiddleware)),
);

export default store;
