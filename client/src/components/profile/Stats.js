import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PerformanceDisplay from '../PerformanceDisplay';

import { selectUserInfo, selectUserStats, userLoggedOut } from './userSlice';

export default (props) => {
  const [tabActive, setTabActive] = useState(0);

  const dispatch = useDispatch();
  const { username, email } = useSelector(selectUserInfo);
  const stats = useSelector(selectUserStats);

  const handleTabChange = (e, val) => {
    setTabActive(val);
  };

  const handleLogout = (e) => {
    dispatch(userLoggedOut());
  };

  return (
    <div id="profile-container">
      <div id="profile-username">{username}</div>
      <div id="profile-email">{email}</div>
      <div id="profile-stats">
        <div id="profile-stats-header">User performance</div>
        <Tabs
          value={tabActive}
          indicatorColor="secondary"
          textColor="primary"
          onChange={handleTabChange}
        >
          {Object.keys(stats).map((key) => {
            if (stats[key].total < 5) {
              return false;
            }
            return <Tab label={key} className="profile-tab" key={key} />;
          })}
        </Tabs>

        <div className="profile-perf-info">
          {Object.values(stats).some((item) => item.total > 4) || 'No data yet'}
          <PerformanceDisplay
            correct={stats[Object.keys(stats)[tabActive]].correct}
            total={stats[Object.keys(stats)[tabActive]].total}
          />
        </div>
      </div>
      <Button className="profile-button" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};
