//?  valueChanges: Observable<TValue> - give the user an input through the options to pass a custom onChange method
//! unknown
// clearValidators(): void
// updateValueAndValidity(opts: { onlySelf?: boolean; emitEvent?: boolean; } = {}): void

import { FORM_CONTROL_DEFAULT_OPTIONS } from "../constants/FormControlOptions.constant";
import { INmFormControlOptions } from "../interfaces/form-control-options.interface";
import { INmFormBaseNode } from "../interfaces/form-base-node.interface";
import { DOMWorker } from "./DOMWorker";
import NmFormGroup from "./FormGroup";

class FormBaseNode<T = any, TRawValue extends T = T> implements INmFormBaseNode<T> {
  controlName: string;
  parentFormGroup: NmFormGroup | null = null;
  valid: boolean | undefined = undefined;
  invalid: boolean | undefined = undefined;
  disabled: boolean = false;
  enabled: boolean = true;
  pristine: boolean = true;
  dirty: boolean = false;
  touched: boolean = false;
  untouched: boolean = true;
  options: INmFormControlOptions;
  private _value?: T;
  private _initialValue?: T;
  private _domWorker?: DOMWorker<T> | null = null;

  get value(): T | undefined {
    return this._value;
  }

  constructor(controlName: string, options: INmFormControlOptions = FORM_CONTROL_DEFAULT_OPTIONS) {
    this.controlName = controlName;
    this.options = options;
    this._domWorker = new DOMWorker<T>(this, options);
  }

  //   addValidatorFn(validatorFn: () => boolean): this {
  //     this.validatorFn = validatorFn;
  //     return this;
  //   }

  setParentFormGroup(parentGroup: NmFormGroup): this {
    this.parentFormGroup = parentGroup;
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

  // reset(): this {
  //   //! After reset you need to reset the CSS too
  //   if (this.options.nonNullable) {
  //     this.value = this.initialValue;
  //   } else {
  //     this.value = null;
  //   }

  //   return this;
  // }

  patchValue(): this {
    // TODO:
    //? if control has parent, update the value for the parent
    return this;
  }

  setValue(newValue: T): this {
    // TODO:
    this._value = newValue;
    if (this.parentFormGroup) {
      this.parentFormGroup.updateGroupValue();
    }
    return this;
  }

  protected setInitialValue?: (value: T) => this = (value: T) => {
    this._initialValue = value;
    this._value = value;
    return this;
  };
}

export { FormBaseNode };
