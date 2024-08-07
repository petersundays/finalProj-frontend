import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./AdminStatsBarGraph.css";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function AdminStatsBarGraph() {
  const { t } = useTranslation();
  const data = [
    { name: "Bar 1", value: 400 },
    { name: "Bar 2", value: 300 },
    { name: "Bar 3", value: 300 },
    { name: "Bar 4", value: 200 },
    { name: "Bar 5", value: 278 },
  ];

  return (
    <BarChart
      width={600}
      height={300}
      data={data}
      layout="vertical"
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" />
      <YAxis type="category" dataKey="name" />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );
}

export default AdminStatsBarGraph;
