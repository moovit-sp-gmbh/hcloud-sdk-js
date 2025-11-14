import axios, { AxiosInstance } from "axios";
import { version } from "../../../../../package.json";
import Base, { MaybeRaw, Options } from "../../../../Base";
import { disableCacheHeaders } from "../../../../interfaces/axios";
import {
    Catalog,
    CatalogRegistry,
    Engine,
    EngineRegistry,
    StreamNodeSpecifications,
    StreamNodeSpecificationWrappedWithEngineVersion,
    WildcardRegistry,
} from "../../../../interfaces/high5";
import { Release } from "../../../../interfaces/high5/wave/changelog";

const sdkVersion = "hcloud-sdk-js/v" + version;
/**
 * Class for reading the S3 bucket of a wave engine and catalogs
 */
export class S3 extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Get the registry.json of the default wave catalog from the S3 bucket
     * @param waveBucketUrl Public base url to S3 bucket
     * @returns registry.json
     */
    async getCatalogRegistry<R extends boolean = false>(waveBucketUrl: string, raw?: { raw: R }): Promise<MaybeRaw<R, CatalogRegistry>> {
        const resp = await axios.get<CatalogRegistry>(`${waveBucketUrl}/catalogs/registry.json`, {
            headers: { ...disableCacheHeaders, "x-hcloud-user-agent": sdkVersion, Authorization: undefined },
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, CatalogRegistry>;
    }

    /**
     * Get the registry.json of the default wave engine from the S3 bucket
     * @param waveBucketUrl Public base url to S3 bucket
     * @returns registry.json
     */
    async getEngineRegistry<R extends boolean = false>(waveBucketUrl: string, raw?: { raw: R }): Promise<MaybeRaw<R, EngineRegistry>> {
        const resp = await axios.get<EngineRegistry>(`${waveBucketUrl}/engines/registry.json`, {
            headers: { ...disableCacheHeaders, "x-hcloud-user-agent": sdkVersion, Authorization: undefined },
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, EngineRegistry>;
    }

    /**
     * Get the catalog.json from the S3 bucket
     * @param catalogUrl Public url of the catalog
     * @returns index.json of catalog
     */
    async getCatalog<R extends boolean = false>(catalogUrl: string, raw?: { raw: R }): Promise<MaybeRaw<R, Catalog>> {
        const resp = await axios.get<Catalog>(`${catalogUrl}`, {
            headers: { ...disableCacheHeaders, "x-hcloud-user-agent": sdkVersion, Authorization: undefined },
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Catalog>;
    }

    /**
     * Get the catalog.json from the S3 bucket
     * @param catalogUrl Public url of the catalog
     * @returns index.json of catalog
     */
    async getEngine<R extends boolean = false>(engineUrl: string, raw?: { raw: R }): Promise<MaybeRaw<R, Engine>> {
        const resp = await axios.get<Engine>(`${engineUrl}`, {
            headers: { ...disableCacheHeaders, "x-hcloud-user-agent": sdkVersion, Authorization: undefined },
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Engine>;
    }

    /**
     * Get a list of available wildcards of a specific engine version from the S3 bucket
     * @param engineUrl Public url of the engine
     * @param engineVersion Version of the enigne
     * @returns Wildcards.json list of available wildcards
     */
    async getWildcardsOfEngine<R extends boolean = false>(
        engineUrl: string,
        engineVersion: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, WildcardRegistry>> {
        const resp = await axios.get<WildcardRegistry>(`${engineUrl.replace("/index.json", "")}/${engineVersion}/wildcards.json`, {
            headers: { ...disableCacheHeaders, "x-hcloud-user-agent": sdkVersion, Authorization: undefined },
        });
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, WildcardRegistry>;
    }

    /**
     * Get the node specifications of all nodes of a specific catalog version from the S3 bucket
     * @param catalogUrl Public url of the catalog
     * @param version The catalog version
     * @returns StreamNodeSpecification[] | StreamNodeSpecificationWrappedWithEngineVersion an array of all node specification of that catalog version, maybe wrapped in an object with the engine version
     */
    async getCatalogVersion<R extends boolean = false>(
        catalogUrl: string,
        version: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, StreamNodeSpecifications[] | StreamNodeSpecificationWrappedWithEngineVersion>> {
        const specificationUrl = catalogUrl.split("/").slice(0, -1).join("/") + "/" + version + "/specification.json";
        const resp = await axios.get<StreamNodeSpecifications[] | StreamNodeSpecificationWrappedWithEngineVersion>(specificationUrl, {
            headers: { ...disableCacheHeaders, "x-hcloud-user-agent": sdkVersion, Authorization: undefined },
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, StreamNodeSpecifications[] | StreamNodeSpecificationWrappedWithEngineVersion>;
    }

    /**
     * Get the node documentation from the S3 bucket
     * @param catalogUrl Public url of the catalog
     * @param version The catalog version
     * @returns string the markdown documentation of the node
     */
    async getNodeDocumentation<R extends boolean = false>(
        catalogUrl: string,
        version: string,
        nodeName: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, string>> {
        const specificationUrl = catalogUrl.split("/").slice(0, -1).join("/") + `/${version}/docs/${nodeName}.md`;
        const resp = await axios
            .get<string>(specificationUrl, { headers: { ...disableCacheHeaders, "x-hcloud-user-agent": sdkVersion, Authorization: undefined } })
            .catch(err => {
                throw new Error(`Node documentation not found: ${err}`);
            });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, string>;
    }

    /**
     * Get the catalogs changelog from the S3 bucket
     * @param catalogUrl Public url of the catalog
     * @returns string the changelog.json of the node
     */
    async getChangelog<R extends boolean = false>(catalogUrl: string, raw?: { raw: R }): Promise<MaybeRaw<R, Release[]>> {
        const resp = await axios
            .get<
                Release[]
            >(catalogUrl + "changelog.json", { headers: { ...disableCacheHeaders, "x-hcloud-user-agent": sdkVersion, Authorization: undefined } })
            .catch(err => {
                throw new Error(`Node documentation not found: ${err}`);
            });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Release[]>;
    }

    protected getEndpoint(): string {
        throw new Error("Method not implemented.");
    }
}
