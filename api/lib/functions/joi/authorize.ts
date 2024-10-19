import Joi from 'joi';
import JoiReturnParams from '../../types/joi/returnParams';

// Lib
import UserStatuses from '../../types/user/statuses';
import UserTypes from '../../types/user/types';
import Roles from '../../types/roles';

export default {
    SendOtp: {
        Validate: function (data: any): JoiReturnParams {
            // Joi Request Read
            let requestSchema = Joi.object({
                'country_code': Joi.string().required(), // +90 formatında gelecektir.
                'phone': Joi.string().required().trim() // telefon numarasının devamı 5554443322 gibi.
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
    VerifyOtp: {
        Validate: function (data: any): JoiReturnParams {
            // Joi Request Read
            let requestSchema = Joi.object({
                'country_code': Joi.string().required(), // +90 formatında gelecektir.
                'phone': Joi.string().required().trim(), // telefon numarasının devamı 5554443322 gibi.
                'verify_code': Joi.string().required(), // 6 haneli kod olarak gelecektir.
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
    Register: {
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
    Password: {
        Validate: function (data: any): JoiReturnParams {
            // Joi Request Read
            let requestSchema = Joi.object({
                'email': Joi.string().email({ tlds: false }).required(),
                'password': Joi.string().required()
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
    RefreshToken: {
        Validate: function (data: any): JoiReturnParams {
            // Joi Request Read
            let requestSchema = Joi.object({
                'refresh_token': Joi.string().required() // refresh token
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
    }
}