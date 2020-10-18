/** @format */

/// <reference types="react-scripts" />

type UserData = {
  displayName: string | null;
  email: string | null;
  uid: string | null;
};

type TodoState = {
  topicList: TodoTopic;
  todoList: TodoList;
  todoPerformence: TodoPerformence;
};

type TodoStateOfDB = {
  topicList: Record<string, TodoTopicData>;
  todoList: TodoList;
};

type TodoTopic = TodoTopicData[];

type TodoTopicData = {
  id: string;
  topic: string;
  made: string;
  complete: boolean;
};

type TodoPerformence = Record<string, TodoPerformenceData>;

type TodoPerformenceData = {
  id: string;
  checked: number;
  checkList: number;
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
