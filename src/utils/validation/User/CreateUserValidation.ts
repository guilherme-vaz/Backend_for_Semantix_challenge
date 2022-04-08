import Joi, { StringSchema, ObjectSchema, Schema } from "joi";
import UserValidationBase from "./UserValidationBase";
import { ValidationError } from "src/errors";

type BodyBeforeValidate = {
  [name: string]: any;
};

type TErrorDetails = {
  message: string;
  path: Array<string>;
  type: string;
  context: unknown;
};

export class CreateUserValidation extends UserValidationBase {
  //Porque isso?
  private body: BodyBeforeValidate;

  private createUserValidation: ObjectSchema<any>;

  private id: Schema = Joi.forbidden();

  private createdAt: Schema = Joi.forbidden();

  private name: StringSchema = Joi.string()
    .pattern(/^[A-Z]{1}[a-zà-ú`]+\s[A-Z]{1}[a-zà-ú`]+$/)
    .required();

  private cellphone: StringSchema = Joi.string()
    .pattern(/^\(\d{2,}\) \d{4,}\-\d{4}/)
    .required();

  constructor(body: BodyBeforeValidate) {
    super();
    this.createUserValidation = super.userValidationBase.keys({
      id: this.id,
      createdAt: this.createdAt,
      name: this.name,
      cellphone: this.cellphone,
    });
    this.body = body
  }

  public async validateInput() {
    try {
      const validatedPayload = await this.createUserValidation.validateAsync(
        this.body
      );

      return validatedPayload;
    } catch (error) {
      let allErrorMessages = "";
      let firstInteract = true;

      const errorDetails: Array<TErrorDetails> = error.details;

      errorDetails.forEach((details) => {
        const pretfifyErrors = details.message.replace(/"/g, "***");

        if (firstInteract === true) {
          allErrorMessages = `${pretfifyErrors}`;
          firstInteract = false;
        } else {
          allErrorMessages = `${allErrorMessages} && ${pretfifyErrors}`;
        }
      });

      throw new ValidationError(allErrorMessages);
    }
  }
}
