import rootReducer from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default function setupStore() {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
}