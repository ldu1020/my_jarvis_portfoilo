/** @format */

import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './performence_of_3days.module.css';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import CountUp from 'react-countup';
import DataBase from '../../../../service/database';
interface PerformenceOf3DaysProps {
  performenceData: TodoPerformenceData;
  today: string;
  userId: string | null;
  database: DataBase;
}

const PerformenceOf3Days: React.FC<PerformenceOf3DaysProps> = ({
  performenceData,
  today,
  userId,
  database,
}) => {
  const [beforeDays, setBeforeDays] = useState({});
  useEffect(() => {
    console.log('Ggg');
    const yesterday = getBeforeDay(1);
    const yesterdayBefore = getBeforeDay(2);
    const stopSync = database.findSomedayData(
      userId as string,
      'todoPerformence',
      yesterdayBefore,
      yesterday,
      (dataOfDB: any) => {
        console.log(dataOfDB);
        dataOfDB && setBeforeDays({ ...dataOfDB });
      }
    );
    return () => stopSync();
  }, [userId, database]);

  const threeDays = useMemo(() => {
    return make3days({ ...beforeDays, [today]: performenceData });
  }, [beforeDays, today, performenceData]);

  return (
    <List className={styles.section}>
      {threeDays.map((day, index) => {
        const beforeIndex = index - 1 < 0 ? 0 : index - 1;
        console.log((day.rate - threeDays[beforeIndex].rate) * 100);
        return (
          <ListItem key={day.date} className={styles.item}>
            <ListItemText
              className={styles.text}
              primary={day.date}
              primaryTypographyProps={{ className: styles.primary }}
              secondary={day.performence}
              secondaryTypographyProps={{ className: styles.secondary }}
            />
            <div className={styles.display}>
              {day.rate < threeDays[beforeIndex].rate ? (
                <>
                  <ArrowDropDownIcon
                    color='secondary'
                    className={styles.icon}
                  />

                  <Typography color='secondary' className={styles.rate}>
                    <CountUp
                      end={Math.floor(
                        (day.rate - threeDays[beforeIndex].rate) * 100
                      )}
                      suffix='%'
                    />
                  </Typography>
                </>
              ) : (
                <>
                  <ArrowDropUpIcon color='primary' className={styles.icon} />
                  <Typography color='primary' className={styles.rate}>
                    <CountUp
                      end={Math.floor(
                        (day.rate - threeDays[beforeIndex].rate) * 100
                      )}
                      suffix='%'
                    />
                  </Typography>
                </>
              )}
            </div>
          </ListItem>
        );
      })}
    </List>
  );
};

export default React.memo(PerformenceOf3Days);

function getBeforeDay(ago: number) {
  const day = new Date();
  day.setDate(day.getDate() - ago);
  const dayAsKey = `${day.getFullYear()}${day.getMonth() + 1}${day.getDate()}`;
  return dayAsKey;
}

function make3days(todoPerformence: TodoPerformence) {
  let days = [];
  for (let i = 0; i < 3; i++) {
    let day = new Date();

    day.setDate(day.getDate() - i);
    let dayAsKey = `${day.getFullYear()}${day.getMonth() + 1}${day.getDate()}`;
    const dayValue = todoPerformence[dayAsKey]
      ? {
          date: `${day.getMonth() + 1}.${day.getDate()}`,
          rate:
            todoPerformence[dayAsKey].checked /
            todoPerformence[dayAsKey].checkList,
          performence: `${todoPerformence[dayAsKey].checked}/${todoPerformence[dayAsKey].checkList}`,
        }
      : {
          date: `${day.getMonth() + 1}.${day.getDate()}`,
          rate: 0,
          performence: `0/0`,
        };
    days.push(dayValue);
  }
  console.log(days);

  return days.reverse();
}
