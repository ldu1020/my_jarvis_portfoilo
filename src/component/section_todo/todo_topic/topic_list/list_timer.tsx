/** @format */

import React, { useEffect, useState } from 'react';

interface TimerProps {
  todoListData: TodoListData;
  addOrUpdateTodo: (todoListData: TodoListData) => void;
}

const ListTimer: React.FC<TimerProps> = ({ todoListData, addOrUpdateTodo }) => {
  const [restTime, setRestTime] = useState(0);
  const { hour, minute } = timeSet(restTime);

  useEffect(() => {
    const setNow = setInterval(() => {
      if (todoListData.checked) {
        clearInterval(setNow);
        setRestTime(0);
      } else {
        const now = new Date();
        const time = getRestTime(todoListData.until, now);
        setRestTime(time);
      }
      if (todoListData.autoCheck && restTime === 0) {
        let updated = { ...todoListData };
        updated.checked = true;
        addOrUpdateTodo(updated);
        clearInterval(setNow);
      }
    }, 1000);

    return () => {
      clearInterval(setNow);
      console.log('use return');
    };
  }, [todoListData]);

  return (
    <>
      {restTime ? (
        <span>
          남은시간: {hour} 시간 {minute} 분
        </span>
      ) : null}
    </>
  );
};

export default ListTimer;

function getRestTime(until: string, nowTime: Date) {
  const untilValue = until.split(':');
  const untilMinute = Number(untilValue[0]) * 60 + Number(untilValue[1]);
  const nowMinute = nowTime.getHours() * 60 + nowTime.getMinutes();
  const restTime = untilMinute - nowMinute;

  if (restTime < 0 || !restTime) {
    return 0;
  } else {
    return restTime;
  }
}

function timeSet(time: number) {
  const hour = Math.floor(time / 60);
  const minute = time % 60;

  return { hour, minute };
}
