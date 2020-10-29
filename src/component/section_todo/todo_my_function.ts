/** @format */

export function getTodoPerformence(todoList: TodoList) {
  const checkList = todoList
    ? Object.values(todoList).map((value) => value.checked)
    : [];
  const checked = todoList ? checkList.filter((li) => li === true) : [];
  return { checkList: checkList.length, checked: checked.length };
}
