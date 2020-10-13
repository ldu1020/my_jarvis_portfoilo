/** @format */

import { nanoid } from 'nanoid';
import React, { useState } from 'react';

interface TodoAddTopicFormProps {
  onAdd: any;
}

const TodoAddTopicForm: React.FC<TodoAddTopicFormProps> = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [topicData, setTopicData] = useState<TodoTopicData>({
    id: nanoid(),
    topic: '',
    start: null,
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    setTopicData({
      ...topicData,
      start: new Date(),
      [name]: name === 'complete' ? checked : value,
    });
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log('sub');
    event.preventDefault();
    onAdd(topicData);
    setTopicData({
      id: Date.now().toString(),
      topic: '',
      start: null,
    });
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
