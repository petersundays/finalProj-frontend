import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./AdminStats.css";
import { useTranslation } from "react-i18next";
import {useReactToPrint} from 'react-to-print';
import { useRef } from "react";
import { toast } from "react-toastify";

import AdminStatsAverages from "./AdminStatsAverages/AdminStatsAverages";
import AdminStatsPieChart from "./AdminStatsPieChart/AdminStatsPieChart";
import { userStore } from "../../../stores/UserStore";
import { Base_url_admins } from "../../../functions/UsersFunctions";

function AdminStats() {
  const { t } = useTranslation();
  const loggedUser = userStore((state) => state.loggedUser);
  const [statistics, setStatistics] = useState({});
  const [avgMembers, setAvgMembers] = useState("");
  const [avgExecutionTime, setAvgExecutionTime] = useState("");
  const [totalProjects, setTotalProjects] = useState("");

  const [stats1, setStats1] = useState({});
  const [stats2, setStats2] = useState({});
  const [stats3, setStats3] = useState({});
  const [stats4, setStats4] = useState({});
  const [stats5, setStats5] = useState({});
  const [stats6, setStats6] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetchStatistics();
    };

    fetchData();
  }, []);

  const fetchStatistics = async () => {
    const url = new URL(`${Base_url_admins}statistics`);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
      });

      if (response.ok) {
        const stats = await response.json();
        setStatistics(stats);
        setAvgMembers(stats.averageMembers || "");
        setAvgExecutionTime(stats.averageExecutionTime || "");
        setTotalProjects(stats.totalProjects || "");
        setStats1(stats.labStatistics[0]);
        setStats2(stats.labStatistics[1]);
        setStats3(stats.labStatistics[2]);
        setStats4(stats.labStatistics[3]);
        setStats5(stats.labStatistics[4]);
        setStats6(stats.labStatistics[5]);
        console.log("Statistics fetched", stats);
      } else {
        console.log("Error getting statistics");
      }
    } catch (error) {
      console.error("Error setting session timeout", error);
    }
  };

  return (
    <Container fluid className="main-container">
      <Row className="flex-grow-1">
        <Col className="content">
          <Row>
            <AdminStatsAverages
              avgMembers={avgMembers}
              avgExecutionTime={avgExecutionTime}
              totalProjects={totalProjects}
            />
          </Row>
          <Row>
            <Col>
              <AdminStatsPieChart statistics={stats1} />
              <AdminStatsPieChart statistics={stats2} />
              <AdminStatsPieChart statistics={stats3} />
            </Col>
            <Col>
              <AdminStatsPieChart statistics={stats4} />
              <AdminStatsPieChart statistics={stats5} />
              <AdminStatsPieChart statistics={stats6} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminStats;
