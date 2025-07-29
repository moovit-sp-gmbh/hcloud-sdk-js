import Base from "../../Base";
import { Version } from "../../interfaces/global";
import { CosmoAsset } from "./asset";
import { CosmoComment } from "./comment";
import { CosmoFolder } from "./folder";
import { CosmoLocation } from "./location";
import { CosmoNamespace } from "./namespace";
import { CosmoProduction } from "./production";
import { CosmoShare } from "./share";
import { CosmoSpace } from "./space";

export default class CosmoService extends Base {
    public get cosmoAsset(): CosmoAsset {
        if (this._cosmoAsset === undefined) {
            this._cosmoAsset = new CosmoAsset(this.options, this.axios);
        }
        return this._cosmoAsset;
    }
    private _cosmoAsset?: CosmoAsset;

    public get cosmoSpace(): CosmoSpace {
        if (this._cosmoSpace === undefined) {
            this._cosmoSpace = new CosmoSpace(this.options, this.axios);
        }
        return this._cosmoSpace;
    }
    private _cosmoSpace?: CosmoSpace;

    public get cosmoLocation(): CosmoLocation {
        if (this._cosmoLocation === undefined) {
            this._cosmoLocation = new CosmoLocation(this.options, this.axios);
        }
        return this._cosmoLocation;
    }
    private _cosmoLocation?: CosmoLocation;

    public get cosmoProduction(): CosmoProduction {
        if (this._cosmoProduction === undefined) {
            this._cosmoProduction = new CosmoProduction(this.options, this.axios);
        }
        return this._cosmoProduction;
    }
    private _cosmoProduction?: CosmoProduction;

    public get cosmoFolder(): CosmoFolder {
        if (this._cosmoFolder === undefined) {
            this._cosmoFolder = new CosmoFolder(this.options, this.axios);
        }
        return this._cosmoFolder;
    }
    private _cosmoFolder?: CosmoFolder;

    public get cosmoNamespace(): CosmoNamespace {
        if (this._cosmoNamespace === undefined) {
            this._cosmoNamespace = new CosmoNamespace(this.options, this.axios);
        }
        return this._cosmoNamespace;
    }
    private _cosmoNamespace?: CosmoNamespace;

    public get cosmoComment(): CosmoComment {
        if (this._cosmoComment === undefined) {
            this._cosmoComment = new CosmoComment(this.options, this.axios);
        }
        return this._cosmoComment;
    }
    private _cosmoComment?: CosmoComment;

    public get cosmoShare(): CosmoShare {
        if (this._cosmoShare === undefined) {
            this._cosmoShare = new CosmoShare(this.options, this.axios);
        }
        return this._cosmoShare;
    }
    private _cosmoShare?: CosmoShare;

    /**
     * Requests the endpoint version
     * @returns Version object
     */
    async version(): Promise<Version> {
        const resp = await this.axios.get<Version>(this.getEndpoint("/v1/version"));

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/cosmo${endpoint}`;
    }
}
