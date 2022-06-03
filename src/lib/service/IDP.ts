import base, { Options } from "../base";
import axios, { AxiosPromise } from "axios";
import { Token, User } from "../dto/IDP";

export default class IDP extends base {
    /**
     * Authorize validates a token
     * @param token
     * @returns User object
     */
    authorize = async (): Promise<User> => {
        const resp = await axios.post<User>(this.getEndpoint("/v1/authenticate"), {}, {}).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * Register against the identity provider
     * @param name
     * @param email
     * @param password
     * @returns Bearer Token
     */
    register = async (name: string, email: string, password: string): Promise<User> => {
        const resp = await axios
            .post<User>(this.getEndpoint("/v1/registration"), { name: name, email: email, password: password })
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * Authenticate against the identity provider with a given email and password.
     * @param email
     * @param password
     * @returns Bearer Token
     */
    authenticate = async (email: string, password: string): Promise<Token> => {
        const resp = await axios.post<User>(this.getEndpoint("/v1/authorize"), { email: email, password: password }).catch((err: Error) => {
            throw err;
        });

        // tslint-disable: no-string-literal
        const token: Token = { token: resp.headers.authorization };
        return token;
    };

    /**
     * authenticateReturnUser against the identity provider with a given email and password.
     * @param email
     * @param password
     * @returns User object
     */
    authenticateReturnUser = async (email: string, password: string): Promise<User> => {
        const resp = await axios.post<User>(this.getEndpoint("/v1/authorize"), { email: email, password: password }).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    private getEndpoint(endpoint: string): string {
        return `${this.opts.api}/api/account${endpoint}`;
    }
}
