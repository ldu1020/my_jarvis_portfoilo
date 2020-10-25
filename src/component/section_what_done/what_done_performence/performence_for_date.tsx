/** @format */

import React from 'react';
import { getAverageAndWholeTime } from '../what_done_my_function';

interface PerformenceForDateProps {
  performenceList: any;
  dayLength: number;
}

const PerformenceForDate: React.FC<PerformenceForDateProps> = ({
  performenceList,
  dayLength,
}) => {
  const timeSet = getAverageAndWholeTime(performenceList, dayLength);
  console.log(timeSet);

  return (
    <div>
      <h1>dfd</h1>
    </div>
  );
};

export default PerformenceForDate;
