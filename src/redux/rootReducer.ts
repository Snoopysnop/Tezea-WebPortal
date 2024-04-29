import { combineReducers } from "redux";
import testSlice from "./testSlice";

const rootReducer = combineReducers({
    test: testSlice
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer