import React from "react";

import { Card, CardContent, Typography } from "@material-ui/core";

import { prettyPrintStat } from "../hooks/utils";

import "./InfoBox.css";
const InfoBox = ({ title, cases, total, ...props }) => {
  return (
    <Card
      className={`InfoBox ${props.active && "InfoBox--Selected"}`}
      onClick={props.onClick}
    >
      <CardContent>
        <Typography className="InfoBox__Title" color="textSecondary">
          {title}
        </Typography>
        <h2 className="InfoBox__Cases">{prettyPrintStat(cases)}</h2>
        <Typography className="InfoBox__Total" color="textSecondary">
          {prettyPrintStat(total)} Total
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
