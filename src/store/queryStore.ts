import { create } from "zustand";
import { mockQueryResults } from "../utils/mockData";

// Define the structure of a SQL query result row
type QueryResult = Record<string, string | number | boolean | null>;

type QueryStore = {
  selectedQuery: string;
  resultData: QueryResult[];
  setQuery: (query: string) => void;
};

// ✅ Utility: Normalize query string to match mock keys
const normalizeQuery = (query: string): string =>
  query.toLowerCase().replace(/\s+/g, " ").replace(/;$/, "").trim();

export const useQueryStore = create<QueryStore>((set) => ({
  selectedQuery: "",
  resultData: [],
  setQuery: (query) => {
    const normalizedQuery = normalizeQuery(query);
    const result = mockQueryResults[normalizedQuery] || [];

    // Log fallback
    if (!mockQueryResults[normalizedQuery]) {
      console.warn("🛑 No mock result found for:", normalizedQuery);
    }

    set({
      selectedQuery: query,
      resultData: Array.isArray(result)
        ? result.filter(
            (item): item is QueryResult =>
              typeof item === "object" && item !== null
          )
        : [],
    });
  },
}));
