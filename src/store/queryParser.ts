import {
  parse,
  SelectFromStatement,
  QName,
  SelectedColumn,
} from "pgsql-ast-parser";
import { mockDatabase } from "../utils/mockData";

// Define TableRow type
type TableRow = { [key: string]: string | number | boolean | null | undefined };

export const normalizeQuery = (query: string): string =>
  query.replace(/;$/, "").trim().toLowerCase();

export const executeQuery = async (query: string): Promise<TableRow[]> => {
  try {
    const ast = parse(query);
    if (!ast.length) return [];

    const statement = ast[0] as SelectFromStatement;

    // Ensure 'from' exists
    if (!statement.from?.length) return [];

    // Extract table name safely
    const fromItem = statement.from[0];
    const tableName =
      fromItem?.type === "table" && typeof fromItem.name === "object"
        ? (fromItem.name as QName).name
        : undefined;
    if (!tableName || !(tableName in mockDatabase)) return [];

    const data: TableRow[] = mockDatabase[tableName];

    // If no columns are specified, return full table
    if (!statement.columns || !Array.isArray(statement.columns)) return data;

    // Store columns in a typed variable to avoid TS null/undefined errors
    const columns: SelectedColumn[] = statement.columns;

    return data.map((row) =>
      Object.fromEntries(
        columns
          .filter((col): col is SelectedColumn => col.expr.type === "ref") // ✅ Ensure valid column
          .map((col) => {
            const colName =
              col.expr.type === "ref" && typeof col.expr.name === "object"
                ? (col.expr.name as QName).name
                : undefined;
            return colName && colName in row
              ? ([colName, row[colName]] as [
                  string,
                  string | number | boolean | null
                ])
              : null; // ✅ Prevent `undefined: null`
          })
          .filter(
            (entry): entry is [string, string | number | boolean | null] =>
              entry !== null
          ) // ✅ Properly type-guard null entries
      )
    );
  } catch (error) {
    console.error("SQL Parsing Error:", error);
    return [];
  }
};
