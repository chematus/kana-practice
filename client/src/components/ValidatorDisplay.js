import React from 'react';
import { DoneRounded, ClearRounded } from '@material-ui/icons';

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
