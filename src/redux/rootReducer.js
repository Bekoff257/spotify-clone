import { combineReducers } from "redux";
import likedSong from "./reducers/likeReducer";
import audioReducer from "./reducers/audioReducer";

const rootReducers = combineReducers({
    likedSong,
    audioReducer
})

export default rootReducers