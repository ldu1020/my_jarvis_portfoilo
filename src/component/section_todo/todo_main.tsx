/** @format */

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
} from 'react';
import AuthService from '../../service/auth_service';
import DataBase from '../../service/database';
import TodoAddTopicForm from './todo_add_topic_form/todo_add_topic_form';
import TodoTopic from './todo_topic/todo_topic';
import styles from './todo_main.module.css';
import TodoPerformence from './todo_performence/todo_performence';
import { todoInitialState, todoReducer } from './todo_reducer';
import { useHistory } from 'react-router-dom';
import { getTodoPerformence } from './todo_my_function';

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
  const [todoState, dispatch] = useReducer(todoReducer, todoInitialState);
  const history = useHistory();
  const date = new Date();
  const today = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
  const performenceData = getTodoPerformence(todoState.todoList);

  useLayoutEffect(() => {
    const stopSync = database.findTodayData(
      userId as string,
      'todoPerformence',
      today,
      (todayData: any) => {
        todayData
          ? database.savePerformence(
              userId as string,
              'todoPerformence',
              today,
              performenceData
            )
          : database
              .savePerformence(userId as string, 'todoPerformence', today, {
                checked: 0,
                checkList: 0,
              })
              .then(() => {
                database.removeTodoData(
                  userId as string,
                  'todoList',
                  'removeAll'
                );
              });
      }
    );

    return () => stopSync();
  }, [userId, database, today, performenceData]);

  useEffect(() => {
    const stopSync = database.syncData(userId, 'todoState', (dataOfDB: any) => {
      dispatch({
        type: 'FETCH_TODO_STATE',
        fetchData: dataOfDB,
      });
    });

    return () => stopSync();
  }, [userId, database, history]);

  const addTopic = useCallback(
    (topicData: TodoTopicData) => {
      dispatch({
        type: 'ADD_TOPIC',
        topicData: topicData,
      });
      database.saveTodoData(userId as string, 'topicList', topicData);
    },
    [database, userId]
  );

  const removeTopic = useCallback(
    (id: string, topic: string) => {
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
    },
    [todoState.todoList, database, userId]
  );

  const addOrUpdateTodoList = useCallback(
    (todoListData: TodoListData) => {
      dispatch({
        type: 'ADD_OR_UPDATE_TODO_LIST',
        todoListData,
      });
      database.saveTodoData(userId as string, 'todoList', todoListData);
    },
    [database, userId]
  );

  const removeTodoList = useCallback(
    (id: string) => {
      dispatch({
        type: 'REMOVE_TODO_LIST',
        id,
      });
      database.removeTodoData(userId as string, 'todoList', id);
    },
    [database, userId]
  );

  return (
    <div className={styles.main}>
      <section className={styles.section_performence}>
        <TodoPerformence
          today={today}
          userId={userId}
          database={database}
          performenceData={performenceData}
        />
      </section>

      <section className={styles.section_topicList}>
        {todoState.topicList &&
          Object.values(todoState.topicList).map((topicData) => {
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

export default React.memo(TodoMain);
