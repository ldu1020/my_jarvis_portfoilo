/** @format */

import React from 'react';
import DataBase from '../../../service/database';
import styles from './what_done_performence.module.css';

interface WhatDonePerformenceProps {
  database: DataBase;
  doingTimeOfCategoryList: DoingTimeOfCategory[];
}

const WhatDonePerformence: React.FC<WhatDonePerformenceProps> = ({
  database,
  doingTimeOfCategoryList,
}) => {
  return <div>performence</div>;
};

export default WhatDonePerformence;
