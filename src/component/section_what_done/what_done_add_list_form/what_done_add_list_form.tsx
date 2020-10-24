/** @format */

import { Card, IconButton, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useState } from 'react';
import AddCustomCategory from './add_custom_category/add_custom_category';

interface WhatDoneAddListFormProps {
  customCategoryList: CustomCategoryData[];
  addDoneList: (whatDoneData: WhatDoneData) => void;
  addCustomCategory: (customCategoryData: CustomCategoryData) => void;
  removeCustomCategory: (category: string) => void;
}

const WhatDoneAddListForm: React.FC<WhatDoneAddListFormProps> = ({
  addDoneList,
  addCustomCategory,
  removeCustomCategory,
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
    <div>
      <Card>
        <form>
          <TextField
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
          />
          <TextField
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
          <AddCustomCategory
            customCategoryList={customCategoryList}
            addCustomCategory={addCustomCategory}
            removeCustomCategory={removeCustomCategory}
          />
        </form>
      </Card>
    </div>
  );
};

export default WhatDoneAddListForm;
