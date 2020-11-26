/** @format */

import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Chip,
  Paper,
  TextField,
  Tooltip,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styles from './add_custom_category.module.css';

interface AddCustomCategoryProps {
  customCategoryList: CustomCategoryList;
  addCustomCategory: (customCategoryData: CustomCategoryData) => void;
  removeCustomCategory: (category: string) => void;
}

const AddCustomCategory: React.FC<AddCustomCategoryProps> = ({
  customCategoryList,
  addCustomCategory,
  removeCustomCategory,
}) => {
  const [customCategoryData, setCustomCagoryData] = useState({
    id: (Date.now() - 1).toString(),
    category: '',
    color: '#000000',
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCustomCagoryData({
      ...customCategoryData,
      [name]: value,
    });
  };
  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (customCategoryData.category === '') {
      alert('카테고리를 입력해 주세요');
    } else {
      addCustomCategory(customCategoryData);
      setCustomCagoryData((beforeData) => ({
        id: Date.now().toString(),
        category: '',
        color: '#000000',
      }));
    }
  };

  return (
    <Card className={styles.card}>
      <h1>나만의 카테고리</h1>
      <Paper variant='outlined' className={styles.colorListWrapper}>
        {Object.values(customCategoryList).map((data) => (
          <Chip
            key={data.id}
            className={styles.chip}
            icon={
              <Tooltip title='update color'>
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
                    onChange={(event) => {
                      let updated = { ...data };
                      updated.color = event.target.value;
                      addCustomCategory(updated);
                    }}
                    className={styles.colorDisplay}
                    value={data.color}
                  />
                </Box>
              </Tooltip>
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
          value={customCategoryData.category}
          variant='outlined'
        />

        <TextField
          label='색깔'
          className={styles.colorInput}
          name='color'
          type='color'
          onChange={onChange}
          value={customCategoryData.color}
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

export default React.memo(AddCustomCategory);
