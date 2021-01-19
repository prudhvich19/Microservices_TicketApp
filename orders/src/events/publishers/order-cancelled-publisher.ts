import { Publisher, Subjects, OrderCancelledEvent } from "@pctickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    readonly subject = Subjects.OrderCancelled;
}