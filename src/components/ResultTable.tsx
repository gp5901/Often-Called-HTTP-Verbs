// import React from "react";
import { useQueryStore } from "../store/queryStore";

const ResultTable = () => {
  const { resultData } = useQueryStore();

  if (!resultData.length) return <p>No results</p>;

  return (
    <table border={1}>
      <thead>
        <tr>
          {Object.keys(resultData[0]).map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {resultData.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((value, idx) => (
              <td key={idx}>{value.toString()}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultTable;
