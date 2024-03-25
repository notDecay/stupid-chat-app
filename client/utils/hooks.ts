import { Context, useContext as _useContext } from "solid-js"
import { createStore as _createStore } from "solid-js/store"

/**A wrapper of solidjs's [`useContext()`](https://docs.solidjs.com/references/api-reference/component-apis/useContext)
 * hook with checking.
 * @param anyContext 
 * @param errorMessage throw this error message if `useContext()` returns `undefined`
 */
export function useContext<T>(anyContext: Context<T>, errorMessage?: string) {
  return function() {
    const thisContext = _useContext(anyContext)
    if (!thisContext) {
      throw new Error(errorMessage)
    }
    
    return thisContext
  }
}

/**Get the return type of the solidjs's
 * [`createStore()`](https://docs.solidjs.com/references/api-reference/stores/using-stores)
 * hook.
 */
export type Store<T extends object = {}> = ReturnType<typeof _createStore<T>>