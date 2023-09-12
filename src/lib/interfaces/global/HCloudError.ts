export default class HCloudError extends Error {
    status: number;
    statusText: string;
    code: string;
    error: string;
    message: string;

    constructor(status: number, statusText: string, code: string, error: string, message: string) {
        super(message);

        this.status = status;
        this.statusText = statusText;
        this.code = code;
        this.error = error;
        this.message = message;
    }
}
