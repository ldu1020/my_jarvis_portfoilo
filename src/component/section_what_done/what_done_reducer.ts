/** @format */

import { getPerformence } from './what_done_my_function';

export const whatDoneInitialState = {
  whatDoneList: [] as WhatDoneData[],
  donePerformence: [] as DoingTimeOfCategory[],
};

export function whatDoneReducer(state: WhatDoneState, action: any) {
  const { whatDoneList } = state;

  switch (action.type) {
    case 'ADD_DONE_LIST':
      console.log(action.whatDoneData);
      return { ...state, whatDoneList: [...whatDoneList, action.whatDoneData] };
    case 'REMOVE_DONE_LIST':
      const updatedDoneList = whatDoneList.filter((data) => {
        return data.id !== action.id;
      });
      return {
        ...state,
        whatDoneList: updatedDoneList,
      };
    case 'SET_DONE_LSIT_PERFORMENCE':
      const performence = getPerformence(action.whatDoneList);
      return {
        ...state,
        donePerformence: { ...state.donePerformence, performence },
      };
    default:
      return state;
  }
}
