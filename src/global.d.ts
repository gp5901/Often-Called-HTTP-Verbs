export {};

declare global {
  interface Window {
    executeQuery: (query: string) => unknown;
  }
}
