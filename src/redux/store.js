import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';


import txReducer from './reducers/txReducer';
import web3Reducer from './reducers/web3Reducer';
import walletReducer from './reducers/walletReducer';
import navbarReducer from './reducers/navbarReducer';
import teamMemberReducer from './reducers/teamMembersReducer';


const reducer = combineReducers({
    txReducer,
    web3Reducer,
    walletReducer,
    navbarReducer,
    teamMemberReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
