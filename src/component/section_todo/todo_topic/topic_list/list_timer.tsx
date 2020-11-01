/** @format */

import React, { useEffect, useReducer } from 'react';

const initialState = 0;

interface TimerProps {
  todoListData: TodoListData;
  addOrUpdateTodo: (todoListData: TodoListData) => void;
}

const ListTimer: React.FC<TimerProps> = ({ todoListData, addOrUpdateTodo }) => {
  const [restTime, dispatch] = useReducer(reducer, initialState);
  const { hour, minute } = timeSet(restTime);

  function reducer(state: any, action: any) {
    switch (action.type) {
      case 'SET_REST_TIME':
        const REST_TIME = getRestTime(todoListData.until, new Date());
        if (todoListData.autoCheck && REST_TIME === 0) {
          const updated = { ...todoListData };
          updated.checked = true;
          updated.autoCheck = false;
          addOrUpdateTodo(updated);
          action.clear();
        } else if (todoListData.checked || REST_TIME === 0) {
          action.clear();
          return 0;
        }
        return REST_TIME;

      default:
        return state;
    }
  }

  useEffect(() => {
    const setNow = setInterval(() => {
      dispatch({
        type: 'SET_REST_TIME',
        clear: () => clearInterval(setNow),
      });
    }, 1000);

    return () => {
      clearInterval(setNow);
    };
  }, [dispatch, todoListData]);

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

export default React.memo(ListTimer);

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
