import actions from '../actions';

const defaultInitialState = {
    userInfo:{
        idInstance: "",
        apiTokenInstance: "",
        chatId: '',
        isWrongCredentialsError: false
    }
};

const actionsMap = {
    [actions.ACCOUNT.GET_INFO.SUCCESS]: (state, action) => (
        {
            ...state,
            userInfo: {
                ...state.userInfo,
                idInstance: action.payload.context.idInstance,
                apiTokenInstance: action.payload.context.apiTokenInstance,
                isWrongCredentialsError: false
            }
        }
    ),
    [actions.ACCOUNT.GET_INFO.ERROR]: (state, action) => (
        {
            ...state,
            userInfo: {
                ...state.userInfo,
                isWrongCredentialsError: true
            }
        }
    ) 
};

export default (state = defaultInitialState, action = {}) => {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
};
