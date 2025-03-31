import { parse, SelectStatement } from "pgsql-ast-parser";
import { mockDatabase } from "../utils/mockData";

// Define expected table names as a union type
type TableNames = "users" | "employees" | "orders" | "products";

export const executeQuery = (
  query: string
): Array<Record<string, string | number | boolean>> => {
  try {
    const ast = parse(query);
    if (!Array.isArray(ast) || ast.length === 0) {
      console.warn("SQL Parsing Warning: Empty or invalid query.");
      return [];
    }

    const statement = ast[0] as SelectStatement;
    if (statement.type !== "select") {
      console.warn(
        "Unsupported SQL Query: Only SELECT statements are allowed."
      );
      return [];
    }

    // Safely extract the table name and assert it to the known table names
    const tableName =
      statement.from?.[0] && "name" in statement.from[0]
        ? (statement.from[0].name as unknown as TableNames) // Assert to a specific table name type
        : undefined;

    if (!tableName || !(tableName in mockDatabase)) {
      console.warn(`Table "${tableName}" not found in mock database.`);
      return [];
    }

    const tableData = mockDatabase[tableName]; // Table data based on the tableName

    // Extract selected columns
    const selectedColumns = new Set(
      statement.columns?.map((col) =>
        col.expr.type === "ref" ? col.expr.name : "*"
      ) ?? ["*"]
    );

    return tableData.map((row) => {
      if (selectedColumns.has("*")) {
        return Object.fromEntries(
          Object.entries(row).filter(([, value]) => value !== undefined)
        );
      }
      return Object.fromEntries(
        Object.entries(row).filter(([key]) => selectedColumns.has(key))
      );
    });
  } catch (err) {
    console.error("SQL Parsing Error:", err);
    return [];
  }
};
