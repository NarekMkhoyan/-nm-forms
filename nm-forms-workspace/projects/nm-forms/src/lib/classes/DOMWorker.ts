import { INmFormControlOptions } from "../interfaces/form-control-options.interface";
import { FormControlCSSClasses } from "../constants/FormControlCSSClasees.constant";
import { FormBaseNode } from "./FormBaseNode";

class DOMWorker<T> {
  DOMElements: Element[] = [];
  DOMObserver: MutationObserver | undefined = undefined;
  static allCSSClasses: string[];

  constructor(private controlReference: FormBaseNode<T>, private options: INmFormControlOptions) {
    this.createAllCSSClasses();
    this.connectToDOMElement();
  }

  public updateDOMElementValue(): void {
    if (!this.DOMElements.length) {
      return;
    }
    this.DOMElements.forEach((element) => {
      this.setInputValueByType(element as HTMLInputElement);
    });
  }

  private connectToDOMElement(): void {
    this.DOMObserver = new MutationObserver(() => {
      this.DOMElements = this.findRelatedElements();
      if (!this.DOMElements.length) return;
      this.updateDOMElementValue();
      this.updateCSSClassList();
      if (!this.options.groupModeActive) {
        this.applyInputListener();
        this.applyFocusListener();
      }
      this.DOMObserver?.disconnect();
    });

    this.DOMObserver.observe(document, { childList: true, subtree: true });
  }

  //? Class handlers
  //! might need to change to public, to use after validation checks
  private updateCSSClassList(): void {
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
        this.controlReference.setValue(newValue);
        if (this.controlReference.pristine) {
          this.controlReference.markAsDirty();
          this.updateCSSClassList();
        }
      });
    });
  }

  private applyFocusListener(): void {
    if (!this.DOMElements.length) return;
    this.DOMElements.forEach((element) => {
      element.addEventListener("focus", () => {
        if (this.controlReference.untouched) {
          this.controlReference.markAsTouched();
          this.updateCSSClassList();
        }
      });
    });
  }

  private findRelatedElements(): Element[] {
    const queryString = `[data-${this.options.groupModeActive ? "nmFormGroup" : "nmFormControl"}="${
      this.controlReference.controlName
    }"]`;
    const allInstances = document.querySelectorAll(queryString);
    const relatedElements: Element[] = [];
    allInstances.forEach((instance) => {
      //! MISSING CASE: if the control doesn't have a parent group
      if (instance.parentElement?.dataset["nmformgroup"] === this.controlReference.parentFormGroup?.controlName) {
        relatedElements.push(instance);
      }
    });

    return relatedElements;
  }

  //! Take out of the class
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

  //! Take out of the class
  private getInputValueByType(element: HTMLInputElement): T {
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
}

export { DOMWorker };
