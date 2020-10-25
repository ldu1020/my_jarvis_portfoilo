/** @format */

import React, { useEffect, useState } from 'react';
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
  const [performence, setPerformence] = useState();
  useEffect(() => {});

  return <div>performence</div>;
};

export default WhatDonePerformence;
