import {createAction} from 'redux-actions';
import {createGetAction} from './api.actions';
import actions from './';

const endLoading = createAction(actions.APP.END_LOADING, (key) => ({key}));

const startLoading = createAction(actions.APP.START_LOADING, (key, loadingContext = {}) => ({
    ...loadingContext,
    ...key
}));

export {endLoading, startLoading};
