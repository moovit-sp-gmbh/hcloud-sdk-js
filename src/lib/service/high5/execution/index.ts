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

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
