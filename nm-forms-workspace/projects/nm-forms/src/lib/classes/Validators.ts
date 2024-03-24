import NmFormGroup from "./FormGroup";

class Validators {
  public required: <T>(value: T) => boolean = <T>(value: T) => {
    return !!value;
  };

  public pattern: (pattern: RegExp) => (value: string) => boolean = (pattern: RegExp) => {
    return (value: string) => {
      return pattern.test(value);
    };
  };

  public customValidator: (
    customFn: <T>(value: T, formGroup: NmFormGroup) => boolean
  ) => <T>(value: T, formGroup: NmFormGroup) => boolean = (
    customFn: <T>(value: T, formGroup: NmFormGroup) => boolean
  ) => {
    return customFn;
  };
}

export default new Validators();
