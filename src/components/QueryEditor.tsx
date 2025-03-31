import { useState, useCallback } from "react";
import { useQueryStore } from "../store/queryStore";
import { sql } from "@codemirror/lang-sql";
import CodeMirror from "@uiw/react-codemirror";
import { parse } from "pgsql-ast-parser";
import { debounce } from "lodash";

const validateAndSetQuery = debounce(
  (
    query: string,
    setError: (err: string) => void,
    setQuery: (q: string) => void
  ) => {
    try {
      parse(query); // Validate SQL
      setError(""); // Clear error if valid
    } catch (err) {
      setError(
        "SQL Syntax Error: " +
          (err instanceof Error ? err.message : "Unknown error")
      );
    }
    setQuery(query);
  },
  300
);

const QueryEditor = () => {
  const { setQuery } = useQueryStore();
  const [query, setLocalQuery] = useState("");
  const [error, setError] = useState("");

  const handleQueryChange = useCallback(
    (value: string) => {
      setLocalQuery(value);
      validateAndSetQuery(value, setError, setQuery);
    },
    [setQuery]
  );

  return (
    <div>
      <CodeMirror
        value={query}
        extensions={[sql()]}
        onChange={handleQueryChange}
        theme="dark"
      />
      {error && <p style={{ color: "red", marginTop: "5px" }}>{error}</p>}
    </div>
  );
};

export default QueryEditor;
