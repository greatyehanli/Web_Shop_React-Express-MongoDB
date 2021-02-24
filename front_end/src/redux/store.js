import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import finalReducer from './reducers/index'


export default createStore(finalReducer, composeWithDevTools(applyMiddleware(thunk)))