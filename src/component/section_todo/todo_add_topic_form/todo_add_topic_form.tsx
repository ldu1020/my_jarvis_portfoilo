/** @format */

import { Card, IconButton, TextField } from '@material-ui/core';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import styles from './todo_add_topic_form.module.css';

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
      {open ? (
        <Card>
          <form>
            <TextField
              label='TOPIC'
              type='text'
              name='topic'
              onChange={onChange}
              value={topicData.topic}
            />
            <IconButton className={styles.toggleBtn} onClick={onSubmit}>
              <AddIcon />
            </IconButton>
          </form>
        </Card>
      ) : (
        <IconButton className={styles.toggleBtn} onClick={() => setOpen(!open)}>
          <AddIcon />
        </IconButton>
      )}
    </div>
  );
};

export default TodoAddTopicForm;
