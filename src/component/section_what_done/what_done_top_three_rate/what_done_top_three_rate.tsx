/** @format */

import React from 'react';
import CountUp from 'react-countup';
import styles from './what_done_top_three_rate.module.css';

interface WhatDoneTopThreeRateProps {
  doingTimeOfCategoryList: DoingTimeOfCategory[];
}

const WhatDoneTopThreeRate: React.FC<WhatDoneTopThreeRateProps> = ({
  doingTimeOfCategoryList,
}) => {
  const topThree = doingTimeOfCategoryList //
    .sort((a: any, b: any) => b.doingTime - a.doingTime)
    .slice(0, 3);

  const wholeTime = doingTimeOfCategoryList //
    .map((data) => data.doingTime)
    .reduce((acc, cur) => acc + cur);

  return (
    <ul className={styles.ul}>
      {topThree.map((li, index) => {
        let text = `${li.category}`;
        const rate = Math.floor((li.doingTime / wholeTime) * 100);

        if (text.length > 4) {
          text = text.substr(0, 4) + '...';
        }

        return (
          <li
            key={li.category}
            className={`${styles.list} ${styles[`li-${index}`]}`}>
            <span className={styles.text}>{text}</span>
            <CountUp className={styles.rate} end={rate} suffix='%' />
          </li>
        );
      })}
    </ul>
  );
};

export default WhatDoneTopThreeRate;
