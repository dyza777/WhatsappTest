import makeActionTypes from 'key-mirror-nested';

const apiActions = (mix) => ({
    ...mix,
    ERROR: '',
    REQUEST: '',
    SUCCESS: ''
});

const actionTypes = {
    API: apiActions({
        ACTION: ''
    }),
    
    APP: {
        START_LOADING: '',
        END_LOADING: '',
    },
    
    ACCOUNT: {
        GET_INFO: apiActions()
    },

    MESSAGES: {
        CREATE: apiActions(),
        FETCH_LIST: apiActions()
    }
};

export default makeActionTypes(actionTypes, {connChar: '_'});
