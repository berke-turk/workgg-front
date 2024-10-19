import amqp from 'amqplib';
import crypto from 'crypto';
import { Router, Request, Response, NextFunction } from 'express';

// Functions
import Joi from '../../../lib/functions/joi/authorize';

export async function SendOtp(req: Request, res: Response, next: NextFunction) {
    // Joi validate
    let validate = await Joi.SendOtp.Validate(req.body);
    if(validate.error){
        console.log("Joi Validate?!")
        res.status(200).json(validate.message);
        return;
    }
    req.body = validate.value; // Set body

    next();
}

export async function VerifyOtp(req: Request, res: Response, next: NextFunction) {
    // Joi validate
    let validate = await Joi.VerifyOtp.Validate(req.body);
    if(validate.error){
        console.log("Joi Validate?!")
        res.status(200).json(validate.message);
        return;
    }
    req.body = validate.value; // Set body

    next();
}

export async function Register(req: Request, res: Response, next: NextFunction) {
    // Joi validate
    let validate = await Joi.Register.Validate(req.body);
    if(validate.error){
        console.log("Joi Validate?!")
        res.status(200).json(validate.message);
        return;
    }
    req.body = validate.value; // Set body

    next();
}

export async function Password(req: Request, res: Response, next: NextFunction) {
    // Joi validate
    let validate = await Joi.Password.Validate(req.body);
    if(validate.error){
        console.log("Joi Validate?!")
        res.status(200).json(validate.message);
        return;
    }
    req.body = validate.value; // Set body

    next();
}

export async function RefreshToken(req: Request, res: Response, next: NextFunction) {
    // Joi validate
    let validate = await Joi.RefreshToken.Validate(req.body);
    if(validate.error){
        console.log("Joi Validate?!")
        res.status(200).json(validate.message);
        return;
    }
    req.body = validate.value; // Set body

    next();
}