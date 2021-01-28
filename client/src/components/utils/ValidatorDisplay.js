import React from 'react';
import DoneRounded from '@material-ui/icons/DoneRounded';
import ClearRounded from '@material-ui/icons/ClearRounded';

export default ({ correct }) => {
  const classActive = 'validator-icon active';
  const classInactive = 'validator-icon';
  return (
    <div className="validator-display">
      <div className="validator-correct">
        <DoneRounded
          className={correct === true ? classActive : classInactive}
        />
      </div>
      <div className="validator-wrong">
        <ClearRounded
          className={correct === false ? classActive : classInactive}
        />
      </div>
    </div>
  );
};
