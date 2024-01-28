export interface INmFormBaseNode<T> {
  value: T;
  valid: boolean;
  invalid: boolean;
  disabled: boolean;
  enabled: boolean;
  pristine: boolean;
  dirty: boolean;
  touched: boolean;
  untouched: boolean;
}
