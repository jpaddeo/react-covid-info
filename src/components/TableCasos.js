import React from "react";

import numeral from "numeral";

import "./TableCasos.css";

const TableCasos = ({ countries }) => {
  return (
    <div className="TableCasos">
      {countries.map(({ country, cases }) => (
        <tr key={country}>
          <td>{country}</td>
          <td>
            <strong>{numeral(cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
};

export default TableCasos;
