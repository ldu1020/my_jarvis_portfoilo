/** @format */

import { Button, Card, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import styles from './todo_add_topic_form.module.css';

interface TodoAddTopicFormProps {
  onAdd: (topicData: TodoTopicData) => void;
}

const TodoAddTopicForm: React.FC<TodoAddTopicFormProps> = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [topicData, setTopicData] = useState<TodoTopicData>({
    id: (Date.now() - 1).toString(),
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
    if (!topicData.topic) {
      alert('topic 을 입력 해 주세요');
    } else {
      onAdd(topicData);
      setTopicData({
        id: Date.now().toString(),
        topic: '',
        made: '',
        complete: false,
      });
      setOpen(false);
    }
  };

  return (
    <div>
      {open ? (
        <Card className={styles.card}>
          <TextField
            className={styles.topic}
            label='TOPIC'
            type='text'
            name='topic'
            onChange={onChange}
            value={topicData.topic}
          />
          <Button className={styles.toggleBtn} onClick={onSubmit}>
            추가하기
            <AddIcon />
          </Button>
        </Card>
      ) : (
        <Button className={styles.toggleBtn} onClick={() => setOpen(!open)}>
          <AddIcon />
          Topic
        </Button>
      )}
    </div>
  );
};

export default React.memo(TodoAddTopicForm);
