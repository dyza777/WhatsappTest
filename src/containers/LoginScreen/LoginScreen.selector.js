import { createSelector } from 'reselect';
import { userInfoSelector } from '../../selectors/account.selector';
import { isLoadingSelector } from '../../selectors/app.selector';

export default createSelector(userInfoSelector,isLoadingSelector, (userInfo, isLoading) => ({ ...userInfo, isLoading }));