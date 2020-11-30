/** @format */

import React, { useLayoutEffect, useRef, useState } from 'react';

import { Card, useMediaQuery, useTheme } from '@material-ui/core';

import { DataBaseType } from '../../../service/database';
import PerformenceOf3Days from './performence_of_3days/performence_of_3days';
import TodoGraph from './todo_graph/todo_graph';

import styles from './todo_performence.module.css';

interface TodoPerformenceProps {
  database: DataBaseType;
  today: string;
  userId: string | null;
  performenceData: TodoPerformenceData;
}

const TodoPerformence: React.FC<TodoPerformenceProps> = ({
  today,
  userId,
  database,
  performenceData,
}) => {
  const [section_performence_Y, setPerY] = useState(false);
  const theme = useTheme();
  const up960px = useMediaQuery(theme.breakpoints.up('md'));

  useLayoutEffect(() => {
    function handleScrollChange() {
      let rect = section_performence_Ref.current?.getBoundingClientRect();
      rect && rect.y <= 0 ? setPerY(true) : setPerY(false);
    }
    !up960px && window.addEventListener('scroll', handleScrollChange);
    return () => window.removeEventListener('scroll', handleScrollChange);
  }, [up960px]);
  let section_performence_Ref = useRef<HTMLDivElement>(null);

  return (
    <Card
      className={`${styles.section_performence} 
          ${section_performence_Y && styles.SecPerY0}`}
      ref={section_performence_Ref}>
      <section className={styles.graph_Wrapper}>
        <TodoGraph performenceData={performenceData} count={up960px} />
      </section>
      <section className={styles.threeDays_wrapper}>
        <PerformenceOf3Days
          performenceData={performenceData}
          today={today}
          userId={userId}
          database={database}
        />
      </section>
    </Card>
  );
};

export default React.memo(TodoPerformence);
