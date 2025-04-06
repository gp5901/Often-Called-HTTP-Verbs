import { useQueryStore } from "../store/queryStore";

const ResultTable = () => {
  const { resultData } = useQueryStore();

  // Edge case: no results at all
  if (!resultData || resultData.length === 0) return <p>No results</p>;

  // Dynamically infer column headers from the first row
  const headers = Object.keys(resultData[0] || {});

  return (
    <table border={1}>
      <thead>
        <tr>
          {headers.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {resultData.map((row, index) => (
          <tr key={index}>
            {headers.map((col) => (
              <td key={col}>
                {row[col] !== null && row[col] !== undefined
                  ? String(row[col])
                  : "—"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultTable;
