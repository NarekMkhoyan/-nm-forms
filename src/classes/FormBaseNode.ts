//? for groups
// markAllAsTouched(): void
// getRawValue(): any

//! unknown
// valueChanges: Observable<TValue>
// clearValidators(): void
// updateValueAndValidity(opts: { onlySelf?: boolean; emitEvent?: boolean; } = {}): void

// abstract setValue(value: TRawValue, options?: Object): void
// abstract patchValue(value: TValue, options?: Object): void
// abstract reset(value?: TValue, options?: Object): void

import { INmFormBaseNode } from "../interfaces/FormBaseNode.interface";

class NmFormBaseNode<T> implements INmFormBaseNode<T> {
  value: T;
  valid = false;
  invalid = false;
  disabled = false;
  enabled = false;
  pristine = false;
  dirty = false;
  touched = false;
  untouched = false;

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  //   addValidatorFn(validatorFn: () => boolean): this {
  //     this.validatorFn = validatorFn;
  //     return this;
  //   }

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
}

export default NmFormBaseNode;
