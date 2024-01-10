export const enum ApiRoutes {
  BASE_ROUTE = '/duck',
  BASE_API_HREF = 'http://localhost:4000',
  // ...
  user = '/user'
}

export const enum ChatSocketEvent {
  /**Whenever a message is sent to the server */
  messageSend = "1"
}