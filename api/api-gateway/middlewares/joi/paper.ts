import amqp from 'amqplib';
import crypto from 'crypto';
import { Router, Request, Response, NextFunction } from 'express';

// Functions
import Joi from '../../../lib/functions/joi/paper';

export async function Create(req: Request, res: Response, next: NextFunction) {
    // Joi validate
    let validate = await Joi.Create.Validate(req.body);
    if (validate.error) {
        console.log("Joi Validate?!")
        res.status(200).json(validate.message);
        return;
    }
    req.body = validate.value; // Set body

    next();
}

export async function List(req: Request, res: Response, next: NextFunction) {
    // Joi validate query
    let validate_query = await Joi.List_Query.Validate(req.query);
    if (validate_query.error) {
        console.log("Joi Validate?!")
        res.status(200).json(validate_query.message);
        return;
    }
    req.query = validate_query.value; // Set Query

    next();
}

export async function Details(req: Request, res: Response, next: NextFunction) {
    // Joi validate params
    let validate_params = await Joi.Details_Param.Validate(req.params);
    if (validate_params.error) {
        console.log("Joi Validate?!")
        res.status(200).json(validate_params.message);
        return;
    }
    req.params = validate_params.value; // Set Params

    next();
}

export async function EditPage(req: Request, res: Response, next: NextFunction) {
    // Joi validate params
    let validate_params = await Joi.EditPage_Param.Validate(req.params);
    if (validate_params.error) {
        console.log("Joi Validate?!")
        res.status(200).json(validate_params.message);
        return;
    }
    req.params = validate_params.value; // Set Params

    next();
}

export async function Update(req: Request, res: Response, next: NextFunction) {
    // Joi validate params
    let validate_params = await Joi.Update_Param.Validate(req.params);
    if (validate_params.error) {
        console.log("Joi Validate?!")
        res.status(200).json(validate_params.message);
        return;
    }
    req.params = validate_params.value; // Set Params

    // Joi validate
    let validate = await Joi.Update.Validate(req.body);
    if (validate.error) {
        console.log("Joi Validate?!")
        res.status(200).json(validate.message);
        return;
    }
    req.body = validate.value; // Set body

    next();
}

export async function Delete(req: Request, res: Response, next: NextFunction) {
    // Joi validate params
    let validate_params = await Joi.Delete_Param.Validate(req.params);
    if (validate_params.error) {
        console.log("Joi Validate?!")
        res.status(200).json(validate_params.message);
        return;
    }
    req.params = validate_params.value; // Set Params

    next();
}