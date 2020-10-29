/** @format */

import React from 'react';
import TopicListItem from './topic_list_item';
import ListAddItemForm from './list_add_item_form';
import { List } from '@material-ui/core';

import styles from './topic_list.module.css';

interface TopicListProps {
  topic: string;
  todoList: TodoList;
  addOrUpdateTodoList: (todoData: TodoListData) => void;
  removeTodoList: (id: string) => void;
}

const TopicList: React.FC<TopicListProps> = ({
  topic,
  todoList,
  addOrUpdateTodoList,
  removeTodoList,
}) => {
  return (
    <div>
      <List className={styles.ul}>
        {todoList &&
          Object.values(todoList) //
            .filter((values) => {
              return values.topic === topic;
            }) //
            .map((values) => {
              return (
                <TopicListItem
                  key={values.id}
                  todoListData={values}
                  removeTodoList={removeTodoList}
                  addOrUpdateTodoList={addOrUpdateTodoList}
                />
              );
            })}
        <ListAddItemForm
          addOrUpdateTodoList={addOrUpdateTodoList}
          topic={topic}
        />
      </List>
    </div>
  );
};

export default React.memo(TopicList);
