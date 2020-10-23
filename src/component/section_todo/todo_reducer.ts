/** @format */

export const todoInitialState = {
  topicList: [] as TodoTopic,
  todoList: {} as TodoList,
  todoPerformence: {} as TodoPerformence,
};

export function todoReducer(state: TodoState, action: TodoAction) {
  const { topicList, todoList, todoPerformence } = state;
  let updated;

  switch (action.type) {
    case 'FETCH_TODO_STATE':
      const topicListOfDB = action.fetchData.topicList;
      const todoListOfDB = action.fetchData.todoList;
      const todoPerformenceOfDB = action.fetchData.todoPerformence;

      if (topicListOfDB) {
        return {
          topicList: Object.values(topicListOfDB),
          todoList: todoListOfDB,
          todoPerformence: todoPerformenceOfDB,
        };
      } else {
        return state;
      }
    case 'ADD_TOPIC':
      return { ...state, topicList: [...topicList, action.topicData] };
    case 'REMOVE_TOPIC':
      const updatedTopic = topicList.filter((list) => {
        return list.id !== action.id;
      });
      const updatedTodoList = { ...todoList };
      Object.keys(updatedTodoList).forEach((key) => {
        key.split('&')[1] === action.topic && delete updatedTodoList[key];
      });

      return { ...state, topicList: updatedTopic, todoList: updatedTodoList };
    case 'ADD_OR_UPDATE_TODO_LIST':
      updated = { ...todoList };
      updated[action.todoListData.id] = action.todoListData;
      return { ...state, todoList: updated };
    case 'REMOVE_TODO_LIST':
      updated = { ...todoList };
      delete updated[action.id];
      return { ...state, todoList: updated };
    case 'ADD_OR_UPDATE_TODO_PERFORMENCE':
      updated = { ...todoPerformence };
      updated[action.todoPerformenceData.id] = action.todoPerformenceData;
      return { ...state, todoPerformence: updated };
    default:
      return state;
  }
}
