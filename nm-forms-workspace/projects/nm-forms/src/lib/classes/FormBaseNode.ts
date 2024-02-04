//?  valueChanges: Observable<TValue> - give the user an input through the options to pass a custom onChange method
//! unknown
// clearValidators(): void
// updateValueAndValidity(opts: { onlySelf?: boolean; emitEvent?: boolean; } = {}): void

import { FORM_CONTROL_DEFAULT_OPTIONS } from "../constants/FormControlOptions.constant";
import { INmFormControlOptions } from "../interfaces/FormControlOptions.interface";
import { INmFormBaseNode } from "../interfaces/FormBaseNode.interface";
import { DOMWorker } from "./DOMWorker";

class FormBaseNode<T> implements INmFormBaseNode<T> {
  value: T | null;
  initialValue: T;
  controlName: string;
  parentFormGroupName: string | null = null;
  options: INmFormControlOptions;
  valid: boolean | undefined = undefined;
  invalid: boolean | undefined = undefined;
  disabled: boolean = false;
  enabled: boolean = true;
  pristine: boolean = true;
  dirty: boolean = false;
  touched: boolean = false;
  untouched: boolean = true;

  constructor(controlName: string, initialValue: T, options: INmFormControlOptions = FORM_CONTROL_DEFAULT_OPTIONS) {
    this.controlName = controlName;
    this.value = initialValue;
    this.initialValue = initialValue;
    this.options = options;
    const domWorker = new DOMWorker(this, options);
  }

  //   addValidatorFn(validatorFn: () => boolean): this {
  //     this.validatorFn = validatorFn;
  //     return this;
  //   }

  setParentFormGroup(parentGroupName: string): this {
    this.parentFormGroupName = parentGroupName;
    return this;
  }

  markAsTouched(): this {
    this.touched = true;
    this.untouched = false;
    return this;
  }

  markAsUntouched(): this {
    this.touched = false;
    this.untouched = true;
    return this;
  }

  markAsDirty(): this {
    this.dirty = true;
    this.pristine = false;
    // TODO: check validity
    return this;
  }

  markAsPristine(): this {
    this.dirty = false;
    this.pristine = true;
    // TODO: check validity
    return this;
  }

  disable(disableValidator: boolean = false): this {
    this.enabled = false;
    this.disabled = true;
    // TODO: disable validator
    return this;
  }

  enable(): this {
    this.enabled = true;
    this.disabled = false;
    // TODO: enable the validator back
    return this;
  }

  reset(): this {
    //! After reset you need to reset the CSS too
    if (this.options.nonNullable) {
      this.value = this.initialValue;
    } else {
      this.value = null;
    }

    return this;
  }

  patchValue(): this {
    // TODO:
    //? if control has parent, update the value for the parent
    return this;
  }

  setValue(newValue: T): this {
    // TODO:
    this.value = newValue;
    //? if control has parent, update the value for the parent
    return this;
  }
}

export { FormBaseNode };
