import actions from '../actions';

const defaultInitialState = {
    isLoading: false
};

const actionsMap = {
    [actions.APP.START_LOADING]: (state, action) => (
        {
            ...state,
            isLoading: true
        }
    ),
    [actions.APP.END_LOADING]: (state, action) => (
        {
            ...state,
            isLoading: false
        }
    ),
};

export default (state = defaultInitialState, action = {}) => {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
};
