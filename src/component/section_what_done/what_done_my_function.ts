/** @format */

import { Category } from '@material-ui/icons';
import { whatDoneInitialState } from './what_done_reducer';
/** @format */

export function getPerformence(
  whatDoneList: WhatDoneData[]
): DoingTimeOfCategory[] {
  let performence: any = [];
  const categroies = whatDoneList //
    .map((li) => li.category)
    .filter((item, index, self) => {
      return self.indexOf(item) === index;
    });

  categroies.forEach((category) => {
    const doingTime = whatDoneList //
      .filter((list) => list.category === category) //
      .map((list) => calcDoingTime(list.startTime, list.endTime) || 0)
      .reduce((acc, cur) => acc + cur);

    performence.push({
      category,
      doingTime,
    });
  });

  return performence;
}

export function calcDoingTime(startTime: any, endTime: any) {
  const A = startTime.split(':');
  const MinuteOfStartTime = Number(A[0]) * 60 + Number(A[1]);
  const B = endTime.split(':');
  const MinuteOfEndTime = Number(B[0]) * 60 + Number(B[1]);
  return MinuteOfEndTime - MinuteOfStartTime;
}

export function getCustomOrRandomColor(
  customCategoryList: CustomCategoryData[],
  doingTimeOfCategoryList: DoingTimeOfCategory[]
) {
  return doingTimeOfCategoryList.map((data) => {
    const customColor = customCategoryList.find(
      (CC) => data.category === CC.category
    );
    return customColor
      ? customColor.color
      : '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
  });
}

type opacity = 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;

export function getHexOpectityByNumber(opacity: opacity) {
  switch (opacity) {
    case 0.1:
      return '1A';
    case 0.2:
      return '33';
    case 0.3:
      return '4D';
    case 0.4:
      return '66';
    case 0.5:
      return '80';
    case 0.6:
      return '99';
    case 0.7:
      return 'B3';
    case 0.8:
      return 'CC';
    case 0.9:
      return 'E6';
    case 1:
      return 'FF';
    default:
      return 'hh';
  }
}
