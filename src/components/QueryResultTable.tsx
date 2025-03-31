// Define the TableRow type
type TableRow = { [key: string]: string | number | boolean | null };

const QueryResultTable = ({ data }: { data: TableRow[] }) => {
  if (!data.length) return <p>No results found.</p>;

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {Object.values(row).map((value, i) => (
              <td key={i}>{String(value)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default QueryResultTable;
