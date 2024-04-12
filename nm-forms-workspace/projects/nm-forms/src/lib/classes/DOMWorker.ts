import { FormControlCSSClasses } from "../constants/FormControlCSSClasees.constant";
import { FormBaseNode } from "./FormBaseNode";
import NmFormControl from "./FormControl";
import NmFormGroup from "./FormGroup";

class DOMWorker<T> {
  DOMElements: Element[] = [];
  DOMObserver: MutationObserver | undefined = undefined;
  static allCSSClasses: string[];

  constructor(private controlReference: FormBaseNode<T>) {
    this.createAllCSSClasses();
    this.connectToDOMElement();
  }

  public disableFormControls(): void {
    this.DOMElements.forEach((element) => {
      element.setAttribute("disabled", "true");
      this.controlReference.checkValidity(this.controlReference.value as T);
      if (this.controlReference.parentFormGroup) {
        this.controlReference.parentFormGroup.checkValidity(null);
      }
    });
  }

  public enableFormControls(): void {
    this.DOMElements.forEach((element) => {
      element.removeAttribute("disabled");
      this.controlReference.checkValidity(this.controlReference.value as T);
      if (this.controlReference.parentFormGroup) {
        this.controlReference.parentFormGroup.checkValidity(null);
      }
    });
  }

  public updateDOMElementValue(): void {
    if (!this.DOMElements.length) {
      return;
    }
    this.DOMElements.forEach((element) => {
      this.setInputValueByType(element as HTMLInputElement);
    });
  }

  public updateCSSClassList(): void {
    if (!this.DOMElements.length) return;
    this.DOMElements.forEach((element) => {
      element.classList.remove(...DOMWorker.allCSSClasses);
    });

    const classes = Object.keys(this.controlReference)
      .filter((key) => FormControlCSSClasses.includes(key) && (this.controlReference as any)[key])
      .map((classKey) => `nm${classKey.charAt(0).toUpperCase() + classKey.slice(1)}`);
    this.DOMElements.forEach((element) => {
      element.classList.add(...classes);
    });
  }

  public connectToDOMElement(): void {
    this.DOMObserver = new MutationObserver(() => {
      this.DOMElements = this.findRelatedElements();
      if (!this.DOMElements.length) return;
      this.updateDOMElementValue();
      this.updateCSSClassList();
      if (this.controlReference.nodeType === "form-control") {
        this.applyInputListener();
        this.applyBlurListener();
      }
      this.DOMObserver?.disconnect();
    });

    this.DOMObserver.observe(document, { childList: true, subtree: true });
  }

  private createAllCSSClasses(): void {
    const allClasses = FormControlCSSClasses.map(
      (className) => `nm${className.charAt(0).toUpperCase() + className.slice(1)}`
    );
    DOMWorker.allCSSClasses = allClasses;
  }

  //? Event handlers
  private applyInputListener(): void {
    if (!this.DOMElements.length) return;
    this.DOMElements.forEach((element) => {
      const eventListenerType: string = this.getEventListenerType(element);
      element.addEventListener(eventListenerType, ($event: Event) => {
        const newValue = this.getInputValueByType($event.target as HTMLInputElement);
        (this.controlReference as NmFormGroup | NmFormControl).setValue(newValue);
        if (this.controlReference.pristine) {
          this.controlReference.markAsDirty();
        }
        this.updateCSSClassList();
      });
    });
  }

  private applyBlurListener(): void {
    if (!this.DOMElements.length) return;
    this.DOMElements.forEach((element) => {
      element.addEventListener("blur", () => {
        if (this.controlReference.untouched) {
          this.controlReference.markAsTouched();
          this.updateCSSClassList();
        }
      });
    });
  }

  private findRelatedElements(): Element[] {
    const queryString = `[data-${this.controlReference.nodeType === "form-group" ? "nmFormGroup" : "nmFormControl"}="${
      this.controlReference.controlName
    }"]`;
    const allInstances = document.querySelectorAll(queryString);
    const relatedElements: Element[] = [];
    allInstances.forEach((instance) => {
      const instanceParent = this.getElementParentWithDataAttribute(instance as HTMLElement);
      if (this.controlReference.parentFormGroup) {
        if (instanceParent?.dataset["nmformgroup"] === this.controlReference.parentFormGroup.controlName) {
          relatedElements.push(instance);
        } else {
          throw new Error(
            `FormControl named ${this.controlReference.controlName}, is declared within a FormGroup named ${this.controlReference.parentFormGroup.controlName}, but the input element tagged with data-nmFormControl=${this.controlReference.controlName} is not a child of an element tagged with data-nmFormGroup=${this.controlReference.parentFormGroup.controlName}`
          );
        }
      } else {
        relatedElements.push(instance);
      }
    });

    return relatedElements;
  }

  private getEventListenerType(element: Element): string {
    switch ((element as HTMLInputElement).type) {
      case "radio":
      case "checkbox":
      case "file":
        return "change";
      case "text":
      case "password":
      case "textarea":
      case "email":
      case "url":
      case "color":
      case "search":
      case "tel":
      case "select-one":
      case "number":
      case "range":
      case "date":
      case "time":
      case "datetime-local":
      case "month":
      case "week":
      default:
        return "input";
    }
  }

  private getInputValueByType(element: HTMLInputElement): any {
    switch ((element as HTMLInputElement).type) {
      case "checkbox":
        return element.checked as T;
      case "file":
        return element.files as T;
      case "date":
      case "time":
      case "month":
      case "week":
        return element.valueAsDate as T;
      case "number":
      case "range":
      case "datetime-local":
        return element.valueAsNumber as T;
      case "radio":
      case "text":
      case "password":
      case "textarea":
      case "email":
      case "url":
      case "color":
      case "search":
      case "tel":
      case "select-one":
      default:
        return element.value as T;
    }
  }

  private setInputValueByType(element: HTMLInputElement): void {
    switch (element.type) {
      case "checkbox":
        element.checked = Boolean(this.controlReference.value);
        break;
      case "file":
        break;
      case "date":
      case "time":
      case "month":
      case "week":
        element.valueAsDate = this.controlReference.value as Date | null;
        break;
      case "number":
      case "range":
      case "datetime-local":
        element.valueAsNumber = this.controlReference.value as number;
        break;
      case "radio":
        if (element.value === this.controlReference.value) {
          element.checked = true;
        }
        break;
      case "text":
      case "password":
      case "textarea":
      case "email":
      case "url":
      case "color":
      case "search":
      case "tel":
      case "select-one":
      default:
        element.value = this.controlReference.value as string;
        break;
    }
  }

  private getElementParentWithDataAttribute(element: HTMLElement): HTMLElement | null {
    let parentEl = element.parentElement;
    if (parentEl) {
      const dataAttr = parentEl.dataset["nmformgroup"];
      if (dataAttr) {
        return parentEl;
      } else {
        parentEl = this.getElementParentWithDataAttribute(parentEl);
      }
    } else {
      return null;
    }

    return parentEl;
  }
}

export { DOMWorker };
