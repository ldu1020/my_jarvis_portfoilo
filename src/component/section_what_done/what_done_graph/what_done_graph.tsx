/** @format */

import React from 'react';
import { Pie } from 'react-chartjs-2';
import styles from './what_done_graph.module.css';

interface WhatDoneGraphProps {
  doingTimeOfCategory: DoingTimeOfCategory[];
}

const WhatDoneGraph: React.FC<WhatDoneGraphProps> = ({
  doingTimeOfCategory,
}) => {
  const data = {
    labels: doingTimeOfCategory.map((li) => li.category),
    datasets: [
      {
        backgroundColor: doingTimeOfCategory.map((li) => 'red'),
        borderColor: ['green'],
        borderWidth: 0,
        hoverBackgroundColor: ['red'],
        hoverBorderColor: ['red'],
        data: doingTimeOfCategory.map((li) => li.doingTime),
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },

    animation: {
      easing: 'easeInOutBack',
    },
  };
  return (
    <div className={styles.graph_zone}>
      <Pie data={data} options={options} />
    </div>
  );
};
export default WhatDoneGraph;
