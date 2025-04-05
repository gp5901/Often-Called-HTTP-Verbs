import {
  parse,
  SelectFromStatement,
  QName,
  SelectedColumn,
} from "pgsql-ast-parser";
import { mockDatabase } from "../utils/mockData";
import { TableRow } from "../types"; // Define TableRow type with specific types

export const executeQuery = async (query: string): Promise<TableRow[]> => {
  try {
    const ast = parse(query);
    if (!ast.length) return [];

    const statement = ast[0] as SelectFromStatement;

    // Ensure 'FROM' exists
    if (!statement.from?.length) return [];

    // Extract table name safely
    const fromItem = statement.from[0];
    const tableName =
      fromItem.type === "table" ? (fromItem.name as QName).name : undefined;
    if (!tableName || !(tableName in mockDatabase)) return [];

    const data: TableRow[] = mockDatabase[tableName];

    // If no columns are specified, return full table
    if (!statement.columns || !Array.isArray(statement.columns)) return data;

    const columns: SelectedColumn[] = statement.columns;

    return data.map((row) =>
      Object.fromEntries(
        columns
          .map((col) => {
            if (col.expr.type !== "ref") return null;
            const colName = col.expr.name as string;
            return colName in row ? [colName, row[colName]] : null;
          })
          .filter(Boolean) as [string, string | number | boolean | null][]
      )
    );
  } catch (error) {
    console.error("SQL Parsing Error:", error);
    return [];
  }
};
