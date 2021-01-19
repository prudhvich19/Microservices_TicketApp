import { Publisher, Subjects, OrderCreatedEvent } from "@pctickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    readonly subject = Subjects.OrderCreated;
}