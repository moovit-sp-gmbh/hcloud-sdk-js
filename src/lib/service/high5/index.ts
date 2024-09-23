import Base from "../../Base";
import { Version } from "../../interfaces/global";
import { High5OrganizationExecute } from "./execution";
import { High5Internal } from "./internal";
import { High5JoinToken } from "./joinToken";
import { High5Space } from "./space";
import { High5Wave } from "./wave";

export default class High5 extends Base {
    public get space(): High5Space {
        if (this._space === undefined) {
            this._space = new High5Space(this.options, this.axios);
        }
        return this._space;
    }
    private _space?: High5Space;
    public get internal(): High5Internal {
        if (this._internal === undefined) {
            this._internal = new High5Internal(this.options, this.axios);
        }
        return this._internal;
    }
    private _internal?: High5Internal;
    public get wave(): High5Wave {
        if (this._wave === undefined) {
            this._wave = new High5Wave(this.options, this.axios);
        }
        return this._wave;
    }
    private _wave?: High5Wave;
    public get joinToken(): High5JoinToken {
        if (this._joinToken === undefined) {
            this._joinToken = new High5JoinToken(this.options, this.axios);
        }
        return this._joinToken;
    }
    private _joinToken?: High5JoinToken;
    public get execution(): High5OrganizationExecute {
        if (this._execution === undefined) {
            this._execution = new High5OrganizationExecute(this.options, this.axios);
        }
        return this._execution;
    }
    private _execution?: High5OrganizationExecute;

    /**
     * Requests the endpoint version
     * @returns Version object
     */
    async version(): Promise<Version> {
        const resp = await this.axios.get<Version>(this.getEndpoint("/v1/version"));

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
