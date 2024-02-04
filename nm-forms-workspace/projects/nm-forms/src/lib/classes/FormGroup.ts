import { FormBaseNode } from "./FormBaseNode";

interface NmFormGroup<FControl extends { [K in keyof FControl]: FormBaseNode<any> }> extends FormBaseNode<FControl> {
  controls: FControl | null;
  parentFormGroupName: string | null;
}

class NmFormGroupClass<FControl extends { [K in keyof FControl]: FormBaseNode<any> }>
  extends FormBaseNode<FControl>
  implements NmFormGroup<FControl>
{
  controls: FControl | null = null;

  constructor(groupName: string, controls: FControl) {
    super(groupName, controls, { groupModeActive: true });
    this.createFormGroupChildNodes(controls);
  }

  private createFormGroupChildNodes(controls: FControl): void {
    for (const controlName in controls) {
      if (Object.prototype.hasOwnProperty.call(controls, controlName)) {
        controls[controlName].setParentFormGroup(this.controlName);
      }
    }
    this.controls = controls;
  }


  // get Control
  // markAllAsTouched(): void
  // getRawValue(): any
  // valueChanges: Observable<TValue>

  // abstract setValue(value: TRawValue, options?: Object): void
  // abstract patchValue(value: TValue, options?: Object): void

  // reset(): this {
}

interface NmFormGroupCreator {
  new <FControl extends { [K in keyof FControl]: FormBaseNode<any> } = any>(
    groupName: string,
    controls: FControl
  ): NmFormGroupClass<FControl>;
}

const NmFormGroup: NmFormGroupCreator = NmFormGroupClass;

export { NmFormGroup };
