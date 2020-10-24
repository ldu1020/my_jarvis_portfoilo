/** @format */

import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import styles from './add_custom_category.module.css';

interface AddCustomCategoryProps {
  customCategoryList: CustomCategoryData[];
  addCustomCategory: (customCategoryData: CustomCategoryData) => void;
  removeCustomCategory: (category: string) => void;
}

const AddCustomCategory: React.FC<AddCustomCategoryProps> = ({
  customCategoryList,
  addCustomCategory,
  removeCustomCategory,
}) => {
  const [customCagoryData, setCustomCagoryData] = useState({
    id: (Date.now() - 1).toString(),
    category: '',
    color: '',
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCustomCagoryData({
      ...customCagoryData,
      [name]: value,
    });
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    addCustomCategory(customCagoryData);
    setCustomCagoryData((beforeData) => ({
      id: Date.now().toString(),
      category: '',
      color: '',
    }));
  };

  return (
    <div>
      <ul>
        {customCategoryList.map((data) => (
          <li key={data.id}>
            {data.category}
            <input type='color' value={data.color} />
            <button
              onClick={() => {
                removeCustomCategory(data.id);
              }}>
              remove
            </button>
          </li>
        ))}
      </ul>
      <form>
        <TextField
          name='category'
          type='text'
          style={{ width: '20rem' }}
          onChange={onChange}
          value={customCagoryData.category}
        />

        <TextField
          name='color'
          type='color'
          style={{ width: '20rem' }}
          onChange={onChange}
          value={customCagoryData.color}
        />
        <button onClick={onSubmit}>add category</button>
      </form>
    </div>
  );
};

export default AddCustomCategory;
