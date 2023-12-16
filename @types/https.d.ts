export {}

declare global {
  /**HTTP response status codes indicate whether a 
   * specific HTTP request has been successfully completed. 
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#successful_responses
   */
  namespace HttpStatusCode {
    export const Okey = 200

    // Client side error
    /**aka. `Bad Request` */
    export const BadDuck = 400
    export const Unauthorized = 401
    export const ForbiddenDuck = 403
    export const DuckNotFound = 404
    /**aka. `Method Not Allowed` */
    export const DuckNotAllowed = 405
    /**aka. `Too Many Requests` */
    export const TooManyDuck = 429

    // Server side error
    /**aka. `Internal Server Error` */
    export const DuckInternalError = 500
    export const DuckNotImplemented = 501
  }
}