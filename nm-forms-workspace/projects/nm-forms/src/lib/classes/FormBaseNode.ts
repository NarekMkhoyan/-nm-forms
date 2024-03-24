//?  valueChanges: Observable<TValue> - give the user an input through the options to pass a custom onChange method
//! unknown
// clearValidators(): void
// updateValueAndValidity(opts: { onlySelf?: boolean; emitEvent?: boolean; } = {}): void

import { INmFormBaseNode } from "../interfaces/form-base-node.interface";
import { FormControlType } from "../interfaces/form-control.type";
import { DOMWorker } from "./DOMWorker";
import NmFormGroup from "./FormGroup";

class FormBaseNode<T = any, TRawValue extends T = T> implements INmFormBaseNode<T> {
  controlName: string;
  parentFormGroup: NmFormGroup | null = null;
  private _valid?: boolean | undefined = undefined;
  private _invalid?: boolean | undefined = undefined;
  private _disabled?: boolean = false;
  private _enabled?: boolean = true;
  private _pristine?: boolean = true;
  private _dirty?: boolean = false;
  private _touched?: boolean = false;
  private _untouched?: boolean = true;
  protected _initialValue?: T;
  protected _value?: T;
  protected _domWorker?: DOMWorker<T> | null = null;
  readonly nodeType: FormControlType;

  get value(): T | undefined {
    return this._value;
  }

  get valid(): boolean | undefined {
    return this._valid;
  }

  get invalid(): boolean | undefined {
    return this._invalid;
  }

  get disabled(): boolean {
    return this._disabled || false;
  }

  get enabled(): boolean {
    return this._enabled || false;
  }

  get pristine(): boolean {
    return this._pristine || false;
  }

  get dirty(): boolean {
    return this._dirty || false;
  }

  get touched(): boolean {
    return this._touched || false;
  }

  get untouched(): boolean {
    return this._untouched || false;
  }

  constructor(controlName: string, nodeType: FormControlType) {
    this.nodeType = nodeType;
    this.controlName = controlName;
    this._domWorker = new DOMWorker<T>(this);
  }

  setParentFormGroup(parentGroup: NmFormGroup): this {
    this.parentFormGroup = parentGroup;
    return this;
  }

  markAsTouched(): this {
    this._touched = true;
    this._untouched = false;
    return this;
  }

  markAsUntouched(): this {
    this._touched = false;
    this._untouched = true;
    return this;
  }

  markAsDirty(): this {
    this._dirty = true;
    this._pristine = false;
    // TODO: check validity
    return this;
  }

  markAsPristine(): this {
    this._dirty = false;
    this._pristine = true;
    // TODO: check validity
    return this;
  }

  disable(disableValidator: boolean = false): this {
    this._enabled = false;
    this._disabled = true;
    // TODO: disable validator
    return this;
  }

  enable(): this {
    this._enabled = true;
    this._disabled = false;
    // TODO: enable the validator back
    return this;
  }

  setValidity(isValid: boolean): this {
    this._valid = isValid;
    this._invalid = !isValid;
    return this;
  }

  reset(resetOptions?: { resetToInitialValue?: boolean; resetTo?: TRawValue }): this {
    //! After reset you need to reset the CSS too
    return this;
  }

  setValue(newValue: TRawValue, updateOnlySelf = false): this {
    return this;
  }

  protected setInitialValue?: (value: T) => this = (value: T) => {
    this._initialValue = value;
    this._value = value;
    return this;
  };
}

export { FormBaseNode };
