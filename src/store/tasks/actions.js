export const SET_TERM = 'SET_TERM';
export const SET_FILTER = 'SET_FILTER';

export const setTerm = term => ({
    type: SET_TERM,
    payload: term
});

export const setFilter = filter => ({
    type: SET_FILTER,
    payload: filter
})