import { Publisher, Subjects, TicketUpdatedEvent } from "@pctickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    readonly subject = Subjects.TicketUpdated;
}