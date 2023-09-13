/**Make all of the property in a (deely) object `T` optional
 * ```ts
 * interface Foobar {
 *   foo: number
 *   bar: {
 *     baz: boolean
 *     qux: string
 *   }
 * }
 * 
 * type b = DeepPartial<Foobar>
 * //   ^
 * // {
 * //    foo?: number
 * //    bar?: {
 * //      baz?: boolean
 * //      qux?: string
 * //    } 
 * // }
 * ```
 */
export type DeepPartial<AnyObject> = AnyObject extends object ? {
  [Props in keyof AnyObject]?: DeepPartial<AnyObject[Props]>;
} : never

/**Create a new type that make a property named `K` in type `T` optional
 * ```ts
 * type a = {
 *   title: string
 *   description: string
 * }
 * 
 * type b = PartialBy<a, 'description'>
 * //   ^ { title: string, description?: string }
 * ```
 */
export type PartialBy<AnyObject extends object, Key extends keyof AnyObject> = 
  Omit<AnyObject, Key> & Partial<Pick<AnyObject, Key>>

export type AnyAsyncFunction = (...args: any[]) => Promise<unknown>
/**Unwrap the return type of a function that returns a `Promise`
 * ```ts
 * async function doSomething() {}
 * 
 * type ReturnTypeOfIt = AsyncReturnType<typeof doSomething>
 * //   ^ void
 * ```
 */
export type AsyncReturnType<Target extends AnyAsyncFunction> = Awaited<ReturnType<Target>>