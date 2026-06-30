const http = require('http');
const https = require('https');

const unsafeDevtoolsPaths = [
    '/json/new',
    '/json/activate/',
    '/json/close/',
];

function shouldUsePut(options) {
    const path = options && typeof options === 'object' ? options.path : undefined;
    return (
        typeof path === 'string'
    && unsafeDevtoolsPaths.some((unsafePath) => path.startsWith(unsafePath))
    );
}

function patchGet(transport) {
    const originalGet = transport.get;

    transport.get = function patchedGet(options, callback) {
        if (!shouldUsePut(options)) {
            return originalGet.call(this, options, callback);
        }

        const request = transport.request(
            {
                ...options,
                method: 'PUT',
            },
            callback,
        );

        request.end();
        return request;
    };
}

patchGet(http);
patchGet(https);
