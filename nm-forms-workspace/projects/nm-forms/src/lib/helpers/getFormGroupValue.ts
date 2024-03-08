import { FormBaseNode } from "../classes/FormBaseNode";

export const getFormGroupValue: <FControl extends { [K in keyof FControl]: FormBaseNode<any, any> }>(
  value: FControl
) => any = <FControl extends { [K in keyof FControl]: FormBaseNode<any, any> }>(value: FControl) => {
  const formGroup = value;
  let result: { [key: string]: any } = {};
  for (const key in formGroup) {
    if (Object.prototype.hasOwnProperty.call(formGroup, key)) {
      result[key] = formGroup[key].value;
    }
  }
  return result;
};
