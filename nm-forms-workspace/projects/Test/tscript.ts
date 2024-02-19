import { NmFormControl, NmFormGroup } from "nm-forms";

const test = new NmFormGroup<{
  username: NmFormControl<string>;
  email: NmFormControl<string>;
  age: NmFormControl<number>;
  address: NmFormControl<string>;
  more: NmFormGroup<{
    test: NmFormControl<string>;
  }>;
}>("user", {
  username: new NmFormControl("username", "132"),
  email: new NmFormControl("email", ""),
  age: new NmFormControl("age", 18),
  address: new NmFormControl("address", ""),
  more: new NmFormGroup("more", {
    test: new NmFormControl("test", ""),
  }),
});
