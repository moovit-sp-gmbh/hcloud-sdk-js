import { Axios } from "axios";
import base, { Options } from "../../base";
import { AuditLog } from "../../interfaces/Auditor";
import { Organization } from "../../interfaces/IDP";
import { IdpOrganizationMember } from "./IdpOrganizationMember";

export class IdpOrganization extends base {
    /**
     * member handles everything around organization members
     */
    public member: IdpOrganizationMember;

    constructor(opts: Options, axios: Axios) {
        super(opts, axios);

        this.member = new IdpOrganizationMember(opts, axios);
    }

    /**
     * updateOrganization update an organization
     * @param id the id of the organization
     * @param name a name for the new organization
     * @param company an opitional company for the new organization
     * @returns Organization object
     */
    public updateOrganization = async (id: string, name: string, company?: string): Promise<Organization> => {
        const organization = { name: name, company: company } as Organization;
        const resp = await this.axios.patch<Organization>(this.getEndpoint(`/v1/organization/${id}`), organization).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * createOrganization creates a new organization
     * @param name a name for the new organization
     * @param company an opitional company for the new organization
     * @returns Organization object
     */
    public createOrganization = async (name: string, company?: string): Promise<Organization> => {
        const organization = { name: name, company: company } as Organization;
        const resp = await this.axios.post<Organization>(this.getEndpoint(`/v1/organization`), organization).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * getOrganizationById requests an organization by its id
     * @param id the id of an organization
     * @returns Organization object
     */
    public getOrganizationById = async (id: string): Promise<Organization> => {
        const resp = await this.axios.get<Organization>(this.getEndpoint(`/v1/organization/${id}`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * deleteOrganizationById delete an organization by its id
     * @param id the id of an organization
     */
    public deleteOrganizationById = async (id: string): Promise<void> => {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/organization/${id}`)).catch((err: Error) => {
            throw err;
        });
    };

    /**
     * listOrganizations requests all organizations for a user
     * @param limit an opitional response limit (1-1000; dafaults to 500)
     * @param page an opitional page to skip certain results (page * limit; defaults to 0)
     * @returns Organization array
     */
    public listOrganizations = async (limit?: number, page?: number): Promise<[Organization[], number]> => {
        limit = limit || 500;
        page = page || 0;

        const resp = await this.axios.get<Organization[]>(this.getEndpoint(`/v1/organization?limit=${limit}&page=${page}`)).catch((err: Error) => {
            throw err;
        });

        return [resp.data, parseInt(resp.headers.total, 10)];
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.opts.api}/api/account${endpoint}`;
    }
}
