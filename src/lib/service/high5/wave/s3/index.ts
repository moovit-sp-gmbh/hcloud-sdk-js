import { AxiosInstance } from "axios"
import Base, { Options } from "../../../../Base"
import { disableCacheHeaders } from "../../../../interfaces/axios"
import {
    Catalog,
    CatalogRegistry,
    Engine,
    EngineRegistry,
    StreamNodeSpecifications,
    StreamNodeSpecificationWrappedWithEngineVersion,
} from "../../../../interfaces/high5"

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
    public getCatalogRegistry = async (waveBucketUrl: string): Promise<CatalogRegistry> => {
        const resp = await this.axios.get<CatalogRegistry>(`${waveBucketUrl}/catalogs/registry.json`, { headers: disableCacheHeaders });

        return resp.data;
    };

    /**
     * Get the registry.json of the default wave engine from the S3 bucket
     * @param waveBucketUrl Public base url to S3 bucket
     * @returns registry.json
     */
    public getEngineRegistry = async (waveBucketUrl: string): Promise<EngineRegistry> => {
        const resp = await this.axios.get<EngineRegistry>(`${waveBucketUrl}/engines/registry.json`, { headers: disableCacheHeaders });

        return resp.data;
    };

    /**
     * Get the catalog.json from the S3 bucket
     * @param catalogUrl Public url of the catalog
     * @returns index.json of catalog
     */
    public getCatalog = async (catalogUrl: string): Promise<Catalog> => {
        const resp = await this.axios.get<Catalog>(`${catalogUrl}`, { headers: disableCacheHeaders });

        return resp.data;
    };

    /**
     * Get the catalog.json from the S3 bucket
     * @param catalogUrl Public url of the catalog
     * @returns index.json of catalog
     */
    public getEngine = async (engineUrl: string): Promise<Engine> => {
        const resp = await this.axios.get<Engine>(`${engineUrl}`, { headers: disableCacheHeaders });

        return resp.data;
    };

    /**
     * Get the node specifications of all nodes of a specific catalog version from the S3 bucket
     * @param catalogUrl Public url of the catalog
     * @param version The catalog version
     * @returns StreamNodeSpecification[] | StreamNodeSpecificationWrappedWithEngineVersion an array of all node specification of that catalog version, maybe wrapped in an object with the engine version
     */
    public getCatalogVersion = async (
        catalogUrl: string,
        version: string
    ): Promise<StreamNodeSpecifications[] | StreamNodeSpecificationWrappedWithEngineVersion> => {
        const specificationUrl = catalogUrl.split("/").slice(0, -1).join("/") + "/" + version + "/specification.json";
        const resp = await this.axios.get<StreamNodeSpecifications[] | StreamNodeSpecificationWrappedWithEngineVersion>(specificationUrl, {
            headers: disableCacheHeaders,
        });

        return resp.data;
    };

    /**
     * Get the node documentation from the S3 bucket
     * @param catalogUrl Public url of the catalog
     * @param version The catalog version
     * @returns string the markdown documentation of the node
     */
    public getNodeDocumentation = async (catalogUrl: string, version: string, nodeName: string): Promise<string> => {
        const specificationUrl = catalogUrl.split("/").slice(0, -1).join("/") + `/${version}/docs/${nodeName}.md`;
        const resp = await this.axios.get<string>(specificationUrl).catch(err => {
            throw new Error(`Node documentation not found: ${err}`);
        });

        return resp.data;
    };

    protected getEndpoint(): string {
        throw new Error("Method not implemented.");
    }
}
