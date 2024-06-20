import { auth } from "../services/auth.service";

function auth_signup(data) {
    return auth.signup(data);
}

function auth_signin(data) {
    return auth.signin(data);
}

export { auth_signup, auth_signin };