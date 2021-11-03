import {
    SET_MEMBER
} from '../constants';

export const _set_member = member => {
    return{
        type: SET_MEMBER,
        payload: member
    };
}

export const set_member = member => {
    return (dispatch) => {
        dispatch(_set_member(member));

        setTimeout(() => {
            dispatch(_set_member(null));
        }, 1000);
    }
}