/** @format */

import { Button, Card, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import styles from './add_custom_category.module.css';
import AddIcon from '@material-ui/icons/Add';
import TransitionsModal from '../../transition_modal/transition_modal';

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

  const customList = customCategoryList.map((data) => (
    <li key={data.id}>
      {data.category}
      <input type='color' value={data.color} readOnly />
      <button
        onClick={() => {
          removeCustomCategory(data.id);
        }}>
        remove
      </button>
    </li>
  ));

  return (
    <Card className={styles.card}>
      <h1>나만의 카테고리</h1>
      <TransitionsModal
        component={<ul>{customList}</ul>}
        buttonText='카테고리 목록'
        buttonClassName={styles.infoModal}
      />
      <div className={styles.addZone}>
        <TextField
          className={styles.textInput}
          name='category'
          type='text'
          onChange={onChange}
          value={customCagoryData.category}
          variant='outlined'
        />

        <TextField
          className={styles.colorInput}
          name='color'
          type='color'
          onChange={onChange}
          value={customCagoryData.color}
          variant='outlined'
        />

        <Button
          className={styles.inputButton}
          onClick={onSubmit}
          color='primary'>
          <AddIcon />
        </Button>
      </div>
    </Card>
  );
};

export default AddCustomCategory;
