import styles from "../styles/QueryResultTable.module.css";

type TableRow = { [key: string]: string | number | boolean | null };

const QueryResultTable = ({ data }: { data: TableRow[] }) => {
  console.log("📦 Rendering QueryResultTable with:", data);
  if (!data.length) return <p>No results found.</p>;

  return (
    <table className={styles.queryTable}>
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
