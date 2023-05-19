import actions from '../actions';

const defaultInitialState = {
    messagesList: [],
    chatterNumber: ''
};

const actionsMap = {
    [actions.MESSAGES.CREATE.SUCCESS]: (state, action) => (
        {
            ...state,
            messagesList: [
                {
                    messageId: action.result.value,
                    textMessage: action.payload.context.message,
                    type: 'outgoing'
                },
                ...state.messagesList
            ]
        }
    ),
    [actions.MESSAGES.FETCH_LIST.SUCCESS]: (state, action) => (
        {
            ...state,
            messagesList: action.result.value,
            chatterNumber: action.payload.context.chatId.slice(0, -5)
        }
    ),
};

export default (state = defaultInitialState, action = {}) => {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
};
