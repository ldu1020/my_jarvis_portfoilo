/** @format */

import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import {
  getAverageAndWholeTime,
  getCustomOrRandomColor,
  getHexOpectityByNumber,
} from '../../../what_done_my_function';

interface WholeCategoryGraphProps {
  performenceList: any;
  dayLength: number;
  customCategoryList: CustomCategoryList;
}

const WholeCategoryGraph: React.FC<WholeCategoryGraphProps> = ({
  performenceList,
  dayLength,
  customCategoryList,
}) => {
  const timeSet = getAverageAndWholeTime(performenceList, dayLength);
  const CustomOrRandomColor = getCustomOrRandomColor(
    customCategoryList,
    timeSet
  );
  const opacityHover = getHexOpectityByNumber(1);
  const opacityBG = getHexOpectityByNumber(0.7);

  const data = {
    labels: timeSet.map((data) => data.category),
    datasets: [
      {
        backgroundColor: CustomOrRandomColor.map((color) => color + opacityBG),
        hoverBackgroundColor: CustomOrRandomColor.map(
          (color) => color + opacityHover
        ),
        borderWidth: 0,
        data: timeSet.map((data) => data.doingTime),
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
    scales: {
      xAxes: [
        {
          ticks: {
            callback: function (value: any) {
              return numToTime(value);
            },
          },
        },
      ],
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
  return <HorizontalBar data={data} options={options} />;
};

export default WholeCategoryGraph;

function numToTime(num: number) {
  const hour = Math.floor(num / 60);
  const minute = num % 60;
  if (hour < 1) {
    return `${minute}분`;
  } else {
    return `${hour}시간 ${minute}분`;
  }
}
