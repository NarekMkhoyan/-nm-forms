import { FormBaseNode } from "../classes/FormBaseNode";
import NmFormGroup from "../classes/FormGroup";

export const getFormGroupValue: <FControl extends { [K in keyof FControl]: FormBaseNode<any, any> }>(
  value: FControl,
  getRawValue: boolean
) => any = <FControl extends { [K in keyof FControl]: FormBaseNode<any, any> }>(
  value: FControl,
  getRawValue: boolean
) => {
  const formGroup = value;
  let result: { [key: string]: any } = {};
  for (const key in formGroup) {
    if (Object.prototype.hasOwnProperty.call(formGroup, key)) {
      if (getRawValue) {
        if (formGroup[key] instanceof NmFormGroup) {
          const formGroupValue = (formGroup[key] as unknown as NmFormGroup).getRawValue();
          result[key] = formGroupValue;
        } else {
          if (formGroup[key].enabled) {
            result[key] = formGroup[key].value;
          }
        }
      } else {
        result[key] = formGroup[key].value;
      }
    }
  }
  return result;
};
