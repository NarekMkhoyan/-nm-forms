import { FormBaseNode } from "../classes/FormBaseNode";
import { INmFormControlOptions } from "../interfaces/form-control-options.interface";

export const getFormGroupValue: <FControl extends { [K in keyof FControl]: FormBaseNode<any, any> }>(
  value: FControl,
  options: INmFormControlOptions
) => any = <FControl extends { [K in keyof FControl]: FormBaseNode<any, any> }>(
  value: FControl,
  options: INmFormControlOptions
) => {
  if (!options.groupModeActive) {
    return value;
  } else {
    const formGroup = value;
    let result: { [key: string]: any } = {};
    for (const key in formGroup) {
      if (Object.prototype.hasOwnProperty.call(formGroup, key)) {
        result[key] = formGroup[key].value;
      }
    }
    return result;
  }
};
