import amqp from 'amqplib';
import crypto from 'crypto';
import { Router, Request, Response, NextFunction } from 'express';

// Functions
import Joi from '../../../lib/functions/joi/user';

export async function Create(req: Request, res: Response, next: NextFunction) {
    // Joi validate
    let validate = await Joi.Create.Validate(req.body);
    if(validate.error){
        console.log("Joi Validate?!")
        res.status(200).json(validate.message);
        return;
    }
    req.body = validate.value; // Set body

    next();
}

export async function List(req: Request, res: Response, next: NextFunction) {
    // Joi validate queries
    let validate_queries = await Joi.List_Query.Validate(req.query);
    if(validate_queries.error){
        console.log("Joi Validate?!")
        res.status(200).json(validate_queries.message);
        return;
    }
    req.query = validate_queries.value; // Set query

    next();
}
// check