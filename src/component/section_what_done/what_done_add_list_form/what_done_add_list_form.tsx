/** @format */

import { Button, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useCallback, useState } from 'react';
import { calcDoingTime } from '../what_done_my_function';
import styles from './what_done_add_list_form.module.css';

interface WhatDoneAddListFormProps {
  customCategoryList: CustomCategoryList;
  addDoneList: (whatDoneData: WhatDoneData) => void;
}

const WhatDoneAddListForm: React.FC<WhatDoneAddListFormProps> = ({
  addDoneList,
  customCategoryList,
}) => {
  const [doneListData, setDoneListData] = useState({
    id: (Date.now() - 1).toString(),
    startTime: '',
    endTime: '',
    whatDo: '',
    category: '',
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDoneListData({
      ...doneListData,
      [name]: value,
    });
  };

  const onSubmit = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const { startTime, endTime, category } = doneListData;
      event.preventDefault();
      if (!startTime || !endTime || !category) {
        alert('시작시간, 끝나는 시간, 분류 항목은 필수 항목 입니다.');
      } else if (calcDoingTime(startTime, endTime) <= 0) {
        alert('올바른 시간이 아닙니다.');
      } else {
        addDoneList(doneListData);
        setDoneListData((beforeData) => ({
          id: Date.now().toString(),
          startTime: beforeData.endTime,
          endTime: '',
          whatDo: '',
          category: '',
        }));
      }
    },
    [doneListData, addDoneList]
  );

  const endTimeError =
    doneListData.endTime !== '' &&
    calcDoingTime(doneListData.startTime, doneListData.endTime) <= 0;

  return (
    <>
      <div className={styles.inputTime}>
        <TextField
          className={styles.startTime}
          label='시작시간'
          type='time'
          name='startTime'
          onChange={onChange}
          value={doneListData.startTime}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
          variant='outlined'
        />
        <TextField
          className={styles.endTime}
          label='끝난시간'
          type='time'
          name='endTime'
          error={endTimeError}
          helperText={endTimeError && '올바르지 않은 시간 입니다'}
          onChange={onChange}
          value={doneListData.endTime}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
          variant='outlined'
        />
      </div>

      <TextField
        className={styles.category}
        label='카테고리'
        type='text'
        name='category'
        onChange={onChange}
        value={doneListData.category}
        variant='outlined'
      />
      <TextField
        className={styles.whatDo}
        label='무엇을(option)'
        type='text'
        name='whatDo'
        multiline
        rows={2}
        onChange={onChange}
        value={doneListData.whatDo}
        variant='outlined'
      />

      <Button onClick={onSubmit} color='primary'>
        <AddIcon /> 목록추가
      </Button>
    </>
  );
};

export default React.memo(WhatDoneAddListForm);
