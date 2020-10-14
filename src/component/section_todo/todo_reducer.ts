/** @format */

export const initialState = {
  topicList: [] as TodoTopic,
  todoList: {} as TodoList,
};

export function todoReducer(state: TodoState, action: TodoAction) {
  const { topicList, todoList } = state;
  let updated;

  switch (action.type) {
    case 'ADD_TOPIC':
      return { ...state, topicList: [...topicList, action.topic] };
    case 'REMOVE_TOPIC':
      const filteredTopic = topicList.filter((list) => {
        return list.id !== action.id;
      });
      const filteredTodoList = { ...todoList };
      Object.keys(filteredTodoList) //
        .filter((key) => {
          const topicInKey = key.split('/')[1];
          return topicInKey === action.topic;
        }) //
        .forEach((key) => {
          delete filteredTodoList[key];
        });
      updated = { topicList: filteredTopic, todoList: filteredTodoList };
      return updated;
    case 'ADD_OR_UPDATE_TODO_LIST':
      updated = { ...todoList };
      updated[action.todoData.id + '/' + action.todoData.topic] =
        action.todoData;
      return { ...state, todoList: updated };
    case 'REMOVE_TODO_LIST':
      updated = { ...todoList };
      delete updated[action.id];
      return { ...state, todoList: updated };
    default:
      return state;
  }
}
