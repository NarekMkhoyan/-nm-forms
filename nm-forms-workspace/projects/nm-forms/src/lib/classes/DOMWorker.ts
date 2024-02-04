import { INmFormControlOptions } from "../interfaces/FormControlOptions.interface";
import { FormControlCSSClassTypes } from "./../interfaces/FormControlCSSClasees.type";
import { FormBaseNode } from "./FormBaseNode";

class DOMWorker {
  DOMElement: Element | null = null;
  DOMObserver: MutationObserver | undefined = undefined;
  static allCSSClasses: string[];

  constructor(private controlReference: FormBaseNode<any>, private options: INmFormControlOptions) {
    this.createAllCSSClasses();
    this.connectToDOMElement();
  }

  private connectToDOMElement(): void {
    const queryString = `[data-${this.options.groupModeActive ? "nmFormGroup" : "nmFormControl"}="${
      this.controlReference.controlName
    }"]`;

    this.DOMObserver = new MutationObserver(() => {
      this.DOMElement = document.querySelector(queryString);
      if (!this.DOMElement) return;
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
    if (!this.DOMElement) return;
    this.DOMElement.classList.remove(...DOMWorker.allCSSClasses);
    const classes = Object.keys(this.controlReference)
      .filter((key) => FormControlCSSClassTypes.includes(key) && (this.controlReference as any)[key])
      .map((classKey) => `nm${classKey.charAt(0).toUpperCase() + classKey.slice(1)}`);
    this.DOMElement.classList.add(...classes);
  }

  private createAllCSSClasses(): void {
    const allClasses = FormControlCSSClassTypes.map(
      (className) => `nm${className.charAt(0).toUpperCase() + className.slice(1)}`
    );
    DOMWorker.allCSSClasses = allClasses;
  }

  //? Event handlers
  private applyInputListener(): void {
    if (!this.DOMElement) return;
    this.DOMElement.addEventListener("input", ($event: Event) => {
      this.controlReference.setValue(($event.target as HTMLInputElement).value);
      if (this.controlReference.pristine) {
        this.controlReference.markAsDirty();
        this.updateCSSClassList();
      }
    });
  }

  private applyFocusListener(): void {
    if (!this.DOMElement) return;
    this.DOMElement.addEventListener("focus", () => {
      if (this.controlReference.untouched) {
        this.controlReference.markAsTouched();
        this.updateCSSClassList();
      }
    });
  }
}

export { DOMWorker };
