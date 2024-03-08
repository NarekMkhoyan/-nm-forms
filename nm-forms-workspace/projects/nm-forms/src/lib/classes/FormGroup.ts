import { ɵFormGroupRawValue, ɵFormGroupValue, ɵTypedOrUntyped } from "../interfaces/form-group.interface";
import { getFormGroupValue } from "../helpers/getFormGroupValue";
import { FormBaseNode } from "./FormBaseNode";

//! TODO:
// markAllAsTouched(): void
// getRawValue(): any
// valueChanges: Observable<TValue>

interface NmFormGroup<FControl extends { [K in keyof FControl]: FormBaseNode<any, any> } = any>
  extends FormBaseNode<
    ɵTypedOrUntyped<FControl, ɵFormGroupValue<FControl>, any>,
    ɵTypedOrUntyped<FControl, ɵFormGroupRawValue<FControl>, any>
  > {
  controls: FControl | null;
  parentFormGroup: NmFormGroup<FControl> | null;
  updateGroupValue: (updateOnlySelf: boolean) => NmFormGroup<FControl>;
  get(childName: string): FormBaseNode | undefined;
  patchValue(newValue: Partial<ɵTypedOrUntyped<FControl, ɵFormGroupRawValue<FControl>, any>>): NmFormGroup<FControl>;
}

interface INmFormGroupCreator {
  new <FControl extends { [K in keyof FControl]: FormBaseNode<any> } = any>(
    groupName: string,
    controls: FControl
  ): NmFormGroup<FControl>;
}

class NmFormGroupClass<FControl extends { [K in keyof FControl]: FormBaseNode<any, any> } = any>
  extends FormBaseNode<
    ɵTypedOrUntyped<FControl, ɵFormGroupValue<FControl>, any>,
    ɵTypedOrUntyped<FControl, ɵFormGroupRawValue<FControl>, any>
  >
  implements NmFormGroup<FControl>
{
  controls: FControl | null = null;

  constructor(groupName: string, controls: FControl) {
    super(groupName, "form-group");
    this.controls = controls;
    this.updateGroupValue();
    this.createFormGroupChildNodes(controls);
  }

  public get(childName: string): FormBaseNode | undefined {
    let searchQueries = [childName];
    if (childName.includes(".")) {
      searchQueries = childName.split(".");
    }

    let foundControl: FormBaseNode = this;
    for (let i = 0; i < searchQueries.length; i++) {
      const result = ((foundControl as NmFormGroupClass<FControl>).controls as { [key: string]: FormBaseNode })[
        searchQueries[i]
      ];

      if (result) {
        foundControl = result;
      } else {
        return undefined;
      }
    }

    return foundControl;
  }

  public updateGroupValue(updateOnlySelf = false): this {
    this.setValue(getFormGroupValue(this.controls), updateOnlySelf);
    return this;
  }

  public patchValue(newValue: Partial<ɵTypedOrUntyped<FControl, ɵFormGroupRawValue<FControl>, any>>): this {
    // TODO:
    // check validation
    // apply dom classes

    this.setAndUpdateGroupValue(newValue, false);
    return this;
  }

  override setValue(newValue: ɵFormGroupRawValue<FControl>, updateOnlySelf = false): this {
    // TODO:
    // check validation
    // apply dom classes

    this.setAndUpdateGroupValue(newValue, updateOnlySelf);
    return this;
  }

  private createFormGroupChildNodes(controls: FControl): void {
    for (const controlName in controls) {
      if (controls.hasOwnProperty(controlName)) {
        controls[controlName].setParentFormGroup(this);
      }
    }
    this.controls = controls;
  }

  private setAndUpdateGroupValue(newValue: Partial<ɵFormGroupRawValue<FControl>>, updateOnlySelf = false): void {
    if (!this.controls) return;

    for (const key in newValue) {
      if (newValue.hasOwnProperty(key) && this.controls.hasOwnProperty(key)) {
        ((this.controls as Record<string, unknown>)[key] as unknown as FormBaseNode).setValue(newValue[key], true);
      }
    }

    this._value = getFormGroupValue(this.controls);

    if (this.parentFormGroup && !updateOnlySelf) {
      this.parentFormGroup.updateGroupValue(true);
    }
  }
}

const NmFormGroup: INmFormGroupCreator = NmFormGroupClass;

export default NmFormGroup;
