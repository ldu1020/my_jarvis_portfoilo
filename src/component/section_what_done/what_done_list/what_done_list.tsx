/** @format */

import React from 'react';

interface WhatDoneListProps {
  whatDoneList: WhatDoneData[];
  onRemove: (id: string) => void;
}

const WhatDoneList: React.FC<WhatDoneListProps> = ({
  whatDoneList,
  onRemove,
}) => {
  return (
    <div>
      <ul>
        {whatDoneList.map((item) => (
          <li>
            <h1>{item.whatDo}</h1>
            <h3>
              {item.startTime}-{item.endTime}
            </h3>
            <button onClick={() => onRemove(item.id)}>remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhatDoneList;
