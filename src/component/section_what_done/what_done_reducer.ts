/** @format */

export const whatDoneInitialState = {
  whatDoneList: {} as WhatDoneList,
  customCategoryList: {} as CustomCategoryList,
};

export function whatDoneReducer(state: WhatDoneState, action: any) {
  const { whatDoneList, customCategoryList } = state;

  let updated;

  switch (action.type) {
    case 'FETCH_DONE_STATE':
      const whatDoneListOfDB = action.fetchData.whatDoneList;
      const customCategoryListOfDB = action.fetchData.customCategoryList;
      return {
        ...state,
        whatDoneList: whatDoneListOfDB ? whatDoneListOfDB : state.whatDoneList,
        customCategoryList: customCategoryListOfDB
          ? customCategoryListOfDB
          : state.customCategoryList,
      };
    case 'ADD_DONE_LIST':
      updated = { ...whatDoneList };
      updated[action.whatDoneData.id] = action.whatDoneData;
      return { ...state, whatDoneList: updated };
    case 'REMOVE_DONE_LIST':
      if (action.id === 'removeAll') {
        updated = {};
      } else {
        updated = { ...whatDoneList };
        delete updated[action.id];
      }
      return {
        ...state,
        whatDoneList: updated,
      };
    case 'ADD_CUSTOM_CATEGORY':
      updated = { ...customCategoryList };
      updated[action.customCategoryData.id] = action.customCategoryData;
      return {
        ...state,
        customCategoryList: updated,
      };
    case 'REMOVE_CUSTOM_CATEGORY':
      if (action.id === 'removeAll') {
        updated = {};
      } else {
        updated = { ...customCategoryList };
        delete updated[action.id];
      }
      return {
        ...state,
        customCategoryList: updated,
      };
    default:
      return state;
  }
}
