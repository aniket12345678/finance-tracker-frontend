import { frontEndUrl } from "../config/Api";

const signup = (data) => {
    return frontEndUrl.post('/user/signup', data);
}

const signin = (data) => {
    return frontEndUrl.post('/user/signin', data);
}

const auth = {
    signin: signin,
    signup: signup,
}

export { auth }