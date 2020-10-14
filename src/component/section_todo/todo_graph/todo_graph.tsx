/** @format */

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import CountUp from 'react-countup';
import styles from './todo_graph.module.css';

interface TodoGraphProps {
  todoList: TodoList;
  count?: boolean;
}

const TodoGraph: React.FC<TodoGraphProps> = ({ todoList, count }) => {
  const { checkedData, checkedRate } = getChecked(todoList);

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

function getChecked(todoList: TodoList) {
  const checkList = Object.keys(todoList).map((key) => todoList[key].checked);
  const checked = checkList.filter((li) => li === true);
  const checkedData = [checked.length, checkList.length - checked.length];
  const checkedRate = Math.floor((checkedData[0] / checkList.length) * 100);
  return { checkedData, checkedRate };
}

export default TodoGraph;
