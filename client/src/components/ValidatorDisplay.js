import React from 'react';
import { DoneRounded, ClearRounded } from '@material-ui/icons';

export default (props) => {
  const classActive = 'validator-icon active';
  const classInactive = 'validator-icon';
  return (
    <div className="validator-display">
      <div className="validator-correct">
        <DoneRounded
          className={props.correct === true ? classActive : classInactive}
        />
      </div>
      <div className="validator-wrong">
        <ClearRounded
          className={props.correct === false ? classActive : classInactive}
        />
      </div>
    </div>
  );
};
