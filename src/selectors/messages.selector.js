import {createSelector} from 'reselect';

const messagesState = (state) => state.messages;

export const messagesListSelector = createSelector(
    messagesState,
    (state) => state.messagesList
);

export const chatterNumberSelector = createSelector(
    messagesState,
    (state) => state.chatterNumber
);

