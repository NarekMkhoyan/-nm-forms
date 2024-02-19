import { NmFormControl, NmFormGroup } from "../../dist/nm-forms/fesm2020/nm-forms.mjs";

document.querySelector("#test_btn").addEventListener("click", () => {
  console.log(allTypes);
});

const test2 = new NmFormGroup("user", {
  username: new NmFormControl("username", "132", { nonNullable: true }),
  email: new NmFormControl("email", "", { nonNullable: false }),
  age: new NmFormControl("age", 18),
  //TODO! in the template the address field is not inside of the formGroup
  address: new NmFormControl("address", "", { nonNullable: true }),
  agree: new NmFormControl("agree", true),
  more: new NmFormGroup("more", {
    test: new NmFormControl("test", ""),
  }),
});

const allTypes = new NmFormGroup("allTypes", {
  text: new NmFormControl("text", "Text"), // value from input
  password: new NmFormControl("password", "pass"), // value from input
  textarea: new NmFormControl("textarea", "area"), // value from input
  radio: new NmFormControl("radio", "option2"), // value from change
  checkbox: new NmFormControl("checkbox", true), // checked from change
  number: new NmFormControl("number", 123), // valueAsNumber from input
  email: new NmFormControl("email", "asd@asd.com"), // value from input
  url: new NmFormControl("url", "url  "), // value from input
  date: new NmFormControl("date", new Date()), // valueAsDate from input
  time: new NmFormControl("time", new Date()), // valueAsDate from input
  dateTime: new NmFormControl("dateTime", new Date()), // valueAsDate from input
  month: new NmFormControl("month", new Date()), // valueAsDate from input
  week: new NmFormControl("week", new Date()), // valueAsDate from input
  color: new NmFormControl("color", "#F00505"), // value from input
  file: new NmFormControl("file", []), // files from change
  search: new NmFormControl("search", "search"), // value from input
  tel: new NmFormControl("tel", "+374"), // value from input
  range: new NmFormControl("range", 81), // valueAsNumber from input
  select: new NmFormControl("select", "grape"), // value from input
});

//TODO: add css classes to the input element for styling when invalid
