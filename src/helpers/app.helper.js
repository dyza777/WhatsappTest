import { connect as reduxConnect } from 'react-redux';

export const selectFromState = (path, defaultValue) => state => state.getIn(path, defaultValue);

export const wrapSelectors = func => (...args) => func(...args);

export const connector = ({ selector, actions }) => {
  let connectedSelector = selector;

  return component => {
    let connectedComponent = component;

    connectedComponent = reduxConnect(
      wrapSelectors(connectedSelector),
      actions,
    )(connectedComponent);

    return connectedComponent;
  };
};