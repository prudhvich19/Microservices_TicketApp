import { Publisher, PaymentCreatedEvent, Subjects } from '@pctickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    readonly subject = Subjects.PaymentCreated;
    
}