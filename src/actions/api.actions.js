import actions from './';

const defaultTypes = actions.API;

const createApiAction = (url = '', params = {}, types = defaultTypes, context = null, _fakeResponse = null) => ({
    type: actions.API.ACTION,
    payload: {
        url,
        params,
        context,
        _fakeResponse
    },
    types
});

const createGetAction = (url, types = defaultTypes, context = null) =>
    createApiAction(
        context.pagination
            ? `${url}?limit=${context.pagination.limit}&offset=${context.pagination.offset}&sort=${context.pagination
                  .sort || ''}&dir=${context.pagination.dir || ''}&search=${context.pagination.search ||
                  ''}&role=${context.pagination.role || ''}&status=${context.pagination.status || ''}`
            : url,
        {method: 'GET'},
        types,
        context
    );

const createPostAction = (url, payload = null, types = defaultTypes, context = null) =>
    createApiAction(
        url,
        {
            method: 'POST',
            body: payload
                ? context.params && context.params.contentTypeHeader
                    ? payload
                    : JSON.stringify(payload)
                : null,
            params: context && context.params,
            contentTypeHeader: (context.params && context.params.contentTypeHeader) || false
        },
        types,
        context
    );

const createPutAction = (url, payload = null, types = defaultTypes, context = null) =>
    createApiAction(url, {method: 'PUT', body: payload ? JSON.stringify(payload) : null}, types, context);

const createDeleteAction = (url, payload = null, types = defaultTypes, context = null) =>
    createApiAction(url, {method: 'DELETE'}, types, context);

export {createApiAction, createGetAction, createPostAction, createPutAction, createDeleteAction};