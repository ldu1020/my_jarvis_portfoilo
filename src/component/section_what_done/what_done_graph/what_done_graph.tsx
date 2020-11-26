/** @format */

import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  getCustomOrRandomColor,
  getHexOpectityByNumber,
} from '../what_done_my_function';

interface WhatDoneGraphProps {
  doingTimeOfCategoryList: DoingTimeOfCategory[];
  customCategoryList: CustomCategoryList;
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
    tooltips: {
      callbacks: {
        label: (tooltipItem: any, data: any) => {
          const _label = data.labels[tooltipItem.index];
          const _data = data.datasets[0].data[tooltipItem.index];
          return `${_label} : ${numToTime(_data)}`;
        },
      },
    },
  };
  return <Pie data={data} options={options} />;
};
export default WhatDoneGraph;

function numToTime(num: number) {
  const hour = Math.floor(num / 60);
  const minute = num % 60;
  if (hour < 1) {
    return `${minute}분`;
  } else {
    return `${hour}시간 ${minute}분`;
  }
}
