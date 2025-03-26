import { parse } from "pgsql-ast-parser";
import { mockDatabase } from "../utils/mockData";

export const executeQuery = (
  query: string
): Array<Record<string, string | number | boolean>> => {
  try {
    const ast = parse(query);
    if (!Array.isArray(ast) || ast.length === 0) return [];

    const statement = ast[0];
    if (statement.type !== "select") return [];

    const tableName =
      statement.from?.[0] && "name" in statement.from[0]
        ? (statement.from[0].name as unknown as string)
        : undefined;
    if (!tableName || !(tableName in mockDatabase)) return [];

    const selectedColumns = (statement.columns ?? []).map((col) =>
      col.expr.type === "ref" ? col.expr.name : "*"
    );

    const results = mockDatabase[tableName as keyof typeof mockDatabase];

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
