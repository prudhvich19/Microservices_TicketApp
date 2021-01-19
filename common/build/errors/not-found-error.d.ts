import { CustomError } from './custom-error';
export declare class NotfoundError extends CustomError {
    statusCode: number;
    constructor();
    serializeError(): {
        message: string;
    }[];
}
