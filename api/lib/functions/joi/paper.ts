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
                'title': Joi.string().required(), // ...
                'descripton': Joi.string().required(), // ...
                'keywords': Joi.string().required(), // key1, key2, key3
                'author': Joi.string().required(), // Berke
                'day': Joi.string().required(), // 01
                'month': Joi.string().required(), // 05
                'year': Joi.string().required(), // 2024
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
                'sort': Joi.object({
                    'id': Joi.string().allow('created_at').required(),
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
    Details_Param: {
        Validate: function (data: any): JoiReturnParams {
            // Joi Request Read
            let requestSchema = Joi.object({
                'paper_no': Joi.string().required(),
                'link_seo': Joi.string().required()
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
    EditPage_Param: {
        Validate: function (data: any): JoiReturnParams {
            // Joi Request Read
            let requestSchema = Joi.object({
                'paper_id': Joi.string().required()
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
    Update: {
        Validate: function (data: any): JoiReturnParams {
            // Joi Request Read
            let requestSchema = Joi.object({
                'title': Joi.string().optional(), // ...
                'descripton': Joi.string().optional(), // ...
                'keywords': Joi.string().optional(), // key1, key2, key3
                'author': Joi.string().optional(), // Berke
                'day': Joi.string().optional(), // 01
                'month': Joi.string().optional(), // 05
                'year': Joi.string().optional(), // 2024
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
    Update_Param: {
        Validate: function (data: any): JoiReturnParams {
            // Joi Request Read
            let requestSchema = Joi.object({
                'paper_id': Joi.string().required()
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
    Delete_Param: {
        Validate: function (data: any): JoiReturnParams {
            // Joi Request Read
            let requestSchema = Joi.object({
                'paper_id': Joi.string().required()
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