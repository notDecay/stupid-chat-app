export const appConfig = {
  version: {
    app: 'v1.0.0-beta-1',
    apiVersion: 'v1.0'
  },
  api: {
    ROUTE: '/duck',
    DEV_ORIGIN: 'http://localhost:4000',
  }
} as const