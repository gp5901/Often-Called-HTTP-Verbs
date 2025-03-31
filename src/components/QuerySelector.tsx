// import React from "react";
import { useCallback } from "react";
import { useQueryStore } from "../store/queryStore";
import styles from "../styles/QuerySelector.module.css";

const queries = [
  "SELECT * FROM users;",
  "SELECT name, age FROM employees WHERE age > 30;",
  "SELECT name, age FROM users WHERE age > 30;",
  "SELECT COUNT(*) FROM orders;",
  "SELECT id, name FROM orders WHERE salary < 20;",
  "SELECT name, stock FROM products WHERE stock > 5;",
];

const QuerySelector = () => {
  const { selectedQuery, setQuery } = useQueryStore();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setQuery(e.target.value);
    },
    [setQuery]
  );

  return (
    <div className={styles["query-selector-container"]}>
      <label htmlFor="query-selector" className={styles["query-label"]}>
        Select a Query:
      </label>
      <select
        id="query-selector"
        className={styles["query-dropdown"]}
        value={selectedQuery || ""}
        onChange={handleChange}
      >
        <option value="" disabled>
          Select a query
        </option>
        {queries.map((query, index) => (
          <option key={index} value={query}>
            {query}
          </option>
        ))}
      </select>
    </div>
  );
};

export default QuerySelector;
