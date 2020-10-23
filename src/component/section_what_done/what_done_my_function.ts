/** @format */

export function getPerformence(
  whatDoneList: WhatDoneData[]
): DoingTimeOfCategory[] {
  let performence: any = [];

  console.log(whatDoneList);

  const categroies = whatDoneList //
    .map((li) => li.category)
    .filter((item, index, self) => {
      return self.indexOf(item) === index;
    });

  categroies.forEach((category) => {
    const doingTime = whatDoneList //
      .filter((list) => list.category === category) //
      .map((list) => calcDoingTime(list.startTime, list.endTime))
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
