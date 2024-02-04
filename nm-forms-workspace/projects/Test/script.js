import { NmFormControl, NmFormGroup } from "../../dist/nm-forms/fesm2020/nm-forms.mjs";

document.querySelector("#test_btn").addEventListener("click", () => {
  console.log(test2);
});

const test2 = new NmFormGroup("user", {
  username: new NmFormControl("username", "132", { nonNullable: true }),
  email: new NmFormControl("email", "", { nonNullable: false }),
  age: new NmFormControl("age", 18),
  //TODO! in the template the address field is not inside of the formGroup
  address: new NmFormControl("address", "", { nonNullable: true }),
  agree: new NmFormControl("agree", false),
});

//TODO: add css classes to the input element for styling when invalid
