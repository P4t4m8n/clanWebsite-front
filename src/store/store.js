import { combineReducers, compose, legacy_createStore as createStore } from "redux";
import { unitRedcuer } from "./redcuers/unit.redcuer";
import { userReducer } from "./redcuers/user.reducer";

const rootReducer = combineReducers({
    unitMoudle: unitRedcuer,
    userMoudle: userReducer,
})

const composeEnhancers = window.__REDUC_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())
window.gStore = store