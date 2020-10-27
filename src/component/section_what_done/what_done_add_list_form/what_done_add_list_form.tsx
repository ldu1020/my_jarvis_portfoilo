/** @format */

import { Button, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useState } from 'react';
import styles from './what_done_add_list_form.module.css';

interface WhatDoneAddListFormProps {
  customCategoryList: CustomCategoryData[];
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

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    addDoneList(doneListData);
    setDoneListData((beforeData) => ({
      id: Date.now().toString(),
      startTime: beforeData.endTime,
      endTime: '',
      whatDo: '',
      category: '',
    }));
  };
  return (
    <div className={styles.wrapper}>
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
        label='분류'
        type='text'
        name='category'
        onChange={onChange}
        value={doneListData.category}
        variant='outlined'
      />
      <TextField
        className={styles.whatDo}
        label='무엇을'
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
    </div>
  );
};

export default WhatDoneAddListForm;
