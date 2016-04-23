const STATUS_OK = 200;

const STATE_UNINITIALIZED = 0;
const STATE_LOADING = 1;
const STATE_LOADED = 2;
const STATE_INTERACTIVE = 3;
const STATE_COMPLETED = 4;

type ParamType = {[key: string]: any};

const buildUriWithParams = (uri: string, params: any) => `${uri}?${Object.keys(params).map(key => `${key}=${params[key]}`).join('&')}`;

export const getAsync = <Response>(url: string, params: ParamType = {}) => new Promise<Response>((resolve, reject) => {
    const req = new XMLHttpRequest();
    const doReject = () => {
        reject(req);
    };
    const doResolve = () => {
        if (req.readyState === STATE_COMPLETED && req.status === STATUS_OK) {
            resolve(JSON.parse(req.responseText));
        } else {
            doReject();
        }
    };

    req.addEventListener('load', doResolve);
    req.addEventListener('error', doReject);
    req.addEventListener('abort', doReject);

    if (params) {
        url = buildUriWithParams(url, params);
    }
    req.open('get', url, true);
    req.send();
});

export default {
    getAsync
};