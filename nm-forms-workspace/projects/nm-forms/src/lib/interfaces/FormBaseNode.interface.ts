import { INmFormControlOptions } from "./FormControlOptions.interface";

export interface INmFormBaseNode<T> {
  value: T | null;
  initialValue: T;
  valid: boolean | undefined;
  invalid: boolean | undefined;
  disabled: boolean;
  enabled: boolean;
  pristine: boolean;
  dirty: boolean;
  touched: boolean;
  untouched: boolean;
  controlName: string;
  parentFormGroupName: string | null;
  options: INmFormControlOptions;
  markAsTouched(): INmFormBaseNode<T>;
  markAsUntouched(): INmFormBaseNode<T>;
  markAsDirty(): INmFormBaseNode<T>;
  markAsPristine(): INmFormBaseNode<T>;
  disable(disableValidator: boolean): INmFormBaseNode<T>;
  enable(): INmFormBaseNode<T>;
  reset(): INmFormBaseNode<T>;
  patchValue(): INmFormBaseNode<T>;
  setValue(newValue: T): INmFormBaseNode<T>;
  setParentFormGroup: (parentGroupName: string) => INmFormBaseNode<T>;
}
