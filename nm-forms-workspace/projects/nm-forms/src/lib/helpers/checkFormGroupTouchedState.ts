import { FormBaseNode } from "../classes/FormBaseNode";
import NmFormGroup from "../classes/FormGroup";

export function checkFormGroupTouchedState(formGroup: NmFormGroup) {
  let isFormGroupTouched = false;
  for (const controlName in formGroup.controls) {
    if (Object.prototype.hasOwnProperty.call(formGroup.controls, controlName)) {
      const childTouchedState = (formGroup.controls[controlName] as FormBaseNode).touched;
      if (childTouchedState) {
        isFormGroupTouched = childTouchedState;
        break;
      }
    }
  }
  return isFormGroupTouched;
}
