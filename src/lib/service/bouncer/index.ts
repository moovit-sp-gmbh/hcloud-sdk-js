import Base from "../../Base";
import BouncerFeatures from "./features";

export default class Bouncer extends Base {
    public get features(): BouncerFeatures {
        if (this._features === undefined) {
            this._features = new BouncerFeatures(this.options, this.axios);
        }
        return this._features;
    }
    private _features?: BouncerFeatures;

    protected getEndpoint(endpoint: string): string {
        return `https://config.s3.helmut.cloud/featureflags${endpoint}`;
    }
}
