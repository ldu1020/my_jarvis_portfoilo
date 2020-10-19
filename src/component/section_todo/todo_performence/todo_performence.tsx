/** @format */

import { Card } from '@material-ui/core';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import PerformenceOf3Days from './performence_of_3days/performence_of_3days';
import TodoGraph from './todo_graph/todo_graph';

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

  useLayoutEffect(() => {
    window.addEventListener('scroll', () => {
      let rect = section_performence_Ref.current?.getBoundingClientRect();
      rect?.y === 0 ? setPerY(true) : setPerY(false);
    });
  }, []);

  useEffect(() => {
    if (todoPerformence[today]) {
      addOrUpdatePerformence({
        id: today,
        checked: checked.length,
        checkList: checkList.length,
      });
    }
  }, [todoList]);

  useEffect(() => {
    if (Object.keys(todoList).length && !todoPerformence[today]) {
      Object.keys(todoList).forEach((key) => {
        removeTodoList(key);
      });
      addOrUpdatePerformence({
        id: today,
        checked: checked.length,
        checkList: checkList.length,
      });
    }
  }, [todoPerformence, todoList]);

  let section_performence_Ref = useRef<HTMLDivElement>(null);

  return (
    <Card
      className={`${styles.section_performence} 
          ${section_performence_Y && styles.SecPerY0}`}
      ref={section_performence_Ref}>
      <section className={styles.graph_Wrapper}>
        <TodoGraph checked={checked.length} checkList={checkList.length} />{' '}
      </section>
      <section className={styles.threeDays_wrapper}>
        <PerformenceOf3Days todoPerformence={todoPerformence} />
      </section>
    </Card>
  );
};

export default TodoPerformence;
