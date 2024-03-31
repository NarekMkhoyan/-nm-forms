## TODO:

5. getRawValue - to get the group value, regardless of disabled state of its controls
1. css classes
3. updateValueAndValidity
4. clearValidators/addValidators
6. hide all private actions

2. case - DOM element is added, gets deleted, gets restored | check connection to the DOMWorker

## Stopped at...
Need to create a separate getRawValue function for formGroups, so later I can implement enable/disable functionality that will propagate the value and the validity of disabled controls to the FG

POSSIBLE BUG: I check to see if the control is a child of its parent formgroup in the DOM. But I can also have the case of TODO: 2, where the element hasn't been added to the DOM yet.

PROBLEM: when disabling a formCOntrol, it disables the control and sets its validity to true, but the parent formGroup validity doesn't get updated. 
