## TODO:

2. updateValueAndValidity
3. clearValidators/addValidators
4. hide all private actions
5. refactor

6. case - DOM element is added, gets deleted, gets restored | check connection to the DOMWorker

## Stopped at...

POSSIBLE BUG: I check to see if the control is a child of its parent formgroup in the DOM. But I can also have the case of TODO: 6, where the element hasn't been added to the DOM yet.
