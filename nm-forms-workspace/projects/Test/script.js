import { NmFormControl, NmFormGroup, NmValidators } from "../../dist/nm-forms/fesm2020/nm-forms.mjs";

document.querySelector("#test_btn").addEventListener("click", () => {
  // console.log(allTypes.value);
  // console.log(singleControl.value);
  // allTypes.setValue({
  //   test: {
  //     text: "NEW TEXT",
  //     password: "NEW PASS",
  //     textarea: "NEW LONGER TEXT",
  //   },
  //   radio: "option1",
  //   checkbox: false,
  //   number: 890,
  //   email: "actual@MediaList.com",
  //   url: "youtube.com",
  //   date: new Date(),
  //   time: new Date(),
  //   dateTime: new Date(),
  //   month: new Date(),
  //   week: new Date(),
  //   color: "#262626",
  //   file: [],
  //   search: "NEW search query",
  //   tel: "+7",
  //   range: 11,
  //   select: "orange",
  // });
  // allTypes.get("test.text").disable()

  // console.log(allTypes);
  // allTypes.markAsDirty();
  console.log(allTypes.controls.test.valid);
});

function testFn(v, form) {
  return v.includes('pass');
}

const singleControl = new NmFormControl("single", "");

document.querySelector("#test_btn_2").addEventListener("click", () => {
  // allTypes.patchValue({
  //   checkbox: false,
  //   test: {
  //     // text: "NEW TEXT",
  //     password: "NEW PASS",
  //     // textarea: "NEW LONGER TEXT",
  //   },
  // });

  // allTypes.reset();
  allTypes.get("test.text").disable();
  // allTypes.get("test.password").disable();
  // allTypes.get("test.textarea").disable();



  // console.log(allTypes);
  // allTypes.markAsPristine();
  // console.log(allTypes);


  // console.log(allTypes.get("test.password"));
});

// const test2 = new NmFormGroup("user", {
//   username: new NmFormControl("username", "132", { nonNullable: true }),
//   email: new NmFormControl("email", "", { nonNullable: false }),
//   age: new NmFormControl("age", 18),
//   //TODO! in the template the address field is not inside of the formGroup
//   address: new NmFormControl("address", "", { nonNullable: true }),
//   agree: new NmFormControl("agree", true),
//   more: new NmFormGroup("more", {
//     test: new NmFormControl("test", ""),
//   }),
// });


const allTypes = new NmFormGroup("allTypes", {
  test: new NmFormGroup("test", {
    text: new NmFormControl("text", "", { validators: [NmValidators.required] }), // value from input
    password: new NmFormControl("password", ""), // value from input
    textarea: new NmFormControl("textarea", ""), // value from input
  }),
  radio: new NmFormControl("radio", "option2"), // value from change
  checkbox: new NmFormControl("checkbox", true, { validators: [NmValidators.required] }), // checked from change
  number: new NmFormControl("number", 123, { validators: [NmValidators.required] }), // valueAsNumber from input
  email: new NmFormControl("email", "asd@asd.com", { validators: [NmValidators.required] }), // value from input
  url: new NmFormControl("url", "url", {validators: [NmValidators.pattern(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)]}), // value from input
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
