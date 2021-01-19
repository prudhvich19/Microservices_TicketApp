import { ExpirationCompleteEvent, Publisher, Subjects } from '@pctickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    readonly subject = Subjects.ExpirationComplete;
}