
import {createStore,combineReducers} from "redux";
import {SignupReducer} from '../store/reducers/loginReducer'


import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

// export default store;

const persistConfig = {
    key: 'root',
    storage,
}

let allReducers = combineReducers({SignupReducer});
const persistedReducer = persistReducer(persistConfig, allReducers)

// debugger;
let store = createStore(persistedReducer)
let persistor = persistStore(store)

export default () => {
    return { store, persistor }
}
