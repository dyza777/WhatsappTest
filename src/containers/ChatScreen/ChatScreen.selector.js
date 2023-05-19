import { createSelector } from 'reselect';
import { userInfoSelector } from '../../selectors/account.selector';
import { isLoadingSelector } from '../../selectors/app.selector';
import { messagesListSelector, chatterNumberSelector } from '../../selectors/messages.selector';

export default createSelector(userInfoSelector,isLoadingSelector,messagesListSelector, chatterNumberSelector,
    (userInfo, isLoading, messagesList,chatterNumber) =>
    ({ ...userInfo, isLoading, messagesList, chatterNumber}));