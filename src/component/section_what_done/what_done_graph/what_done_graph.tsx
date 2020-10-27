/** @format */

import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  getCustomOrRandomColor,
  getHexOpectityByNumber,
} from '../what_done_my_function';
import styles from './what_done_graph.module.css';

interface WhatDoneGraphProps {
  doingTimeOfCategoryList: DoingTimeOfCategory[];
  customCategoryList: CustomCategoryData[];
}

const WhatDoneGraph: React.FC<WhatDoneGraphProps> = ({
  customCategoryList,
  doingTimeOfCategoryList,
}) => {
  const CustomOrRandomColor = getCustomOrRandomColor(
    customCategoryList,
    doingTimeOfCategoryList
  );

  const opacityHover = getHexOpectityByNumber(1);
  const opacityBG = getHexOpectityByNumber(0.7);

  const data = {
    labels: doingTimeOfCategoryList.map((li) => li.category),
    datasets: [
      {
        borderWidth: 0,
        backgroundColor: CustomOrRandomColor.map((color) => color + opacityBG),
        hoverBackgroundColor: CustomOrRandomColor.map(
          (color) => color + opacityHover
        ),
        data: doingTimeOfCategoryList.map((li) => li.doingTime),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    legend: {
      display: false,
    },
    animation: {
      easing: 'easeInOutBack',
    },
  };
  return <Pie data={data} options={options} />;
};
export default WhatDoneGraph;
