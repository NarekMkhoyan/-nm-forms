import { FormControlType } from "./form-control.type";
import NmFormGroup from "../classes/FormGroup";

export interface INmFormBaseNode<T> {
  value: T | undefined;
  valid: boolean | undefined;
  invalid: boolean | undefined;
  disabled: boolean;
  enabled: boolean;
  pristine: boolean;
  dirty: boolean;
  touched: boolean;
  untouched: boolean;
  controlName: string;
  parentFormGroup: NmFormGroup | null;
  nodeType: FormControlType;
  markAsTouched(): INmFormBaseNode<T>;
  markAsUntouched(): INmFormBaseNode<T>;
  markAsDirty(): INmFormBaseNode<T>;
  markAsPristine(): INmFormBaseNode<T>;
  disable(): INmFormBaseNode<T>;
  enable(): INmFormBaseNode<T>;
  setValidity(isValid: boolean): INmFormBaseNode<T>;
  reset(resetOptions?: { resetToInitialValue?: boolean; resetTo?: T }): INmFormBaseNode<T>;
  setValue(newValue: T): INmFormBaseNode<T>;
  checkValidity: (value: T) => void;
  updateValueAndValidity: () => void;
  updateConnectionToDOM: () => void;
}
