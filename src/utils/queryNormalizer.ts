export const normalizeQuery = (query: string): string =>
  query.replace(/\s+/g, " ").trim().toLowerCase().replace(/;$/, "");
