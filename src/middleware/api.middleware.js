import {has} from 'lodash';
import actions from '../actions';
import {startLoading, endLoading} from '../actions/app.actions';

const deserialize = (res, options) => {
    const header = res.headers ? res.headers.get('Content-Type') || '' : '';
    if (header.indexOf('application/json') > -1) {
        return res.json();
    }
    if (options.blob) {
        return res.blob();
    }
    if (typeof res.text === 'function') {
        return res.text();
    }

    if (res instanceof Error) {
        return new Promise((resolve, reject) => {
            reject({
                status: 0,
                statusText: res.message
            });
        });
    }
    return new Promise((resolve, reject) => {
        reject({
            status: res.status,
            statusText: res.statusText
        });
    });
};

const checkStatus = (res) => {
    if (res.status >= 200 && res.status < 400) {
        return res;
    }
    throw res;
};

const createResponse = (options) => (res) =>
    deserialize(res, options).then((value) => ({
        url: res.url,
        status: res.status,
        statusText: res.statusText,
        headers: res.headers,
        value
    }));

const createErrorResponse = (options) => (res) =>
    deserialize(res, options).then((value) => {
        throw {
            url: res.url,
            status: res.status,
            statusText: res.statusText,
            headers: res.headers,
            value
        };
    });

const api = ({dispatch, getState}) => (next) => async (action) => {
    console.log(action);
    const {payload, types} = action;
    if (action.type !== actions.API.ACTION) {
        return next(action);
    }
    const {REQUEST, SUCCESS, ERROR} = types;

    dispatch({type: REQUEST, payload});

    if (!payload.context || !payload.context.omitLoadingAction) {
        dispatch(startLoading(payload.url, payload && payload.context ? payload.context.loading : null));
    }

    let defaultHeaders = {
        Accept: 'application/json',
        'Cache-Control': 'no-cache'
    };

    if (!payload.params.contentTypeHeader) {
        defaultHeaders = {
            ...defaultHeaders,
            'Content-Type': 'application/json'
        };
    }

    const fetchParams = {
        ...payload.params,
        headers: {...defaultHeaders, ...payload.params.headers}
    };

    const {url} = payload;
    return fetch(url, fetchParams)
        .then(checkStatus)
        .then(createResponse({blob: !!payload.saveAs}), createErrorResponse({}))
        .then(
            (res) => {
                // SUCCESSFUL RESPONSE
                const successAction = {result: res, type: SUCCESS, payload};
                return dispatch(successAction);
            },
            (res) => {
                // ERROR RESPONSE
                dispatch(endLoading(payload.url));
                switch (res.status) {
                    case 401:
                        break;
                    case 404:
                        break;
                    case 400:
                        break;
                    case 500:
                        break;
                    default:
                        break;
                }
                return dispatch({error: res, type: ERROR, payload});
            }
        );
};

export default api;