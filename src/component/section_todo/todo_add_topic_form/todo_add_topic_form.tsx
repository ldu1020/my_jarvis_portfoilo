/** @format */

import { nanoid } from 'nanoid';
import React, { useState } from 'react';

interface TodoAddTopicFormProps {
  onAdd: (topicData: TodoTopicData) => void;
}

const TodoAddTopicForm: React.FC<TodoAddTopicFormProps> = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [topicData, setTopicData] = useState<TodoTopicData>({
    id: nanoid(),
    topic: '',
    made: '',
    complete: false,
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    const date = new Date();
    setTopicData({
      ...topicData,
      made: `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`,
      [name]: name === 'complete' ? checked : value,
    });
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log('sub');
    event.preventDefault();
    onAdd(topicData);
    console.log(topicData);
    setTopicData({
      id: Date.now().toString(),
      topic: '',
      made: '',
      complete: false,
    });
    setOpen(false);
  };

  return (
    <div>
      {open && (
        <form>
          <input
            type='text'
            name='topic'
            onChange={onChange}
            value={topicData.topic}
          />
          <input type='checkbox' name='complete' />
          <button onClick={onSubmit}>push</button>
        </form>
      )}
      <button onClick={() => setOpen(!open)}>add</button>
    </div>
  );
};

export default TodoAddTopicForm;
