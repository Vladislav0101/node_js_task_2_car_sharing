import { ValidationErrorItem } from "../../models/system";

export default (errors: ValidationErrorItem[]): string =>
  errors.reduce((string, error) => {
    string += `${error.message} \r\n`;
    return string;
  }, "");
