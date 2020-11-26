/** @format */
import React from 'react';
import { Line } from 'react-chartjs-2';

interface EachCategoryGraphProps {
  performenceList: WhatDonePerfomence;
  category: string;
}

const EachCategoryGraph: React.FC<EachCategoryGraphProps> = ({
  performenceList,
  category,
}) => {
  const dataEachCategory = getDataEachCategory(performenceList, category);
  const data = {
    labels: Object.keys(performenceList).map((dateText) => {
      const fourLengthDate = dateText.substring(4);
      return (
        fourLengthDate.slice(0, 2) + '월 ' + fourLengthDate.slice(2) + '일'
      );
    }),
    datasets: [
      {
        backgroundColor: 'skyblue',
        hoverBackgroundColor: 'skyblue',
        borderWidth: 0,
        data: dataEachCategory,
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
      yAxes: [
        {
          ticks: {
            callback: function (value: any) {
              return `${value} 분`;
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

  return <Line data={data} options={options} />;
};

export default EachCategoryGraph;

function getDataEachCategory(
  performenceList: WhatDonePerfomence,
  category: string
) {
  return Object.keys(performenceList).map((date) => {
    const pickedData = performenceList[date].find(
      (li) => li.category === category
    );
    return pickedData ? pickedData.doingTime : 0;
  });
}

function numToTime(num: number) {
  const hour = Math.floor(num / 60);
  const minute = num % 60;
  if (hour < 1) {
    return `${minute}분`;
  } else {
    return `${hour}시간 ${minute}분`;
  }
}
