//Login: denis.m.pcspace@gmail.com
//Password: dmgame12345

const lsTokenKey = "my_app_token";

function setToken(req) {
    
    const isAuthURL = req.url.includes("auth");
    
    if (!isAuthURL) {
        console.log("setToken");
        const token = localStorage.getItem(lsTokenKey);
        req.headers['x-access-token'] = token;
    }
    
    console.log(req);
    return req;
}

function setTokenOnLogin(res) {
    
    const isLoginURL = res.config.url.includes("login");
    
    if (isLoginURL) {
        console.log("setTokenOnLogin");
        const token = res.data.token;
        localStorage.setItem(lsTokenKey, token);
    }
    
    return res;
}

function getClearResponse(res) {
    console.log("getClearResponse");
    return res.data;
}

function onError(err) {
    console.dir(err);
    return Promise.reject(err);
}

export default function(axios) {
    axios.interceptors.request.use(setToken);
    axios.interceptors.response.use(setTokenOnLogin);
    axios.interceptors.response.use(getClearResponse, onError);
}
