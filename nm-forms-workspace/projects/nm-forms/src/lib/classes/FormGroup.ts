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
    this.createFormGroupChildNodes(controls);
    this.updateGroupValue();
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

  override setValue(newValue: ɵFormGroupRawValue<FControl> | null, updateOnlySelf = false): this {
    // TODO:
    // check validation
    // apply dom classes

    this.setAndUpdateGroupValue(newValue, updateOnlySelf);
    return this;
  }

  override reset(
    resetOptions: { resetToInitialValue?: boolean; resetTo?: ɵFormGroupRawValue<FControl> } = {
      resetToInitialValue: false,
    }
  ): this {
    this.resetGroup(resetOptions);
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

  private setAndUpdateGroupValue(newValue: Partial<ɵFormGroupRawValue<FControl> | null>, updateOnlySelf = false): void {
    if (!this.controls) return;

    for (const key in newValue) {
      if (newValue.hasOwnProperty(key) && this.controls.hasOwnProperty(key)) {
        ((this.controls as Record<string, unknown>)[key] as unknown as FormBaseNode).setValue(newValue[key], true);
      }
    }

    this._value = getFormGroupValue(this.controls);
    this.checkValidity();

    if (this.parentFormGroup && !updateOnlySelf) {
      this.parentFormGroup.updateGroupValue(true);
    }
  }

  private resetGroup(resetOptions: { resetToInitialValue?: boolean; resetTo?: ɵFormGroupRawValue<FControl> }): void {
    if (!this.controls) return;

    for (const key in this.value) {
      if (this.value.hasOwnProperty(key) && this.controls.hasOwnProperty(key)) {
        let resetToValue = null;
        if (resetOptions.resetTo) {
          resetToValue = resetOptions.resetTo[key];
        } else if (resetOptions.resetToInitialValue) {
          resetToValue = this._initialValue as ɵFormGroupRawValue<FControl>;
        }
        ((this.controls as Record<string, unknown>)[key] as unknown as FormBaseNode).setValue(resetToValue, true);
        if (((this.controls as Record<string, unknown>)[key] as unknown as NmFormGroupClass).controls) {
          ((this.controls as Record<string, unknown>)[key] as unknown as NmFormGroupClass).resetGroup(resetOptions);
        }
      }
    }

    this._value = getFormGroupValue(this.controls);
    this.checkValidity();

    if (this.parentFormGroup) {
      this.parentFormGroup.updateGroupValue(true);
    }
  }

  private checkValidity(): void {
    if (this.controls) {
      const valid = Object.keys(this.controls).every((key) => {
        return this.controls && ((this.controls as any)[key] as FormBaseNode).valid;
      });
      this.setValidity(valid);
    } else {
      this.setValidity(true);
    }
  }
}

const NmFormGroup: INmFormGroupCreator = NmFormGroupClass;

export default NmFormGroup;
