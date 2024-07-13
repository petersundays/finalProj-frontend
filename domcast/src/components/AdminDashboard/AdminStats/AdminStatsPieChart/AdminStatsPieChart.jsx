import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./AdminStatsPieChart.css";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Base_url_lab } from "../../../../functions/UsersFunctions";

function AdminStatsPieChart({ statistics }) {
  const { t } = useTranslation();
  const [labsEnum, setLabsEnum] = useState([]);
  const [labName, setLabName] = useState("");

  const approvedPercentage = (statistics.approvedPercentage || 0).toFixed(2);
  const finishedPercentage = (statistics.finishedPercentage || 0).toFixed(2);
  const canceledPercentage = (statistics.canceledPercentage || 0).toFixed(2);

  const data = statistics
    ? [
        { name: "Approved", value: statistics.approvedProjects },
        { name: "Finished", value: statistics.finishedProjects },
        { name: "Cancelled", value: statistics.canceledProjects },
      ]
    : [];

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A28CD2",
    "#FF4C4C",
  ];

  useEffect(() => {
    const fetchEnum = async () => {
      await fetchLab();
    };

    fetchEnum();
  }, []);

  useEffect(() => {
    handleLabName();
  }, [statistics, labsEnum]);

  const handleLabName = () => {
    if (statistics && labsEnum.length > 0) {
      const lab = labsEnum.find((lab) => lab.id === statistics.city);
      if (lab) {
        setLabName(lab.name);
      }
    }
  };

  const fetchLab = async () => {
    try {
      const labsEnumResponse = await fetch(`${Base_url_lab}enum-unconfirmed`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const labsEnumData = await labsEnumResponse.json();
      setLabsEnum(labsEnumData);
    } catch (error) {
      console.error("Error fetching labs enum", error);
      toast.error("Failed to fetch lab data");
    }
  };

  return (
    <div className="my-5">
      <h2>{labName}</h2>
      <p>Cancelled Projects {canceledPercentage}%</p>
      <p>Finished Projects {finishedPercentage}%</p>
      <p>Approved Projects {approvedPercentage}%</p>
      <PieChart width={400} height={400} className="mb-5">
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
    </div>
  );
}

export default AdminStatsPieChart;
