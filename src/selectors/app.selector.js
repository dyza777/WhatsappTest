import {createSelector} from 'reselect';

const appState = (state) => state.app;

export const isLoadingSelector = createSelector(
    appState,
    (state) => state.isLoading
);
