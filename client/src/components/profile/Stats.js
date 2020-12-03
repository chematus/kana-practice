import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PerformanceDisplay from 'components/utils/PerformanceDisplay';

import { selectUserInfo, selectUserStats, userLoggedOut } from './userSlice';

const getWeakspotList = (stats, limit = 5) => {
  const { weakspot: data } = stats;
  const total = Object.entries(stats)
    .map((item) => item[1])
    .filter((item) => item.total)
    .reduce((acc, cur) => acc + cur.total, 0);
  const result = data
    ? Object.entries(data)
        .sort((a, b) => b[1] - a[1])
        .map((item) => [item[0], Math.round((item[1] / total) * 100)])
        .slice(0, limit)
    : [];
  return result;
};

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
            if (stats[key].total > 4) {
              return <Tab label={key} className="profile-tab" key={key} />;
            }
            return false;
          })}
        </Tabs>

        <div className="profile-perf-info">
          {Object.values(stats).some((item) => item.total > 4) || 'No data yet'}
          <PerformanceDisplay
            correct={stats[Object.keys(stats)[tabActive]].correct}
            total={stats[Object.keys(stats)[tabActive]].total}
            weakspot={getWeakspotList(stats)}
          />
        </div>
      </div>
      <Button className="profile-button" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};
