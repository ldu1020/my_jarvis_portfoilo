/** @format */

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import CountUp from 'react-countup';
import styles from './todo_graph.module.css';

interface TodoGraphProps {
  count?: boolean;
  performenceData: TodoPerformenceData;
}

const TodoGraph: React.FC<TodoGraphProps> = ({ performenceData, count }) => {
  const { checked, checkList } = performenceData;
  const checkedRate = Math.floor((checked / checkList) * 100);
  const checkedData = [checked, checkList - checked];

  const data = {
    labels: ['한 일', '할 일'],
    datasets: [
      {
        backgroundColor: [checkedRate === 100 ? 'skyblue' : 'green'],
        borderColor: ['green'],
        borderWidth: 0,
        hoverBackgroundColor: ['red'],
        hoverBorderColor: ['red'],
        data: checkedData,
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
      easing: checkedRate === 100 ? 'easeInQuart' : 'easeInOutBack',
    },
  };
  const allClear = checkedRate === 100 && styles.allClear;
  return (
    <div className={styles.graph_zone}>
      <div className={styles.wrapper1}>
        <div className={styles.wrapper2}>
          {checkedRate && count ? (
            <CountUp
              className={`${styles.checked_rate} ${allClear}`}
              end={checkedRate}
              suffix='%'
              duration={1}
            />
          ) : null}
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default TodoGraph;
