import {
    SET_SECTION
} from '../constants';

export const _set_section = section => {
    return{
        type: SET_SECTION,
        payload: section
    };
}

export const set_section = section => {
    return (dispatch, getState) => {
        dispatch(_set_section(section));

        setTimeout(() => {
            dispatch(_set_section(null));
        }, 1000);
    }
}