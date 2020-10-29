/** @format */

export const todoInitialState = {
  topicList: {} as TodoTopic,
  todoList: {} as TodoList,
};

export function todoReducer(state: TodoState, action: TodoAction): TodoState {
  const { topicList, todoList } = state;
  let updated;

  switch (action.type) {
    case 'FETCH_TODO_STATE':
      const topicListOfDB = action.fetchData.topicList;
      const todoListOfDB = action.fetchData.todoList;
      return {
        topicList: topicListOfDB ? topicListOfDB : state.topicList,
        todoList: todoListOfDB ? todoListOfDB : state.todoList,
      };
    case 'ADD_TOPIC':
      updated = { ...topicList };
      updated[action.topicData.id] = action.topicData;
      return { ...state, topicList: updated };
    case 'REMOVE_TOPIC':
      let updatedTopicList = { ...topicList };
      delete updatedTopicList[action.id];
      let updatedTodoList = { ...todoList };
      Object.keys(updatedTodoList).forEach((key) => {
        updatedTodoList[key].topic === action.topic &&
          delete updatedTodoList[key];
      });
      return {
        ...state,
        topicList: updatedTopicList,
        todoList: updatedTodoList,
      };
    case 'ADD_OR_UPDATE_TODO_LIST':
      updated = { ...todoList };
      updated[action.todoListData.id] = action.todoListData;
      return { ...state, todoList: updated };
    case 'REMOVE_TODO_LIST':
      updated = { ...todoList };
      delete updated[action.id];
      return { ...state, todoList: updated };
    default:
      return state;
  }
}
