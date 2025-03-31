import { parse, FromTable } from "pgsql-ast-parser"; // PostgreSQL AST parser

export const mockDatabase = {
  users: [
    { id: 1, name: "Alice", age: 25, role: "Admin" },
    { id: 2, name: "Bob", age: 30, role: "User" },
    { id: 3, name: "Charlie", age: 22, role: "User" },
    { id: 4, name: "David", age: 35, role: "Admin" },
  ],
  employees: [
    { id: 1, name: "Nancy Davolio", salary: "N/A", department: "Sales" },
    { id: 2, name: "Andrew Fuller", salary: "N/A", department: "Sales" },
    { id: 3, name: "Janet Leverling", salary: "N/A", department: "Sales" },
    { id: 4, name: "Margaret Peacock", salary: "N/A", department: "Sales" },
    { id: 5, name: "Steven Buchanan", salary: "N/A", department: "Sales" },
    { id: 6, name: "Michael Suyama", salary: "N/A", department: "Sales" },
    { id: 7, name: "Robert King", salary: "N/A", department: "Sales" },
    { id: 8, name: "Laura Callahan", salary: "N/A", department: "Sales" },
    { id: 9, name: "Anne Dodsworth", salary: "N/A", department: "Sales" },
  ],
  orders: [
    { id: 101, product: "Laptop", amount: 1200, status: "Shipped" },
    { id: 102, product: "Phone", amount: 800, status: "Pending" },
  ],
  products: [
    { id: 1, name: "Laptop", price: 1200, stock: 5 },
    { id: 2, name: "Phone", price: 800, stock: 10 },
  ],
};

export const mockQueries = [
  "SELECT * FROM users;",
  "SELECT name, age FROM users WHERE age > 30;",
  "SELECT COUNT(*) FROM orders;",
  "SELECT product, amount FROM orders WHERE status = 'Shipped';",
  "SELECT name, stock FROM products WHERE stock > 5;",
];

// Define QueryResult as an array of valid SQL rows
type QueryResult = Record<string, string | number | boolean>;

export const mockQueryResults = (query: string): QueryResult[] => {
  try {
    const ast = parse(query);
    if (!Array.isArray(ast) || ast.length === 0) return [];

    const statement = ast[0];
    if (statement.type !== "select") return [];

    const table = (statement.from?.[0] as FromTable)?.name.name;
    if (!table || !(table in mockDatabase)) return [];

    const selectedColumns = statement.columns
      ?.map((col) => (col.expr.type === "ref" ? col.expr.name : "*"))
      .filter(Boolean) as string[];

    const results = mockDatabase[table as keyof typeof mockDatabase];

    if (!Array.isArray(results)) return [];

    return selectedColumns.includes("*")
      ? results
      : results.map((row) =>
          Object.fromEntries(
            Object.entries(row).filter(([key]) => selectedColumns.includes(key))
          )
        );
  } catch (err) {
    console.error("SQL Parsing Error:", err);
    return [];
  }
};
