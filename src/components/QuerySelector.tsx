// import React from "react";
import { useQueryStore } from "../store/queryStore";

const queries = [
  "SELECT * FROM customers;",
  "SELECT firstName, lastName FROM employees WHERE age > 30;",
  "SELECT COUNT(*) FROM orders;",
  "SELECT productName, unitPrice FROM products WHERE unitPrice > 50;",
  "SELECT * FROM employees;",
  "SELECT * FROM orders;",
  "SELECT * FROM products;",
];

const QuerySelector = () => {
  const { selectedQuery, setQuery } = useQueryStore();

  return (
    <div>
      <label htmlFor="query-selector">Select a Query</label>
      <select
        id="query-selector"
        value={selectedQuery}
        onChange={(e) => setQuery(e.target.value)}
      >
        <option value="">Select a query</option>
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
