/** @format */

export const whatDoneInitialState = {
  whatDoneList: [] as WhatDoneData[],
  donePerformence: [] as DoingTimeOfCategory[],
  customCategoryList: [] as CustomCategoryData[],
};

export function whatDoneReducer(state: WhatDoneState, action: any) {
  const { whatDoneList, customCategoryList } = state;

  switch (action.type) {
    case 'FETCH_DONE_STATE':
      const whatDoneListOfDB = action.fetchData.whatDoneList;
      const customCategoryListOfDB = action.fetchData.customCategoryList;
      return {
        ...state,
        whatDoneList: whatDoneListOfDB
          ? (Object.values(whatDoneListOfDB) as WhatDoneData[])
          : state.whatDoneList,
        customCategoryList: customCategoryListOfDB
          ? (Object.values(customCategoryListOfDB) as CustomCategoryData[])
          : state.customCategoryList,
      };
    case 'ADD_DONE_LIST':
      console.log(action.whatDoneData);
      return { ...state, whatDoneList: [...whatDoneList, action.whatDoneData] };
    case 'REMOVE_DONE_LIST':
      const updatedDoneList = whatDoneList.filter(
        (data) => data.id !== action.id
      );
      return {
        ...state,
        whatDoneList: updatedDoneList,
      };
    case 'ADD_CUSTOM_CATEGORY':
      return {
        ...state,
        customCategoryList: [...customCategoryList, action.customCategoryData],
      };
    case 'REMOVE_CUSTOM_CATEGORY':
      const updatedCCList = customCategoryList.filter(
        (data) => data.id !== action.id
      );
      return {
        ...state,
        customCategoryList: updatedCCList,
      };
    default:
      return state;
  }
}
