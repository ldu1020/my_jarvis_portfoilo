/** @format */

import React, { useEffect, useLayoutEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from '../../service/auth_service';
import DataBase from '../../service/database';
import WhatDoneAddListForm from './what_done_add_list_form/what_done_add_list_form';
import WhatDoneGraph from './what_done_graph/what_done_graph';
import WhatDoneList from './what_done_list/what_done_list';
import { getPerformence } from './what_done_my_function';
import WhatDonePerformence from './what_done_performence/what_done_performence';

import { whatDoneInitialState, whatDoneReducer } from './what_done_reducer';

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
  const [state, dispatch] = useReducer(whatDoneReducer, whatDoneInitialState);
  const date = new Date();
  const today = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
  const doingTimeOfCategoryList = getPerformence(state.whatDoneList);
  const history = useHistory();

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

  const addDoneList = (whatDoneData: WhatDoneData) => {
    dispatch({
      type: 'ADD_DONE_LIST',
      whatDoneData,
    });
    database.saveWhatDoneData(userId as string, 'whatDoneList', whatDoneData);
  };

  const removeDoneList = (id: string) => {
    dispatch({
      type: 'REMOVE_DONE_LIST',
      id,
    });
    database.removeWhatDoneData(userId as string, 'whatDoneList', id);
  };

  const addCustomCategory = (customCategoryData: CustomCategoryData) => {
    dispatch({
      type: 'ADD_CUSTOM_CATEGORY',
      customCategoryData,
    });
    database.saveWhatDoneData(
      userId as string,
      'customCategoryList',
      customCategoryData
    );
  };

  const removeCustomCategory = (id: string) => {
    dispatch({
      type: 'REMOVE_CUSTOM_CATEGORY',
      id,
    });
    database.removeWhatDoneData(userId as string, 'customCategoryList', id);
  };
  return (
    <div>
      <WhatDoneGraph
        doingTimeOfCategoryList={doingTimeOfCategoryList}
        customCategoryList={state.customCategoryList}
      />
      <WhatDoneList
        whatDoneList={state.whatDoneList}
        onRemove={removeDoneList}
      />
      <WhatDoneAddListForm
        customCategoryList={state.customCategoryList}
        addCustomCategory={addCustomCategory}
        removeCustomCategory={removeCustomCategory}
        addDoneList={addDoneList}
      />
      <WhatDonePerformence
        database={database}
        doingTimeOfCategoryList={doingTimeOfCategoryList}
      />
    </div>
  );
};

export default WhatDoneMain;
