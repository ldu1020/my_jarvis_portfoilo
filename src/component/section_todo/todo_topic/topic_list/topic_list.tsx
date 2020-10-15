/** @format */

import React from 'react';
import TopicListItem from './topic_list_item';
import ListAddItemForm from './list_add_item_form';
import { List, ListItem } from '@material-ui/core';

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
          Object.keys(todoList) //
            .filter((key) => {
              const topicInKey = key.split('&')[1];
              return topicInKey === topic;
            }) //
            .map((key) => {
              const data = todoList[key];
              return (
                <TopicListItem
                  key={key}
                  todoListData={data}
                  removeTodoList={removeTodoList}
                  addOrUpdateTodoList={addOrUpdateTodoList}
                />
              );
            })}
        <ListItem>
          <ListAddItemForm
            addOrUpdateTodoList={addOrUpdateTodoList}
            topic={topic}
          />
        </ListItem>
      </List>
    </div>
  );
};

export default TopicList;
