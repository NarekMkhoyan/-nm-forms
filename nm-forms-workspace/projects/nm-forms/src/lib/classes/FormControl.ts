import { INmFormBaseNode } from "../interfaces/form-base-node.interface";
import { INmFormControlOptions } from "../interfaces/form-control-options.interface";
import { FormBaseNode } from "./FormBaseNode";
import NmFormGroup from "./FormGroup";

interface NmFormControl<T = any> extends INmFormBaseNode<T> {
  parentFormGroup: NmFormGroup | null;
}
interface INmFormControlCreator {
  new <T>(controlName: string, initialValue: T, options?: INmFormControlOptions): NmFormControl<T>;
}

class NmFormControlClass<T = any> extends FormBaseNode<T> implements NmFormControl<T> {
  constructor(controlName: string, initialValue: T, private readonly options?: INmFormControlOptions) {
    super(controlName, "form-control");
    this.setInitialValue && this.setInitialValue(initialValue);
  }

  override setValue(newValue: T, updateOnlySelf = false): this {
    this.checkValidity(newValue);

    this._value = newValue;
    this._domWorker?.updateDOMElementValue();

    if (this.parentFormGroup && !updateOnlySelf) {
      this.parentFormGroup.updateGroupValue(false);
    }
    return this;
  }

  override reset(resetOptions: { resetToInitialValue?: boolean; resetTo?: T } = { resetToInitialValue: false }): this {
    let resetToValue = null;
    if (resetOptions.resetTo) {
      resetToValue = resetOptions.resetTo;
      return this;
    } else if (resetOptions.resetToInitialValue) {
      resetToValue = this._initialValue as T;
    }

    return this.setValue(resetToValue as T);
  }

  override checkValidity(newValue: T): void {
    if (this.options?.validators?.length) {
      let isValid = false;
      this.options.validators.forEach((validatorFn) => {
        isValid = validatorFn(newValue, this.parentFormGroup);
      });

      this.setValidity(isValid);
    } else {
      this.setValidity(true);
    }
  }

  override markAsTouched(): this {
    this._touched = true;
    this._untouched = false;
    this.parentFormGroup?.markAsTouched();
    return this;
  }

  override markAsUntouched(): this {
    this._touched = false;
    this._untouched = true;
    this.parentFormGroup?.markAsUntouched();
    return this;
  }

  override markAsDirty(): this {
    this._dirty = true;
    this._pristine = false;
    this.parentFormGroup?.markAsDirty();
    return this;
  }

  override markAsPristine(): this {
    this._dirty = false;
    this._pristine = true;
    this.parentFormGroup?.markAsPristine();
    return this;
  }
}

const NmFormControl: INmFormControlCreator = NmFormControlClass;

export default NmFormControl;
