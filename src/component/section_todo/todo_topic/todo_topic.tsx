/** @format */

import { Card, CardContent, IconButton, Typography } from '@material-ui/core';
import { RemoveCircle } from '@material-ui/icons';
import React from 'react';
import TopicList from './topic_list/topic_list';
import styles from './todo_topic.module.css';

interface TodoTopicProps {
  topicData: TodoTopicData;
  todoList: TodoList;
  removeTopic: (id: string, topic: string) => void;
  addOrUpdateTodoList: (todoList: TodoListData) => void;
  removeTodoList: (id: string) => void;
}

const TodoTopic: React.FC<TodoTopicProps> = ({
  topicData,
  todoList,
  removeTopic,
  addOrUpdateTodoList,
  removeTodoList,
}) => {
  return (
    <Card variant='outlined' className={styles.topic}>
      <IconButton
        onClick={() => removeTopic(topicData.id, topicData.topic)}
        className={styles.removeBtn}>
        <RemoveCircle />
      </IconButton>
      <CardContent component='header' className={styles.cardheader}>
        <Typography variant='h6' className={styles.topicTitle}>
          {topicData.topic}
        </Typography>
        <Typography variant='caption' className={styles.timeCreated}>
          {topicData.made}
        </Typography>
      </CardContent>

      <TopicList
        topic={topicData.topic}
        todoList={todoList}
        addOrUpdateTodoList={addOrUpdateTodoList}
        removeTodoList={removeTodoList}
      />
    </Card>
  );
};

export default React.memo(TodoTopic);
