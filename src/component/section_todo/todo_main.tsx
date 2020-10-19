/** @format */

import React, { useCallback, useEffect, useReducer } from 'react';
import AuthService from '../../service/auth_service';
import DataBase from '../../service/database';
import TodoAddTopicForm from './todo_add_topic_form/todo_add_topic_form';
import TodoTopic from './todo_topic/todo_topic';
import styles from './todo_main.module.css';
import TodoPerformence from './todo_performence/todo_performence';
import { initialState, todoReducer } from './todo_reducer';

interface TodoMainProps {
  authService: AuthService;
  database: DataBase;
  userId: string | null;
}

const TodoMain: React.FC<TodoMainProps> = ({
  authService,
  database,
  userId,
}) => {
  const [todoState, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const stopSync = database.syncData(userId, 'todoState', (dataOfDB: any) => {
      dispatch({
        type: 'FETCH_TODO_STATE',
        fetchData: dataOfDB,
      });
    });

    return () => stopSync();
  }, [userId, database]);

  const addTopic = (topicData: TodoTopicData) => {
    dispatch({
      type: 'ADD_TOPIC',
      topicData: topicData,
    });
    database.saveTodoData(userId as string, 'topicList', topicData);
  };

  const removeTopic = (id: string, topic: string) => {
    dispatch({
      type: 'REMOVE_TOPIC',
      id,
      topic,
    });
    database.removeTodoData(userId as string, 'topicList', id);
    todoState.todoList &&
      Object.keys(todoState.todoList).forEach((key) => {
        key.split('&')[1] === topic &&
          database.removeTodoData(userId as string, 'todoList', key);
      });
  };

  const addOrUpdateTodoList = (todoListData: TodoListData) => {
    dispatch({
      type: 'ADD_OR_UPDATE_TODO_LIST',
      todoListData,
    });
    database.saveTodoData(userId as string, 'todoList', todoListData);
  };

  const removeTodoList = (id: string) => {
    dispatch({
      type: 'REMOVE_TODO_LIST',
      id,
    });
    database.removeTodoData(userId as string, 'todoList', id);
  };

  const addOrUpdatePerformence = useCallback(
    (performanceData: TodoPerformenceData) => {
      dispatch({
        type: 'ADD_OR_UPDATE_TODO_PERFORMENCE',
        todoPerformenceData: performanceData,
      });
      database.saveTodoData(
        userId as string,
        'todoPerformence',
        performanceData
      );
    },
    [database, userId]
  );

  return (
    <div className={styles.main}>
      {todoState.todoList && Object.keys(todoState.todoPerformence).length && (
        <TodoPerformence
          todoList={todoState.todoList}
          todoPerformence={todoState.todoPerformence}
          removeTodoList={removeTodoList}
          addOrUpdatePerformence={addOrUpdatePerformence}
        />
      )}

      <section className={styles.section_todoList}>
        {todoState.topicList &&
          todoState.topicList.map((topicData: TodoTopicData) => {
            return (
              <TodoTopic
                key={topicData.id}
                topicData={topicData}
                todoList={todoState.todoList}
                removeTopic={removeTopic}
                addOrUpdateTodoList={addOrUpdateTodoList}
                removeTodoList={removeTodoList}
              />
            );
          })}
        <TodoAddTopicForm onAdd={addTopic} />
      </section>
    </div>
  );
};

export default TodoMain;
