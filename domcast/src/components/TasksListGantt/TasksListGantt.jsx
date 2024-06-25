import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { Container, Row, Col } from 'react-bootstrap';
import './TasksListGantt.css';

const TasksListGantt = () => {
  const [chartData, setChartData] = useState([]);
  const [period, setPeriod] = useState('month');

  useEffect(() => {
    // Dados de exemplo
    const data = [
      ['Task ID', 'Task Name', 'Start Date', 'End Date', 'Duration', 'Percent Complete', 'Dependencies'],
      ['1', 'Task 1', new Date(2023, 5, 1), new Date(2023, 5, 5), null, 100, null],
      ['2', 'Task 2', new Date(2023, 5, 6), new Date(2023, 5, 10), null, 100, null],
      ['3', 'Task 3', new Date(2023, 5, 11), new Date(2023, 5, 15), null, 100, null],
    ];

    setChartData(data);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newPeriod = window.innerWidth > 991 ? 'month' : 'week';
      setPeriod(newPeriod);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const chartOptions = {
    height: 400,
    gantt: {
      trackHeight: 30,
      criticalPathEnabled: false,
      innerGridTrack: { fill: '#e0e0e0' },
      innerGridDarkTrack: { fill: '#c0c0c0' },
    },
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Project Gantt Chart</h3>
          <h5>State: Active</h5>
          <h5>Lab: Lisbon</h5>
          <Chart
            chartType="Gantt"
            data={chartData}
            options={chartOptions}
            width="100%"
            height="500px"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default TasksListGantt;
