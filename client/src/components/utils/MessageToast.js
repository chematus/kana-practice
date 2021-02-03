import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {
  selectReqError,
  selectReqStatus,
  flushError,
} from 'components/profile/userSlice';

const TOAST_DURATION = 3000;

export default () => {
  const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch();
  const status = useSelector(selectReqStatus);
  const error = useSelector(selectReqError);

  const handleClose = () => {
    setIsActive(false);
    dispatch(flushError());
  };

  useEffect(() => {
    if (status === 'failed' && error?.length) {
      setIsActive(true);
    }
  }, [error, status]);

  return (
    <Snackbar
      open={isActive}
      autoHideDuration={TOAST_DURATION}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error">
        {error}
      </Alert>
    </Snackbar>
  );
};
