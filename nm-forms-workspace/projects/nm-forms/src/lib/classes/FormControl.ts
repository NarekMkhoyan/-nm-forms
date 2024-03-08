import { FORM_CONTROL_DEFAULT_OPTIONS } from "../constants/FormControlOptions.constant";
import { INmFormControlOptions } from "../interfaces/form-control-options.interface";
import { INmFormBaseNode } from "../interfaces/form-base-node.interface";
import { FormBaseNode } from "./FormBaseNode";
import NmFormGroup from "./FormGroup";

interface NmFormControl<T = any> extends INmFormBaseNode<T> {
  parentFormGroup: NmFormGroup | null;
}
interface INmFormControlCreator {
  new <T>(controlName: string, initialValue: T, options?: INmFormControlOptions): NmFormControl<T>;
}

class NmFormControlClass<T = any> extends FormBaseNode<T> implements NmFormControl<T> {
  constructor(controlName: string, initialValue: T, options: INmFormControlOptions = FORM_CONTROL_DEFAULT_OPTIONS) {
    super(controlName, "form-control", options);
    this.setInitialValue && this.setInitialValue(initialValue);
  }

  override setValue(newValue: T, updateOnlySelf = false): this {
    // TODO:
    // check validation
    // apply dom classes

    this._value = newValue;
    this._domWorker?.updateDOMElementValue();

    if (this.parentFormGroup && !updateOnlySelf) {
      this.parentFormGroup.updateGroupValue(false);
    }
    return this;
  }
}

const NmFormControl: INmFormControlCreator = NmFormControlClass;

export default NmFormControl;
