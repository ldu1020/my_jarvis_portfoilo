/** @format */

import React, { useCallback, useReducer } from 'react';
import AuthService from '../../service/auth_service';
import DataBase from '../../service/database';
import WhatDoneAddListForm from './what_done_add_list_form/what_done_add_list_form';
import WhatDoneGraph from './what_done_graph/what_done_graph';
import WhatDoneList from './what_done_list/what_done_list';
import { getPerformence } from './what_done_my_function';

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
  const doingTimeOfCategory = getPerformence(state.whatDoneList);

  const addDoneList = (whatDoneData: WhatDoneData) => {
    console.log(whatDoneData);
    dispatch({
      type: 'ADD_DONE_LIST',
      whatDoneData,
    });
  };
  console.log(state);

  const removeDoneList = useCallback((id: string) => {
    dispatch({
      type: 'REMOVE_DONE_LIST',
      id,
    });
  }, []);

  return (
    <div>
      <WhatDoneGraph doingTimeOfCategory={doingTimeOfCategory} />
      <WhatDoneList
        whatDoneList={state.whatDoneList}
        onRemove={removeDoneList}
      />
      <WhatDoneAddListForm addDoneList={addDoneList} />
    </div>
  );
};

export default WhatDoneMain;
