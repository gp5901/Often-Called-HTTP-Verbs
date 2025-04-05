import { mockDatabase } from "./mockData";

// Define TableRow with a proper index signature
type TableRow = { [key: string]: string | number | boolean | null };

export const executeQuery = (query: string): TableRow[] => {
  const normalizedQuery = query.trim().toLowerCase().replace(/;$/, ""); // Remove trailing semicolon

  // Extract table name
  const tableMatch = normalizedQuery.match(/from\s+(\w+)/);
  if (!tableMatch) {
    console.error("Invalid query: No table found.");
    return [];
  }

  const tableName = tableMatch[1] as keyof typeof mockDatabase; // Ensures tableName is valid
  const tableData = mockDatabase[tableName];
  if (!tableData) {
    console.error(`Table '${tableName}' not found.`);
    return [];
  }

  // Extract selected columns
  const columnMatch = normalizedQuery.match(/select\s+(.+?)\s+from/i);
  if (!columnMatch) {
    return tableData.map((row) =>
      Object.fromEntries(
        Object.entries(row).map(([key, value]) => [key, value ?? null])
      )
    );
  }

  const selectedColumns = columnMatch[1].split(",").map((col) => col.trim());

  // If '*' is used, return full table data
  if (selectedColumns.length === 1 && selectedColumns[0] === "*") {
    return tableData.map((row) =>
      Object.fromEntries(
        Object.entries(row).map(([key, value]) => [key, value ?? null])
      )
    );
  }

  // Return only selected columns
  return tableData.map((row) =>
    Object.fromEntries(
      selectedColumns.map((col) => [col, (row as TableRow)[col] ?? null])
    )
  );
};

// Debugging log
console.log("🔍 Query Engine Loaded");
