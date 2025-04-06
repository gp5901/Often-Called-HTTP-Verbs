import { useState } from "react";
import { useQueryStore } from "../store/queryStore";
import { sql } from "@codemirror/lang-sql";
import CodeMirror from "@uiw/react-codemirror";
import { executeQuery } from "../utils/queryParser";
import QueryResultTable from "./QueryResultTable";

const QueryEditor = () => {
  const { setQuery } = useQueryStore();
  const [query, setLocalQuery] = useState("");
  type TableRow = Record<string, string | number | boolean | null>; // Define TableRow type with specific types
  const [queryResult, setQueryResult] = useState<TableRow[]>([]); // Store query results

  const handleQueryChange = (value: string) => {
    setLocalQuery(value);
    setQuery(value.trim()); // Prevent storing empty queries
  };

  const runQuery = async () => {
    const trimmedQuery = useQueryStore.getState().selectedQuery.trim();

    if (!trimmedQuery) {
      console.error("❌ SQL Error: Query is empty.");
      return;
    }

    console.log("📥 Final query sent:", trimmedQuery); // Log the input query

    try {
      const result = await executeQuery(trimmedQuery); // Handle async updates

      console.log("✅ Matched Result:", result); // Log raw result before sanitizing

      const sanitizedResult = result.map(
        (row) =>
          Object.fromEntries(
            Object.entries(row).map(([key, value]) => [
              key,
              value === undefined ? null : value,
            ])
          ) as TableRow
      );

      setQueryResult(sanitizedResult); // Update UI with clean data
    } catch (error) {
      console.error("❌ SQL Execution Failed:", error);
    }
  };

  return (
    <div>
      <CodeMirror
        value={query}
        extensions={[sql()]}
        onChange={handleQueryChange}
        theme="dark"
      />
      <button onClick={runQuery}>Run Query</button>

      {/* Render query results */}
      <QueryResultTable data={queryResult} />
    </div>
  );
};

export default QueryEditor;
