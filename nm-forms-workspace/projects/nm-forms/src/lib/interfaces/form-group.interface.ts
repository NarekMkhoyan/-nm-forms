import { FormBaseNode } from "../classes/FormBaseNode";

export declare type ɵIsAny<T, Y, N> = 0 extends 1 & T ? Y : N;

export declare type ɵValue<T extends FormBaseNode<any> | undefined> = T extends FormBaseNode<any, any>
  ? T["value"]
  : never;

export declare type ɵFormGroupValue<
  T extends {
    [K in keyof T]?: FormBaseNode<any>;
  }
> = ɵTypedOrUntyped<
  T,
  Partial<{
    [K in keyof T]: ɵValue<T[K]>;
  }>,
  {
    [key: string]: any;
  }
>;

export declare type ɵTypedOrUntyped<T, Typed, Untyped> = ɵIsAny<T, Untyped, Typed>;
