import Base from "../../Base";
import { Version } from "../../interfaces/global";
import { FuseInternal } from "./internal";
import { FuseSpaceInternal } from "./internal/space";
import { FuseSpace } from "./space";

export default class Fuse extends Base {
    public get space(): FuseSpace {
        if (this._space === undefined) {
            this._space = new FuseSpace(this.options, this.axios);
        }
        return this._space;
    }
    private _space?: FuseSpace;
    public get internal(): FuseInternal {
        if (this._internal === undefined) {
            this._internal = new FuseInternal(this.options, this.axios);
        }
        return this._internal;
    }
    private _internal?: FuseInternal;
    public get spaceInternal(): FuseSpaceInternal {
        if (this._spaceInternal === undefined) {
            this._spaceInternal = new FuseSpaceInternal(this.options, this.axios);
        }
        return this._spaceInternal;
    }
    private _spaceInternal?: FuseSpaceInternal;

    /**
     * @returns Object containing the version as a string
     */
    async version(): Promise<Version> {
        const resp = await this.axios.get<Version>(this.getEndpoint("/v1/version"), {});

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/fuse${endpoint}`;
    }
}
