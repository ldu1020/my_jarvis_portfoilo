/** @format */

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
} from 'react';
import AuthService from '../../service/auth_service';
import DataBase from '../../service/database';
import { useHistory } from 'react-router-dom';

import WhatDoneAddListForm from './what_done_add_list_form/what_done_add_list_form';
import WhatDoneGraph from './what_done_graph/what_done_graph';
import WhatDoneList from './what_done_list/what_done_list';
import WhatDonePerformence from './what_done_performence/what_done_performence';
import WhatDoneTopThreeRate from './what_done_top_three_rate/what_done_top_three_rate';
import AddCustomCategory from './add_custom_category/add_custom_category';
import TransitionsModal from '../transition_modal/transition_modal';

import { getPerformence } from './what_done_my_function';
import { whatDoneInitialState, whatDoneReducer } from './what_done_reducer';

import { useMediaQuery, useTheme } from '@material-ui/core';
import styles from './what_done_main.module.css';

interface WhatDoneMainProps {
  authService: AuthService;
  database: DataBase;
  userId: string | null;
}

const WhatDoneMain: React.FC<WhatDoneMainProps> = ({
  authService,
  database,
  userId,
}) => {
  const date = new Date();
  const today = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;

  const [state, dispatch] = useReducer(whatDoneReducer, whatDoneInitialState);
  const doingTimeOfCategoryList = useMemo(() => {
    return getPerformence(state.whatDoneList);
  }, [state.whatDoneList]);

  const history = useHistory();

  const theme = useTheme();
  const up960px = useMediaQuery(theme.breakpoints.up('md'));

  useLayoutEffect(() => {
    const stopSync = database.findTodayData(
      userId as string,
      'whatDonePerformence',
      today,
      (todayData: any) => {
        todayData &&
          doingTimeOfCategoryList.length !== 0 &&
          database.savePerformence(
            userId as string,
            'whatDonePerformence',
            today,
            doingTimeOfCategoryList
          );
        !todayData &&
          database
            .savePerformence(userId as string, 'whatDonePerformence', today, [
              { category: 'Welcome!!', doingTime: 1 },
            ])
            .then(() => {
              database.removeWhatDoneData(
                userId as string,
                'whatDoneList',
                'removeAll'
              );
            });
      }
    );

    return () => stopSync();
  }, [userId, database, today, doingTimeOfCategoryList]);

  useEffect(() => {
    const stopSync = database.syncData(
      userId,
      'whatDoneState',
      (dataOfDB: any) => {
        dispatch({
          type: 'FETCH_DONE_STATE',
          fetchData: dataOfDB,
        });
      }
    );

    return () => stopSync();
  }, [userId, database, history]);

  const addDoneList = useCallback(
    (whatDoneData: WhatDoneData) => {
      dispatch({
        type: 'ADD_DONE_LIST',
        whatDoneData,
      });
      database.saveWhatDoneData(userId as string, 'whatDoneList', whatDoneData);
    },
    [database, userId]
  );

  const removeDoneList = useCallback(
    (id: string) => {
      dispatch({
        type: 'REMOVE_DONE_LIST',
        id,
      });
      database.removeWhatDoneData(userId as string, 'whatDoneList', id);
    },
    [database, userId]
  );

  const addCustomCategory = useCallback(
    (customCategoryData: CustomCategoryData) => {
      dispatch({
        type: 'ADD_CUSTOM_CATEGORY',
        customCategoryData,
      });
      database.saveWhatDoneData(
        userId as string,
        'customCategoryList',
        customCategoryData
      );
    },
    [database, userId]
  );

  const removeCustomCategory = useCallback(
    (id: string) => {
      dispatch({
        type: 'REMOVE_CUSTOM_CATEGORY',
        id,
      });
      database.removeWhatDoneData(userId as string, 'customCategoryList', id);
    },
    [database, userId]
  );
  return (
    <div className={styles.main}>
      <section className={styles.graphZone}>
        <div className={styles.graph}>
          <WhatDoneGraph
            doingTimeOfCategoryList={doingTimeOfCategoryList}
            customCategoryList={state.customCategoryList}
          />
        </div>
        <div className={styles.topThree}>
          {doingTimeOfCategoryList.length && (
            <WhatDoneTopThreeRate
              doingTimeOfCategoryList={doingTimeOfCategoryList}
            />
          )}
        </div>
        {!up960px && (
          <TransitionsModal
            component={
              <WhatDoneList
                customCategoryList={state.customCategoryList}
                whatDoneList={state.whatDoneList}
                onRemove={removeDoneList}
              />
            }
            buttonText={'한일목록'}
            buttonClassName={styles.modalButton}
          />
        )}
        <TransitionsModal
          component={
            <p className={styles.info}>
              나만의 category 에 등록되지 않은 category 는 색상이 랜덤 배치되며
              매 회 변경됩니다.
            </p>
          }
          buttonText={'색깔이 계속바뀌나요?'}
          buttonClassName={styles.infoModal}
        />
      </section>

      {up960px && (
        <section className={styles.whatDoneListZone}>
          <WhatDoneList
            customCategoryList={state.customCategoryList}
            whatDoneList={state.whatDoneList}
            onRemove={removeDoneList}
          />
        </section>
      )}
      <section className={styles.addListZone}>
        <WhatDoneAddListForm
          customCategoryList={state.customCategoryList}
          addDoneList={addDoneList}
        />
      </section>

      <section className={styles.customCategoryZone}>
        <AddCustomCategory
          customCategoryList={state.customCategoryList}
          addCustomCategory={addCustomCategory}
          removeCustomCategory={removeCustomCategory}
        />
      </section>
      <section className={styles.performenceZone}>
        <WhatDonePerformence
          database={database}
          userId={userId}
          customCategoryList={state.customCategoryList}
        />
      </section>
    </div>
  );
};

export default WhatDoneMain;
