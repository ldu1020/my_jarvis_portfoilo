/** @format */

export function getAverageAndWholeTime(
  performenceList: WhatDonePerfomence,
  dayLength: number
): DoingTimeOfCategory[] {
  const valueFlatten = Object.values(performenceList).flat();
  const nonDuplicateCategroy = Array.from(
    new Set(valueFlatten.map((data) => data.category))
  );

  let valueCombined: any = [];

  nonDuplicateCategroy.forEach((category) => {
    const doingTimeComblined = valueFlatten //
      .filter((list) => list.category === category) //
      .map((list) => list.doingTime || 0)
      .reduce((acc, cur) => acc + cur);

    valueCombined.push({
      category,
      doingTime: doingTimeComblined,
      average: doingTimeComblined / dayLength,
    });
  });

  return valueCombined.sort((a: any, b: any) => b.doingTime - a.doingTime);
}

export function getPerformence(
  whatDoneList: WhatDoneList
): DoingTimeOfCategory[] {
  let performence: any = [];
  const categroies = Object.values(whatDoneList) //
    .map((value) => value.category)
    .filter((item, index, self) => {
      return self.indexOf(item) === index;
    });

  categroies.forEach((category) => {
    const doingTime = Object.values(whatDoneList) //
      .filter((value) => value.category === category) //
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
  customCategoryList: CustomCategoryList,
  doingTimeOfCategoryList: DoingTimeOfCategory[]
) {
  return doingTimeOfCategoryList.map((data) => {
    const customColor = Object.values(customCategoryList).find(
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

export function getDifferenceInDays(startAt: any, endAt: any) {
  const date1 = new Date(startAt).valueOf();
  const date2 = new Date(endAt).valueOf();
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / (1000 * 60 * 60 * 24) + 1;
}
