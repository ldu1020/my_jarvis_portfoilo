/** @format */

/// <reference types="react-scripts" />

type UserData = {
  displayName: string | null;
  email: string | null;
  uid: string | null;
};

type TodoTopicData = {
  id: string;
  topic: string;
  start: Date | null;
  complete?: boolean;
  end?: string;
};

type TodoTopic = TodoTopicData[];

type TodoListData = {
  id: string;
  topic: string;
  what: string;
  until: string;
  checked: boolean;
  autoCheck: boolean;
};

type TodoList = Record<string, TodoListData>;

type wiseSaying = {
  saying: string;
  talker: string;
};

type TodoState = {
  topicList: TodoTopic;
  todoList: TodoList;
};

type TodoAction =
  | { type: 'ADD_TOPIC'; topic: TodoTopicData }
  | { type: 'REMOVE_TOPIC'; id: string; topic: string }
  | { type: 'ADD_OR_UPDATE_TODO_LIST'; todoData: TodoListData }
  | { type: 'REMOVE_TODO_LIST'; id: string };
