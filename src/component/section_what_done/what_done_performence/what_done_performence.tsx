/** @format */

import React, { useEffect, useState } from 'react';

import { Box, Card, Paper, TextField, Typography } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import { DataBaseType } from '../../../service/database';
import PerformencePicker from './performence_picker/performence_picker';
import { getDifferenceInDays } from '../what_done_my_function';
import styles from './what_done_performence.module.css';

interface WhatDonePerformenceProps {
  userId: string | null;
  database: DataBaseType;
  customCategoryList: CustomCategoryList;
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
          setPerformenceList(dataOfDB);
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
    <Card className={styles.wrapper}>
      <h1 className={styles.h1}>수행분석</h1>
      <form noValidate className={styles.inputZone}>
        <TextField
          name='startAt'
          label='부터'
          type='date'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={onChange}
        />
        <TextField
          name='endAt'
          label='까지'
          type='date'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={onChange}
        />
      </form>
      <Paper className={styles.graphZone}>
        {performenceList ? (
          <PerformencePicker
            performenceList={performenceList}
            dayLength={differenceInDays}
            customCategoryList={customCategoryList}
          />
        ) : (
          <Box
            minHeight='10rem'
            color='gray'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'>
            <ErrorOutlineIcon color='inherit' />
            <Typography variant='subtitle1' color='inherit'>
              조회 된 데이터가 없습니다
            </Typography>
          </Box>
        )}
      </Paper>
    </Card>
  );
};

export default React.memo(WhatDonePerformence);
