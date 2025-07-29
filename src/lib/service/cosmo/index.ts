import Base from "../../Base";
import { Version } from "../../interfaces/global";
import { CosmoAsset } from "./asset";
import { CosmoFolder } from "./folder";
import { CosmoLocation } from "./location";
import { CosmoProduction } from "./production";
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
