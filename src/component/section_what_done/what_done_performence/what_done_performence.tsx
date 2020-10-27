/** @format */

import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import DataBase from '../../../service/database';
import { getDifferenceInDays } from '../what_done_my_function';
import styles from './what_done_performence.module.css';
import PerformencePicker from './performence_picker/performence_picker';

interface WhatDonePerformenceProps {
  userId: string | null;
  database: DataBase;
  customCategoryList: CustomCategoryData[];
}

const WhatDonePerformence: React.FC<WhatDonePerformenceProps> = ({
  userId,
  database,
  customCategoryList,
}) => {
  const [targetDate, setTartgetDate] = useState({
    startAt: '',
    endAt: '',
  });
  const [performenceList, setPerformenceList] = useState<WhatDonePerfomence>();
  const differenceInDays = getDifferenceInDays(
    targetDate.startAt,
    targetDate.endAt
  );

  useEffect(() => {
    if (targetDate.startAt && targetDate.endAt) {
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
    }
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
      {performenceList && (
        <PerformencePicker
          performenceList={performenceList}
          dayLength={differenceInDays}
          customCategoryList={customCategoryList}
        />
      )}
    </div>
  );
};

export default WhatDonePerformence;

