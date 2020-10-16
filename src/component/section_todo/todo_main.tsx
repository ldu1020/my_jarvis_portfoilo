/** @format */

import React, {
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import AuthService from '../../service/auth_service';
import DataBase from '../../service/database';
import TodoAddTopicForm from './todo_add_topic_form/todo_add_topic_form';
import TodoGraph from './todo_graph/todo_graph';
import { initialState, todoReducer } from './todo_reducer';
import TodoTopic from './todo_topic/todo_topic';
import styles from './todo_main.module.css';
import { Card } from '@material-ui/core';

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
  const [section_performence_Y, setPerY] = useState(false);
  let section_performence_Ref = useRef<HTMLDivElement>(null);

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

  useLayoutEffect(() => {
    window.addEventListener('scroll', () => {
      let rect = section_performence_Ref.current?.getBoundingClientRect();
      rect?.y === 0 ? setPerY(true) : setPerY(false);
    });
  });

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

  const { topicList, todoList } = todoState;

  return (
    <div className={styles.main}>
      <Card
        className={`${styles.section_performence} 
          ${section_performence_Y && styles.SecPerY0}`}
        ref={section_performence_Ref}>
        <section className={styles.graph_Wrapper}>
          {todoList && <TodoGraph todoList={todoState.todoList} />}
        </section>
      </Card>
      <section className={styles.section_todoList}>
        {topicList &&
          topicList.map((topicData: TodoTopicData) => {
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
