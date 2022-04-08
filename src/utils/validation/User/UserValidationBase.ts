// import * as Joi from 'joi'
import Joi, { ObjectSchema, StringSchema } from "joi";

class UserValidationBase {
  private emailJoiSchema: StringSchema = Joi.string()
    .pattern(/^\w+([.\-_]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    .email({
      tlds: {
        allow: ["com", "br", "net"],
      },
    })
    .lowercase()
    .required();

  private passwordJoiSchema: StringSchema = Joi.string().min(8).required();

  private validationSchemaBase: ObjectSchema<any> = Joi.object().keys({
    email: this.emailJoiSchema,
    password: this.passwordJoiSchema,
  });

  get userValidationBase() {
    return this.validationSchemaBase;
  }
}

export default UserValidationBase
