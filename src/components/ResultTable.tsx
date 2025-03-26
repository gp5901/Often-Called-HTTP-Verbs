import React from "react";
import { useQueryStore } from "../store/queryStore";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";

const ResultTable = () => {
  const { selectedQuery, resultData } = useQueryStore();

  // Dynamically create columns based on result data keys
  const columns: ColumnDef<(typeof resultData)[number]>[] =
    resultData && resultData.length > 0
      ? Object.keys(resultData[0]).map((key) => ({
          accessorKey: key,
          header: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize column headers
        }))
      : [];

  // React Table instance
  const table = useReactTable({
    data: resultData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Prevent trim() error by ensuring selectedQuery is always a string
  if (!selectedQuery || selectedQuery.trim() === "") {
    return <p>No query entered.</p>;
  }

  // Handle case where no results are found
  if (!resultData || resultData.length === 0) {
    return <p>No data found for the query.</p>;
  }

  return (
    <div>
      <h2>Query Results</h2>
      <table border={1}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable;
