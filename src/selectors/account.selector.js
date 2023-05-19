import {createSelector} from 'reselect';

const accountState = (state) => state.account;

export const userInfoSelector = createSelector(
    accountState,
    (state) => state.userInfo
);
