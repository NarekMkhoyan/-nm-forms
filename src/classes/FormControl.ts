import NmFormBaseNode from "./FormBaseNode";

class NmFormControl<T> extends NmFormBaseNode<T> {
  constructor(initialValue: T) {
    super(initialValue);
  }
}

export default NmFormControl;
