
const initialState = []

const stopsReducer = (state=initialState, action) => {
    //return state
    switch (action.type) {
        case "ADD_ALL_STOPS":
            return [...state, ...action.payload] //take previous state and add payload coming from action 
            //!! creatinf a new state, NOT trying to modify existing
    
        default:
            return state;
    }
    
}

export default stopsReducer