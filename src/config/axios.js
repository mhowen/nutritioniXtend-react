import axios from "axios";

let nixUrl = '';
let nixHeaders = {
    'x-app-id':'',
    'x-app-key':'',
};

if (import.meta.env.VITE_USING_API === 'live') {
    nixUrl = 'https://trackapi.nutritionix.com/v2';
    nixHeaders["x-app-id"] = import.meta.env.VITE_NIX_APP_ID;
    nixHeaders["x-app-key"] = import.meta.env.VITE_NIX_APP_KEY;
}

export const nixClient = axios.create({
    baseURL: nixUrl,
    headers: nixHeaders,
});

nixClient.defaults.headers.post['Content-Type'] = 'application/json';

