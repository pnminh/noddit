import { ValidationError } from 'class-validator';

export class CustomValidationError extends Error {
  constructor(param: string, msg: string) {
    super(msg);
    this.param = param;
    this.msg = msg;
  }
  param: string;
  msg: string;
}
export function getCustomValidationError(
  errors: ValidationError[]
): CustomValidationError[] {
  if (errors && errors.length > 0) {
    return errors.map(err => {
      return new CustomValidationError(
        err.property,
        err.constraints[Object.keys(err.constraints)[0]]
      );
    });
  }
  return [];
}
