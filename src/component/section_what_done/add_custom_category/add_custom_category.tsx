/** @format */

import { Box, Button, Card, Chip, Paper, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import styles from './add_custom_category.module.css';
import AddIcon from '@material-ui/icons/Add';

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
    <Card className={styles.card}>
      <h1>나만의 카테고리</h1>
      <Paper variant='outlined' className={styles.colorListWrapper}>
        {customCategoryList.map((data) => (
          <Chip
            className={styles.chip}
            icon={
              <Box
                className={styles.colorDisplayWrapper}
                p={0}
                width='1rem'
                height='1rem'
                borderRadius='50%'
                boxShadow={3}
                bgcolor={data.color}>
                <input
                  type='color'
                  className={styles.colorDisplay}
                  value={data.color}
                  readOnly
                />
              </Box>
            }
            label={data.category}
            onDelete={() => {
              removeCustomCategory(data.id);
            }}
          />
        ))}
      </Paper>

      <div className={styles.addZone}>
        <TextField
          label='카테고리 이름'
          className={styles.textInput}
          name='category'
          type='text'
          onChange={onChange}
          value={customCagoryData.category}
          variant='outlined'
        />

        <TextField
          label='색깔'
          className={styles.colorInput}
          name='color'
          type='color'
          onChange={onChange}
          value={customCagoryData.color}
          variant='outlined'
          InputLabelProps={{
            shrink: true,
          }}
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
