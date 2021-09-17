import { combineReducers } from "redux"
import { hamburgerMenuReducer } from "./HamburgerMenuReducer"
import { currentUserReducer } from "./CurrentUserReducer"

const rootReducer = combineReducers({
    hamburgerMenu: hamburgerMenuReducer,
    currentUser: currentUserReducer,
})

export default rootReducer
