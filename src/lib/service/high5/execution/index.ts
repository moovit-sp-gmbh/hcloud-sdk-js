import { AxiosInstance } from "axios";
import Base, { Options } from "../../../Base";
import { High5OrganizationExecutionLogs } from "./log/index";
import { High5OrganizationExecutionStates } from "./status/index";

export class High5OrganizationExecute extends Base {
    public logs: High5OrganizationExecutionLogs;
    public status: High5OrganizationExecutionStates;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.logs = new High5OrganizationExecutionLogs(options, axios);
        this.status = new High5OrganizationExecutionStates(options, axios);
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
