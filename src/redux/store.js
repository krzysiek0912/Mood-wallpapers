import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

// import reducers
import images from './imagesRedux';
import request from './requestRedux';

const localStorageMiddleware = ({ getState }) => {
    return (next) => (action) => {
        const result = next(action);
        console.log('localStorageMiddleware', result);
        if (action.payload) localStorage.setItem('images', JSON.stringify(getState().images));
        return result;
    };
};

// combine reducers
const rootReducer = combineReducers({
    images,
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
