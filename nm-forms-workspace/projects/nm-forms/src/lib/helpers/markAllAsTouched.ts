import NmFormControl from "../classes/FormControl";
import NmFormGroup from "../classes/FormGroup";

export function markAllAsTouched(formGroup: NmFormGroup): NmFormGroup {
  class FormGroupCopy extends NmFormGroup {
    setChildControlAsTouched() {
      this._untouched = false;
      this._touched = true;
      for (const controlName in this.controls) {
        if (Object.prototype.hasOwnProperty.call(this.controls, controlName)) {
          if (this.controls[controlName] instanceof NmFormControl) {
            this.controls[controlName]._untouched = false;
            this.controls[controlName]._touched = true;
          }
          if (this.controls[controlName] instanceof NmFormGroup) {
            this.controls[controlName] = markAllAsTouched(this.controls[controlName]);
          }
        }
      }

      return this;
    }
  }

  const formGroupCopyTouched = new FormGroupCopy(formGroup.controlName, formGroup.controls).setChildControlAsTouched();
  const allTouchedFormGroup = new NmFormGroup(formGroupCopyTouched.controlName, formGroupCopyTouched.controls).markAsTouched();
  return allTouchedFormGroup;
}
