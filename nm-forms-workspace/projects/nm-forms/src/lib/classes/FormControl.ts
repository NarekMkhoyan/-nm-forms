import { FORM_CONTROL_DEFAULT_OPTIONS } from "../constants/FormControlOptions.constant";
import { INmFormBaseNode } from "../interfaces/FormBaseNode.interface";
import { INmFormControlOptions } from "../interfaces/FormControlOptions.interface";
import { FormBaseNode } from "./FormBaseNode";

interface NmFormControl<T> extends INmFormBaseNode<T> {
  parentFormGroupName: string | null;
}

class NmFormControlClass<T> extends FormBaseNode<T> implements NmFormControl<T> {
  constructor(controlName: string, initialValue: T, options: INmFormControlOptions = FORM_CONTROL_DEFAULT_OPTIONS) {
    super(controlName, initialValue, options);
    // TODO: nonNullable in group interface; try creating a mediator for creation nullable or non-nullable controls
  }
}

interface NmFormControlCreator {
  new <T>(controlName: string, initialValue: T, options?: INmFormControlOptions): NmFormControlClass<T>;
}

const NmFormControl: NmFormControlCreator = NmFormControlClass;

export { NmFormControl };
