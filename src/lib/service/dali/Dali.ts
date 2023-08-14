import base, { Options } from "../../base";
import { AxiosInstance } from "axios";
import { Version } from "../../interfaces/global";
import { DaliAvatar } from "./DaliAvatar";

export default class Dali extends base {
    /**
     * avatar handles everything around avatars
     */
    public avatar: DaliAvatar;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.avatar = new DaliAvatar(this.options, this.axios);
    }

    /**
     * Version requests the endpoint version
     * @returns Version object
     */
    version = async (): Promise<Version> => {
        const resp = await this.axios.get<Version>(this.getEndpoint("/v1/version")).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/dali${endpoint}`;
    }
}
