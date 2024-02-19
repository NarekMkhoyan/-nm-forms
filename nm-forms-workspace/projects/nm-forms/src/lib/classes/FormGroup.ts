import { getFormGroupValue } from "../helpers/getFormGroupValue";
import { ɵFormGroupValue, ɵTypedOrUntyped } from "../interfaces/form-group.interface";
import { FormBaseNode } from "./FormBaseNode";

interface NmFormGroup<FControl extends { [K in keyof FControl]: FormBaseNode<any, any> } = any>
  extends FormBaseNode<ɵTypedOrUntyped<FControl, ɵFormGroupValue<FControl>, any>> {
  controls: FControl | null;
  parentFormGroup: NmFormGroup<FControl> | null;
  updateGroupValue: () => NmFormGroup<FControl>;
}

interface INmFormGroupCreator {
  new <FControl extends { [K in keyof FControl]: FormBaseNode<any> } = any>(
    groupName: string,
    controls: FControl
  ): NmFormGroup<FControl>;
}

class NmFormGroupClass<FControl extends { [K in keyof FControl]: FormBaseNode<any, any> } = any>
  extends FormBaseNode<ɵTypedOrUntyped<FControl, ɵFormGroupValue<FControl>, any>>
  implements NmFormGroup<FControl>
{
  controls: FControl | null = null;

  constructor(groupName: string, controls: FControl) {
    super(groupName);
    this.controls = controls;
    this.updateGroupValue();
    this.createFormGroupChildNodes(controls);
  }

  private createFormGroupChildNodes(controls: FControl): void {
    for (const controlName in controls) {
      if (Object.prototype.hasOwnProperty.call(controls, controlName)) {
        controls[controlName].setParentFormGroup(this);
      }
    }
    this.controls = controls;
  }

  public updateGroupValue(): this {
    this.setValue(getFormGroupValue(this.controls, { groupModeActive: true }));
    return this;
  }

  // get Control
  // markAllAsTouched(): void
  // getRawValue(): any
  // valueChanges: Observable<TValue>

  // abstract setValue(value: TRawValue, options?: Object): void
  // abstract patchValue(value: TValue, options?: Object): void

  // reset(): this {
}

const NmFormGroup: INmFormGroupCreator = NmFormGroupClass;

export default NmFormGroup;
