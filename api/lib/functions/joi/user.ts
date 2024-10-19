import Joi from 'joi';
import JoiReturnParams from '../../types/joi/returnParams';

// Lib
import UserStatuses from '../../types/user/statuses';
import UserTypes from '../../types/user/types';
import Roles from '../../types/roles';

export default {
    Create: {
        Validate: function (data: any): JoiReturnParams {
            // Joi Request Read
            let requestSchema = Joi.object({
                'firstname': Joi.string().default(null),
                'lastname': Joi.string().default(null),
                'identity': Joi.string().default(null),
                'birthday': Joi.string().isoDate().default(null),
                'email': Joi.string().email({ tlds: false }).default(null),
                'password': Joi.string().default(null),
                'country_code': Joi.string().default(null), // +90 formatında gelecektir.
                'phone': Joi.string().trim().default(null), // telefon numarasının devamı 5554443322 gibi.
                'user_type': Joi.string().default(UserTypes.Driver),
                'role_type': Joi.string().default(Roles.Individual),
                'company': Joi.object({
                    'title_legal': Joi.string().required(),
                    'title_brand': Joi.string().required(),
                    'tax_no': Joi.string().required(),
                    'tax_office': Joi.string().required(),
                    'address': Joi.string().required(),
                }).default(null),
            }).warning('error', { x: 'field' }).message("field_!!");
            try {
                let validate = requestSchema.validate(data);

                if (validate.error) {
                    // End
                    return { error: true, message: validate.error.message };
                }
                return { error: false, value: validate.value };
            } catch (error) {
                console.log(error);
                return { error: true, message: "hata var validate" };
            }
        }
    },
    List_Query: {
        Validate: function (data: any): JoiReturnParams {
            // Joi Request Read
            let requestSchema = Joi.object({
                'page': Joi.object({
                    'index': Joi.number().min(0).integer().default(0),
                    'size': Joi.number().min(1).integer().default(20),
                }).default({ 'index': 0, 'size': 20 }),
                'search': Joi.string().default(null),
                'filter': Joi.object({
                    'user_type': Joi.alternatives().try(
                        Joi.string(), // 
                        Joi.array().items(Joi.string())
                    ),
                    'status': Joi.alternatives().try(
                        Joi.string(), // 
                        Joi.array().items(Joi.string())
                    ),
                }).default(null),
                'sort': Joi.object({
                    'id': Joi.string().required(),
                    'type': Joi.string().required()
                }).default(null)
            }).warning('error', { x: 'field' }).message("field_!!");
            try {
                let validate = requestSchema.validate(data);

                if (validate.error) {
                    // End
                    return { error: true, message: validate.error.message };
                }
                return { error: false, value: validate.value };
            } catch (error) {
                console.log(error);
                return { error: true, message: "hata var validate" };
            }
        }
    },
}