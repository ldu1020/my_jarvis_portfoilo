/** @format */

import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import DataBase from '../../../service/database';
import { getDifferenceInDays } from '../what_done_my_function';
import PerformenceForDate from './performence_for_date';
import styles from './what_done_performence.module.css';

interface WhatDonePerformenceProps {
  userId: string | null;
  database: DataBase;
}

const WhatDonePerformence: React.FC<WhatDonePerformenceProps> = ({
  userId,
  database,
}) => {
  const [targetDate, setTartgetDate] = useState({
    startAt: '',
    endAt: '',
  });
  const [performenceList, setPerformenceList] = useState([]);
  const differenceInDays = getDifferenceInDays(
    targetDate.startAt,
    targetDate.endAt
  );

  useEffect(() => {
    const stopSync = database.findSomedayData(
      userId as string,
      'whatDonePerformence',
      targetDate.startAt.replace(/-/gi, ''),
      targetDate.endAt.replace(/-/gi, ''),
      (dataOfDB: any) => {
        dataOfDB && setPerformenceList(dataOfDB);
      }
    );
    return () => stopSync();
  }, [userId, database, targetDate]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    setTartgetDate({
      ...targetDate,
      [name]: value,
    });
  };

  return (
    <div>
      <form noValidate>
        <TextField
          id='date'
          name='startAt'
          label='부터'
          type='date'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={onChange}
        />
        <TextField
          id='date'
          name='endAt'
          label='까지'
          type='date'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={onChange}
        />
      </form>
      <PerformenceForDate
        performenceList={performenceList}
        dayLength={differenceInDays}
      />
    </div>
  );
};

export default WhatDonePerformence;
