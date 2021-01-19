import { Subjects }  from './subjects';
import { OrderStatus } from './types/order-status';

export interface OrderCancelledEvent extends Event{
    subject: Subjects.OrderCancelled;
    data: {
        id: string,
        version: number,
        ticket: {
            id: string
        }
    }
}