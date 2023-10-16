import AUDI_PLAYER from "../actions/play";

const initialState = {
    audioTracks: []
}

const audioReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case AUDI_PLAYER:
            return {
                ...state,
                audioTracks: action.payload
            }
        default:
            return state;
    }
}

export default audioReducer