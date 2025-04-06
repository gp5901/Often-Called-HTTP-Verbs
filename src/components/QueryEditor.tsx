import { useCallback, useEffect, useState } from "react";
import { useQueryStore } from "../store/queryStore";
import { sql } from "@codemirror/lang-sql";
import CodeMirror from "@uiw/react-codemirror";
import { executeQuery } from "../utils/queryParser";
import QueryResultTable from "./QueryResultTable";

const QueryEditor = () => {
  const { setQuery, selectedQuery } = useQueryStore();
  const [query, setLocalQuery] = useState("");
  type TableRow = Record<string, string | number | boolean | null>;
  const [queryResult, setQueryResult] = useState<TableRow[]>([]);

  const handleQueryChange = (value: string) => {
    setLocalQuery(value);
    setQuery(value.trim());
  };

  // ✅ Memoize runQuery to avoid ESLint warning and infinite reruns
  const runQuery = useCallback(
    async (incomingQuery?: string) => {
      const trimmedQuery = (incomingQuery || selectedQuery).trim();

      if (!trimmedQuery) {
        console.error("❌ SQL Error: Query is empty.");
        return;
      }

      console.log("📥 Final query sent:", trimmedQuery);

      try {
        const result = await executeQuery(trimmedQuery);

        console.log("✅ Matched Result:", result);

        const sanitizedResult = result.map(
          (row) =>
            Object.fromEntries(
              Object.entries(row).map(([key, value]) => [
                key,
                value === undefined ? null : value,
              ])
            ) as TableRow
        );

        setQueryResult(sanitizedResult);
      } catch (error) {
        console.error("❌ SQL Execution Failed:", error);
      }
    },
    [selectedQuery] // only depends on this
  );

  // 🛠️ Fix: add `runQuery` safely now
  useEffect(() => {
    if (selectedQuery) {
      setLocalQuery(selectedQuery);
      runQuery(selectedQuery);
    }
  }, [selectedQuery, runQuery]);

  return (
    <div>
      <CodeMirror
        value={query}
        extensions={[sql()]}
        onChange={handleQueryChange}
        theme="dark"
      />
      <button onClick={() => runQuery()}>Run Query</button>
      <QueryResultTable data={queryResult} />
    </div>
  );
};

export default QueryEditor;
