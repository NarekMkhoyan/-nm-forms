import { FORM_CONTROL_DEFAULT_OPTIONS } from "../constants/FormControlOptions.constant";
import { INmFormBaseNode } from "../interfaces/form-base-node.interface";
import { INmFormControlOptions } from "../interfaces/form-control-options.interface";
import { FormBaseNode } from "./FormBaseNode";
import NmFormGroup from "./FormGroup";

interface NmFormControl<T> extends INmFormBaseNode<T> {
  parentFormGroup: NmFormGroup | null;
}
interface INmFormControlCreator {
  new <T>(controlName: string, initialValue: T, options?: INmFormControlOptions): NmFormControl<T>;
}

class NmFormControlClass<T> extends FormBaseNode<T> implements NmFormControl<T> {
  constructor(controlName: string, initialValue: T, options: INmFormControlOptions = FORM_CONTROL_DEFAULT_OPTIONS) {
    super(controlName, options);
    this.setInitialValue && this.setInitialValue(initialValue);
    // TODO: nonNullable in group interface; try creating a mediator for creation nullable or non-nullable controls
  }
}

const NmFormControl: INmFormControlCreator = NmFormControlClass;

export default NmFormControl;
