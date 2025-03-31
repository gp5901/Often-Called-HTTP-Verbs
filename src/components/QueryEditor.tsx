import { useState } from "react";
import { useQueryStore } from "../store/queryStore";
import { sql } from "@codemirror/lang-sql";
import CodeMirror from "@uiw/react-codemirror";
import { executeQuery } from "../utils/queryParser";
import QueryResultTable from "./QueryResultTable"; // ✅ Ensure UI renders results

const QueryEditor = () => {
  const { setQuery } = useQueryStore();
  const [query, setLocalQuery] = useState("");
  type TableRow = Record<string, string | number | boolean | null>; // Define TableRow type with specific types
  const [queryResult, setQueryResult] = useState<TableRow[]>([]); // ✅ Store query results

  const handleQueryChange = (value: string) => {
    setLocalQuery(value);
    setQuery(value.trim()); // Prevent storing empty queries
  };

  const runQuery = async () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      console.error("SQL Error: Query is empty.");
      return;
    }

    try {
      const result = await executeQuery(trimmedQuery); // ✅ Handle async updates
      console.log("Query Result:", result);
      setQueryResult(result); // ✅ Update UI with query results
    } catch (error) {
      console.error("SQL Execution Failed:", error);
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

      {/* ✅ Render query results */}
      <QueryResultTable data={queryResult} />
    </div>
  );
};

export default QueryEditor;
