/** @format */

import React from 'react';
import PieChartIcon from '@material-ui/icons/PieChart';
import SearchIcon from '@material-ui/icons/Search';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import styles from './function_info.module.css';
import { Card } from '@material-ui/core';

const WhatDoneInfoData = [
  {
    icon: PieChartIcon,
    iconColor: '#6f4ff6',
    heading: '나만의 TODAY CHART',
    info: `단순한 분류로 나의 오늘 하루를\n원형 차트로 확인하세요`,
  },
  {
    icon: DateRangeIcon,
    iconColor: '#00d4ae',
    heading: '확대된 CHART 분석',
    info: `특정 기간동안 내가 보낸 시간을 분류별로\n한눈에 확인하여 나를 파악하세요`,
  },
  {
    icon: SearchIcon,
    iconColor: '#ffda45',
    heading: '구체적인 CHART 분석',
    info: `특정 기간동안 내가 선택한 분류의 증 감을\n날짜별로 확인하세요`,
  },
];

const todoInfoData = [
  {
    icon: LoyaltyIcon,
    iconColor: '#3d84fe',
    heading: 'TOPIC 별 리스트 관리',
    info: `
    일률적인 체크리스트는 이제 그만,\n주제별로 관리하고 큰 목표를 위한\n작은 습관을 만들어가세요`,
  },
  {
    icon: AlarmOnIcon,
    iconColor: '#ff6f61',
    heading: '집중력을 위한 TIMER 기능',
    info: ` 목표에만 집중할 수 있도록\n나만의 몰입시간을 실시간으로 확인하세요`,
  },
  {
    icon: TrendingUpIcon,

    iconColor: '#9174e3',
    heading: '3일간의 능률을 변화 감지',
    info: `눈에 보이는 수치로\n나에게 도전 혹은 성취감을 주세요`,
  },
];

const InfoCard: React.FC<any> = (props) => {
  return (
    <Card className={styles.card}>
      <div className={styles.cardTop}>
        <props.icon className={styles.icon} style={{ color: props.color }} />
        <h4 className={styles.textHeading}>{props.heading}</h4>
      </div>
      <div className={styles.textInfo}>
        {props.info.split('\n').map((line: string) => {
          return (
            <span key={line}>
              {line}
              <br />
            </span>
          );
        })}
      </div>
    </Card>
  );
};

const FunctionInfo = () => {
  return (
    <div>
      <section className={styles.container}>
        <h1 className={styles.infoTitleText}>Info. WHAT DONE LIST</h1>
        <div className={styles.cardWrapper}>
          {WhatDoneInfoData.map((data) => (
            <InfoCard
              key={data.heading}
              icon={data.icon}
              heading={data.heading}
              info={data.info}
              color={data.iconColor}
            />
          ))}
        </div>
        <h1 className={styles.infoTitleText}>Info. TODO LIST</h1>
        <div className={styles.cardWrapper}>
          {todoInfoData.map((data) => (
            <InfoCard
              key={data.heading}
              icon={data.icon}
              heading={data.heading}
              info={data.info}
              color={data.iconColor}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default FunctionInfo;
