/** @format */

import React, { useState } from 'react';

interface ListAddItemFormProps {
  addOrUpdateTodoList: (todoData: TodoListData) => void;
  topic: string;
}

const ListAddItemForm: React.FC<ListAddItemFormProps> = ({
  addOrUpdateTodoList,
  topic,
}) => {
  const [todoData, setTodoData] = useState<TodoListData>({
    id: Date.now().toString() + '&' + topic,
    topic: topic,
    what: '',
    until: '',
    checked: false,
    autoCheck: false,
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    setTodoData({
      ...todoData,
      [name]: name === 'autoCheck' ? checked : value,
    });
  };

  const onAddTodo = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    addOrUpdateTodoList(todoData);
    setTodoData({
      id: Date.now().toString() + '&' + topic,
      topic: topic,
      what: '',
      until: '',
      checked: false,
      autoCheck: false,
    });
  };

  return (
    <form>
      <input
        name='what'
        type='text'
        onChange={onChange}
        value={todoData.what}
      />
      <input
        name='until'
        type='time'
        onChange={onChange}
        value={todoData.until}
      />

      <input name='autoCheck' type='checkbox' onChange={onChange} />

      <button onClick={onAddTodo}>add</button>
    </form>
  );
};

export default ListAddItemForm;
