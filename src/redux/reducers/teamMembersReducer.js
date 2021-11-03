import {
    SET_MEMBER
} from '../constants';

const defaultState = {
    section: 0
};

const reducer = (state = defaultState, action) => {

    switch (action.type) {

        case SET_MEMBER:
            return{
                ...state,
                section: action.payload
            };        

        default:
            return {...state};

    }

};

export default reducer;
