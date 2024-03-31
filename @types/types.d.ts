import type { JSX as _JSX } from "solid-js"

export {}

declare global {
  /**Type alias for any function type.
   * 
   * This type allows any function to be assigned to a variable of type `AnyFunction`.
   * However, it does not provide any information about the arguments or return type of the function.
   */
  type AnyFunction = (...args: any[]) => any

  type CouldBe<Anything> = Anything | null
}