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
  todoList: Record<string, TodoListData>;
};

type TodoAction =
  | { type: 'request' }
  | { type: 'success'; results: HNResponse }
  | { type: 'failure'; error: string };
