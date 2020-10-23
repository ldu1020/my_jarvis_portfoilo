/** @format */

import { Card, IconButton, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import React, { useState } from 'react';

interface WhatDoneAddListFormProps {
  addDoneList: (whatDoneData: WhatDoneData) => void;
}

const WhatDoneAddListForm: React.FC<WhatDoneAddListFormProps> = ({
  addDoneList,
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
    <div>
      <Card>
        <form>
          <TextField
            label='시작시간'
            type='text'
            name='startTime'
            onChange={onChange}
            value={doneListData.startTime}
          />
          <TextField
            label='끝난시간'
            type='text'
            name='endTime'
            onChange={onChange}
            value={doneListData.endTime}
          />
          <TextField
            label='무엇을'
            type='text'
            name='whatDo'
            onChange={onChange}
            value={doneListData.whatDo}
          />
          <TextField
            label='분류'
            type='text'
            name='category'
            onChange={onChange}
            value={doneListData.category}
          />

          <IconButton onClick={onSubmit}>
            <AddIcon />
          </IconButton>
        </form>
      </Card>
    </div>
  );
};

export default WhatDoneAddListForm;
