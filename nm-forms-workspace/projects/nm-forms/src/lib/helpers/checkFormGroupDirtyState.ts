import { FormBaseNode } from "../classes/FormBaseNode";
import NmFormGroup from "../classes/FormGroup";

export function checkFormGroupDirtyState(formGroup: NmFormGroup) {
  let isFormGroupDirty = false;
  for (const controlName in formGroup.controls) {
    if (Object.prototype.hasOwnProperty.call(formGroup.controls, controlName)) {
      const childDirtyState = (formGroup.controls[controlName] as FormBaseNode).dirty;
      if (childDirtyState) {
        isFormGroupDirty = childDirtyState;
        break;
      }
    }
  }
  return isFormGroupDirty;
}
