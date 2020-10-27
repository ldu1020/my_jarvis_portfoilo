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
    labels: Object.keys(performenceList),
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
