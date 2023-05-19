import {createPostAction} from './api.actions';
import actions from './';
import config from '../helpers/config';

export const sendMessage = (idInstance, apiTokenInstance, chatId, message) =>
    createPostAction([config.API_URL, `waInstance${idInstance}`, 'sendMessage', apiTokenInstance].join('/'), {chatId, message}, actions.MESSAGES.CREATE, {idInstance, apiTokenInstance, message});

export const getChatMessages = (idInstance, apiTokenInstance, chatId) =>
    createPostAction([config.API_URL, `waInstance${idInstance}`, 'GetChatHistory', apiTokenInstance].join('/'), {chatId}, actions.MESSAGES.FETCH_LIST, {idInstance, apiTokenInstance, chatId});
