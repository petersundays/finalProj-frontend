import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './AdminStatsPieChart.css';

const data = [
  { name: 'Slice 1', value: 400 },
  { name: 'Slice 2', value: 300 },
  { name: 'Slice 3', value: 300 },
  { name: 'Slice 4', value: 200 },
  { name: 'Slice 5', value: 278 },
  { name: 'Slice 6', value: 189 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CD2', '#FF4C4C'];

const AdminStatsPieChart = () => (
  <PieChart width={400} height={400}>
    <Pie
      data={data}
      cx={200}
      cy={200}
      innerRadius={60}
      outerRadius={120}
      fill="#8884d8"
      paddingAngle={5}
      dataKey="value"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
);

export default AdminStatsPieChart;
