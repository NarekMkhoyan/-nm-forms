import { NmFormControl, NmFormGroup } from "nm-forms";

const test = new NmFormGroup<{
  username: NmFormControl<string>;
  email: NmFormControl<string>;
  age: NmFormControl<number>;
  address: NmFormControl<string>;
  more: NmFormGroup<{
    test: NmFormControl<string>;
    height: NmFormControl<number>;
  }>;
}>("user", {
  username: new NmFormControl("username", "132"),
  email: new NmFormControl("email", ""),
  age: new NmFormControl("age", 18),
  address: new NmFormControl("address", ""),
  more: new NmFormGroup("more", {
    test: new NmFormControl("test", ""),
    height: new NmFormControl("height", 0),
  }),
});

test.setValue({
  username: "Narek",
  email: "mySpace@mail.com",
  age: 24,
  address: "Address",
  more: {
    test: "test",
    height: 183,
  },
});

test.patchValue({
  username: "1",
});

test.controls?.more.controls?.test.setValue("1");
test.controls?.more.controls?.height.setValue(1);
