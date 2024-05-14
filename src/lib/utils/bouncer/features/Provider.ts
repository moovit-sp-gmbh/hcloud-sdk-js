import { BouncerContext, HcloudFeature } from "../../../interfaces/bouncer";

export type BouncerProviderLogger = (
    featureName: string,
    defaultValue: boolean,
    result: boolean,
    context?: BouncerContext,
    feature?: HcloudFeature
) => void;

export class BouncerProvider {
    private features: HcloudFeature[];
    private context?: BouncerContext;
    private logger?: BouncerProviderLogger;

    constructor(features: HcloudFeature[], context?: BouncerContext, logger?: BouncerProviderLogger) {
        this.features = features;
        this.context = context;
        this.logger = logger;
    }

    /* eslint-disable complexity */
    isEnabled(featureName: string, defaultValue: boolean, context?: BouncerContext): boolean {
        const feature = this.features.find(f => f.feature.name === featureName);
        let result = defaultValue;
        if (feature) {
            result =
                feature.feature.enabled &&
                this.doesMatchOrganization(feature, context ?? this.context) &&
                this.doesMatchUser(feature, context ?? this.context) &&
                this.doesMatchRegion(feature, context ?? this.context);
        }

        if (this.logger) {
            this.logger(featureName, defaultValue, result, context ?? this.context, feature);
        }

        return result;
    }

    addFeature(feature: HcloudFeature) {
        this.features.push(feature);
    }

    setFeatures(features: HcloudFeature[]) {
        this.features = features;
    }

    setContext(context: BouncerContext) {
        this.context = context;
    }

    updateContext({ region, email, organization }: BouncerContext) {
        if (!this.context) {
            this.context = {
                email,
                organization,
                region,
            };
        } else {
            this.context.email = email ?? this.context.email;
            this.context.organization = organization ?? this.context.organization;
            this.context.region = region ?? this.context.region;
        }
    }

    /* eslint-disable @typescript-eslint/no-non-null-assertion*/
    private doesMatchRegion(feature: HcloudFeature, context?: BouncerContext): boolean {
        if (feature.regions.length) {
            if (context?.region) {
                return (
                    feature.regions.map(r => r.replace("*", "(.+)")).find(r => r === context?.region || new RegExp(r).test(context.region!)) !==
                    undefined
                );
            }
            return false;
        }
        return true;
    }

    /* eslint-disable @typescript-eslint/no-non-null-assertion*/
    private doesMatchUser(feature: HcloudFeature, context?: BouncerContext): boolean {
        if (feature.users.length) {
            if (context?.email) {
                return (
                    feature.users.map(u => u.replace("*", "(.+)")).find(u => u === context.email || new RegExp(u).test(context.email!)) !== undefined
                );
            }
            return false;
        }
        return true;
    }

    /* eslint-disable @typescript-eslint/no-non-null-assertion*/
    private doesMatchOrganization(feature: HcloudFeature, context?: BouncerContext): boolean {
        if (feature.organizations.length) {
            if (context?.organization) {
                return (
                    feature.organizations
                        .map(o => o.replace("*", "(.+)"))
                        .find(o => o === context.organization || new RegExp(o).test(context.organization!)) !== undefined
                );
            }
            return false;
        }
        return true;
    }
}
