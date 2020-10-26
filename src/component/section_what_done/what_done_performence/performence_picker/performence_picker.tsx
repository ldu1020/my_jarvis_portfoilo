/** @format */

import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react';
import EachCategoryGraph from './each_category_graph/each_category_graph';
import WholeCategoryGraph from './whole_category_graph/whole_category_graph';

interface PerformencePickerProps {
  performenceList: WhatDonePerfomence;
  customCategoryList: CustomCategoryData[];
  dayLength: number;
}

const PerformencePicker: React.FC<PerformencePickerProps> = ({
  performenceList,
  customCategoryList,
  dayLength,
}) => {
  const [pickedValue, setPickedValue] = useState('전체항목');
  const categories = getCategories(performenceList);
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPickedValue(event.target.value as string);
  };

  return (
    <div>
      <FormControl>
        <InputLabel id='demo-simple-select-label'>Age</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={pickedValue}
          onChange={handleChange}>
          <MenuItem value={'전체항목'}>전체항목</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {pickedValue === '전체항목' ? (
        <WholeCategoryGraph
          performenceList={performenceList}
          dayLength={dayLength}
          customCategoryList={customCategoryList}
        />
      ) : (
        <EachCategoryGraph
          performenceList={performenceList}
          category={pickedValue}
        />
      )}{' '}
    </div>
  );
};

export default PerformencePicker;

function getCategories(performenceList: WhatDonePerfomence) {
  const valueFlatten = Object.values(performenceList).flat();
  const nonDuplicateCategroy = Array.from(
    new Set(valueFlatten.map((data) => data.category))
  );

  return nonDuplicateCategroy;
}
