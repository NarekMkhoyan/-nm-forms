## TODO:

1. group - set/patch/reset value

2. Validators
3. css classes

4. nonNullable
5. case - DOM element is added, gets deleted, gets restored | check connection to the DOMWorker

## Stopped at...

- need to create separate functions for groups and controls
  1. ✔️ set - should aslo trigger validation checks, and dom class set
  2. ✔️ patch - should aslo trigger validation checks, and dom class set
  3. reset - should also reset the state (untouched, pristine....)
  - all 3 must work on parent/child levels

POSSIBLE BUG: I check to see if the control is a child of its parent formgroup in the DOM. But I can also have the case of TODO: 5, where the element hasn't been added to the DOM yet.
