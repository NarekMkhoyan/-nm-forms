## TODO:

1. css classes
3. updateValueAndValidity
4. clearValidators/addValidators

2. case - DOM element is added, gets deleted, gets restored | check connection to the DOMWorker

## Stopped at...


POSSIBLE BUG: I check to see if the control is a child of its parent formgroup in the DOM. But I can also have the case of TODO: 2, where the element hasn't been added to the DOM yet.

PROBLEM: when disabling a formCOntrol, it disables the control and sets its validity to true, but the parent formGroup validity doesn't get updated. 

Thinking of refactoring the code and ditching JS's BS class system in favour of prototypal delegation 
