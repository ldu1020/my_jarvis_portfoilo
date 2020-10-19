/** @format */

import { Card } from '@material-ui/core';
import React, {
  memo,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import TodoGraph from '../todo_graph/todo_graph';

import styles from './todo_performence.module.css';

interface TodoPerformenceProps {
  todoPerformence: TodoPerformence;
  addOrUpdatePerformence: (performenceData: TodoPerformenceData) => void;
  todoList: TodoList;
  removeTodoList: (id: string) => void;
}

const TodoPerformence: React.FC<TodoPerformenceProps> = ({
  todoList,
  todoPerformence,
  addOrUpdatePerformence,
  removeTodoList,
}) => {
  const [section_performence_Y, setPerY] = useState(false);
  const date = new Date();
  const today = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
  const checkList = todoList
    ? Object.keys(todoList).map((key) => todoList[key].checked)
    : [];
  const checked = todoList ? checkList.filter((li) => li === true) : [];
  const inspectDate = Object.keys(todoPerformence).find((date) => {
    return date === today;
  });

  useLayoutEffect(() => {
    window.addEventListener('scroll', () => {
      let rect = section_performence_Ref.current?.getBoundingClientRect();
      rect?.y === 0 ? setPerY(true) : setPerY(false);
    });
  });

  useEffect(() => {
    console.log('before right');

    if (inspectDate) {
      console.log('right!');
      addOrUpdatePerformence({
        id: today,
        checked: checked.length,
        checkList: checkList.length,
      });
    }
  }, [todoList]);

  useEffect(() => {
    console.log('before No!');
    console.log(Object.keys(todoList).length);
    if (Object.keys(todoList).length && !inspectDate) {
      console.log('no!');

      Object.keys(todoList).forEach((key) => {
        removeTodoList(key);
      });
      addOrUpdatePerformence({
        id: today,
        checked: checked.length,
        checkList: checkList.length,
      });
    }
  }, [todoPerformence, todoList, inspectDate]);

  let section_performence_Ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <Card
        className={`${styles.section_performence} 
          ${section_performence_Y && styles.SecPerY0}`}
        ref={section_performence_Ref}>
        <section className={styles.graph_Wrapper}>
          <TodoGraph checked={checked.length} checkList={checkList.length} />{' '}
        </section>
      </Card>
    </>
  );
};

export default TodoPerformence;
