import { Subjects } from './subjects';
export interface OrderCancelledEvent extends Event {
    subject: Subjects.OrderCancelled;
    data: {
        id: string;
        version: number;
        ticket: {
            id: string;
        };
    };
}
