import axios from "axios";
import base, { Options } from "../../base";
import { AuditLog } from "../../interfaces/Auditor";
import { Organization } from "../../interfaces/IDP";
import { IdpOrganizationMember } from "./IdpOrganizationMember";

export class IdpOrganization extends base {
    /**
     * member handles everything around organization members
     */
    public member: IdpOrganizationMember;

    constructor(opts: Options) {
        super(opts);

        this.member = new IdpOrganizationMember(opts);
    }

    /**
     * createOrganization creates a new organization
     * @param name a name for the new organization
     * @param company an opitional company for the new organization
     * @returns Organization object
     */
    public createOrganization = async (name: string, company?: string): Promise<Organization> => {
        const organization = { name: name, company: company } as Organization;
        const resp = await axios.post<Organization>(this.getEndpoint(`/v1/organization`), organization).catch((err: Error) => {
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
        const resp = await axios.get<Organization>(this.getEndpoint(`/v1/organization/${id}`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * deleteOrganizationById delete an organization by its id
     * @param id the id of an organization
     */
    public deleteOrganizationById = async (id: string): Promise<void> => {
        const resp = await axios.delete<void>(this.getEndpoint(`/v1/organization/${id}`)).catch((err: Error) => {
            throw err;
        });
    };

    /**
     * listOrganizations requests all organizations for a user
     * @param limit an opitional response limit (1-1000; dafaults to 500)
     * @param page an opitional page to skip certain results (page * limit; defaults to 0)
     * @returns Organization array
     */
    public listOrganizations = async (limit?: number, page?: number): Promise<Organization[]> => {
        limit = limit || 500;
        page = page || 0;

        const resp = await axios.get<Organization[]>(this.getEndpoint(`/v1/organization?page=${page}&limit=${limit}`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.opts.api}/api/account${endpoint}`;
    }
}
