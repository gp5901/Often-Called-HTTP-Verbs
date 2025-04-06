// import React from "react";
import { useQueryStore } from "../store/queryStore";

const queries = [
  "SELECT * FROM customers;",
  "SELECT * FROM employees;",
  "SELECT * FROM orders;",
  "SELECT * FROM products;",
  "SELECT * FROM categories;",

  "SELECT customerID, companyName FROM customers;",
  "SELECT firstName, lastName FROM employees;",
  "SELECT orderID, orderDate FROM orders;",
  "SELECT productID, productName, unitPrice FROM products;",
  "SELECT categoryID, categoryName FROM categories;",

  "SELECT COUNT(*) FROM customers;",
  "SELECT COUNT(*) FROM employees;",
  "SELECT COUNT(*) FROM orders;",
  "SELECT COUNT(*) FROM products;",
  "SELECT COUNT(*) FROM categories;",

  "SELECT * FROM customers WHERE country = 'Germany';",
  "SELECT * FROM employees WHERE city = 'Seattle';",
  "SELECT * FROM orders WHERE shipCountry = 'France';",
  "SELECT * FROM products WHERE discontinued = false;",
  "SELECT * FROM categories WHERE categoryName = 'Beverages';",

  "SELECT * FROM products ORDER BY unitPrice DESC LIMIT 5;",
  "SELECT * FROM orders ORDER BY orderDate DESC LIMIT 10;",
  "SELECT * FROM employees ORDER BY hireDate ASC;",

  // Simulated joins and group by for demo purposes
  "SELECT DISTINCT customerID, companyName FROM customers JOIN orders ON customers.customerID = orders.customerID;",
  "SELECT employeeID, firstName, lastName, COUNT(orderID) FROM employees JOIN orders ON employees.employeeID = orders.employeeID GROUP BY employeeID ORDER BY COUNT(orderID) DESC LIMIT 5;",
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
