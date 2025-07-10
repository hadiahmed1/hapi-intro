import Joi from 'joi';

export const createUserSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().min(3).required()
}).unknown(false);
