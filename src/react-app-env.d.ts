/** @format */

/// <reference types="react-scripts" />

type UserData = {
  displayName: string | null;
  email: string | null;
  uid: string | null;
};

// TODO Type

type TodoState = {
  topicList: TodoTopic;
  todoList: TodoList;
  todoPerformence: TodoPerformence;
};

type TodoStateOfDB = {
  topicList: Record<string, TodoTopicData>;
  todoList: TodoList;
  todoPerformence: TodoPerformence;
};

type TodoTopic = TodoTopicData[];

type TodoTopicData = {
  id: string;
  topic: string;
  made: string;
  complete: boolean;
};

type TodoList = Record<string, TodoListData>;

type TodoListData = {
  id: string;
  topic: string;
  what: string;
  until: string;
  checked: boolean;
  autoCheck: boolean;
};

type wiseSaying = {
  saying: string;
  talker: string;
};

type TodoAction =
  | { type: 'FETCH_TODO_STATE'; fetchData: TodoStateOfDB }
  | { type: 'ADD_TOPIC'; topicData: TodoTopicData }
  | { type: 'REMOVE_TOPIC'; id: string; topic: string }
  | { type: 'ADD_OR_UPDATE_TODO_LIST'; todoListData: TodoListData }
  | { type: 'REMOVE_TODO_LIST'; id: string }
  | {
      type: 'ADD_OR_UPDATE_TODO_PERFORMENCE';
      todoPerformenceData: TodoPerformenceData;
    };

// WHAT DONE TYPE

type WhatDoneState = {
  whatDoneList: WhatDoneData[];
  customCategoryList: CustomCategoryData[];
};

type WhatDoneData = {
  id: string;
  startTime: string;
  endTime: string;
  whatDo: string;
  category: string;
};

type DoingTimeOfCategory = {
  category: string;
  doingTime: number;
  color: string;
  rate?: number;
};

type CustomCategoryData = {
  id: string;
  category: string;
  color: string;
};

//PERFORMENCE TYPE

type Performence = {
  todoPerfomence: TodoPerformence;
  whatDonePerformence: whatDonePerformence;
};

type TodoPerformence = Record<string, TodoPerformenceData>;

type TodoPerformenceData = {
  id: string;
  checked: number;
  checkList: number;
};

type WhatDonePerfomence = Record<string, WhatDonePerformenceData[]>;

type WhatDonePerformenceData = {
  category: string;
  doingTime: number;
};
