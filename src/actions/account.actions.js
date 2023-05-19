import {createGetAction} from './api.actions';
import actions from './';
import config from '../helpers/config';

export const getUserInfo = (idInstance, apiTokenInstance) =>
    createGetAction([config.API_URL, `waInstance${idInstance}`, 'GetSettings', apiTokenInstance].join('/'), actions.ACCOUNT.GET_INFO, {idInstance, apiTokenInstance});
