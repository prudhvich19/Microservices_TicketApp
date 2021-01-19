import { NotfoundError, requireAuth, validateRequest } from '@pctickets/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets/:id', async (req:Request, res:Response) => {    
    const ticket = await Ticket.findById(req.params.id);  
    
    if(!ticket){
        throw new NotfoundError();
    }

    res.send(ticket);
});

export { router as showTicketRouter };