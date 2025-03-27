import { useState, useCallback } from "react";
import { useQueryStore } from "../store/queryStore";
import { sql } from "@codemirror/lang-sql";
import CodeMirror from "@uiw/react-codemirror";
import { parse } from "pgsql-ast-parser";
import { debounce } from "lodash";

const QueryEditor = () => {
  const { setQuery } = useQueryStore();
  const [query, setLocalQuery] = useState("");
  const [error, setError] = useState("");

  // Debounced query validation to avoid excessive re-renders
  const validateQuery = useCallback(
    debounce((value: string) => {
      try {
        parse(value); // Validate SQL
        setError(""); // Clear error if valid
      } catch (err) {
        setError(
          "SQL Syntax Error: " +
            (err instanceof Error ? err.message : "Unknown error")
        );
      }
    }, 300),
    [debounce]
  );

  const handleQueryChange = (value: string) => {
    setLocalQuery(value);
    setQuery(value);
    validateQuery(value); // Call debounced validation
  };

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
