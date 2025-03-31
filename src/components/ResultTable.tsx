import { useMemo } from "react";
import { useQueryStore } from "../store/queryStore";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import styles from "../styles/ResultTable.module.css";

const ResultTable = () => {
  const { selectedQuery, resultData } = useQueryStore();

  // Memoized columns for better performance
  const columns: ColumnDef<(typeof resultData)[number]>[] = useMemo(() => {
    if (!resultData || resultData.length === 0) return [];
    return Object.keys(resultData[0]).map((key) => ({
      accessorKey: key,
      header: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize column headers
      cell: ({ getValue }) => getValue() || "—", // Default cell renderer
    }));
  }, [resultData]);

  // Memoized React Table instance
  const table = useReactTable({
    data: resultData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!selectedQuery?.trim()) {
    return <p className={styles.noQuery}>No query entered.</p>;
  }

  if (!resultData || resultData.length === 0) {
    return <p className={styles.noData}>No data found for the query.</p>;
  }

  return (
    <div className={styles.tableContainer}>
      <h2>Query Results</h2>
      <table className={styles.resultTable}>
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
