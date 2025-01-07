import Base from "../../../Base";
import { High5OrganizationExecutionLogs } from "./log/index";
import { High5OrganizationExecutionStates } from "./status/index";

export class High5OrganizationExecute extends Base {
    public get logs(): High5OrganizationExecutionLogs {
        if (this._logs === undefined) {
            this._logs = new High5OrganizationExecutionLogs(this.options, this.axios);
        }
        return this._logs;
    }
    private _logs?: High5OrganizationExecutionLogs;
    public get status(): High5OrganizationExecutionStates {
        if (this._status === undefined) {
            this._status = new High5OrganizationExecutionStates(this.options, this.axios);
        }
        return this._status;
    }
    private _status?: High5OrganizationExecutionStates;

    /**
     * Cancel stream execution
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param high5ExecutionId ID of the stream execution
     * @returns 204 No Content
     */
    async cancelExecution(orgName: string, spaceName: string, high5ExecutionId: string): Promise<void> {
        await this.axios.get<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execution/${high5ExecutionId}/cancel`));
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
