import { create } from "zustand";
import { mockQueryResults } from "../utils/mockData";

// Define the structure of a SQL query result row
type QueryResult = Record<string, string | number | boolean>;

type QueryStore = {
  selectedQuery: string;
  resultData: QueryResult[]; 
  setQuery: (query: string) => void;
};

export const useQueryStore = create<QueryStore>((set) => ({
  selectedQuery: "",
  resultData: [],
  setQuery: (query) => {
    const result = mockQueryResults(query);

    set({
      selectedQuery: query,
      resultData: Array.isArray(result) ? result.filter((item): item is QueryResult => {
        return typeof item === 'object' && item !== null && Object.values(item).every(value =>
          ['string', 'number', 'boolean'].includes(typeof value)
        );
      }) : [], // Ensures resultData is always an array of QueryResult
    });
  },
}));
