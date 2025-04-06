import { create } from "zustand";
import { mockQueryResults } from "../utils/mockData";
import { normalizeQuery } from "../utils/queryNormalizer"; // External utility for query normalization

type QueryResult = Record<string, string | number | boolean | null>;

type QueryStore = {
  selectedQuery: string;
  resultData: QueryResult[];
  setQuery: (query: string) => void;
};

export const useQueryStore = create<QueryStore>((set) => ({
  selectedQuery: "",
  resultData: [],
  setQuery: (query) => {
    const normalized = normalizeQuery(query);
    const result = mockQueryResults[normalized] || [];

    // Debug logs
    console.log("📥 Final query sent:", normalized);
    console.log("✅ Matched Result:", result);

    // Log fallback
    if (!mockQueryResults[normalized]) {
      console.warn("🛑 No mock result found for:", normalized);
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
