import React, { useState } from 'react';
import { Button, Tab, Tabs } from '@material-ui/core';
import PerformanceDisplay from '../PerformanceDisplay';

export default ({ user: { username, email, stats }, handleLogout }) => {
  const [tabActive, setTabActive] = useState(0);

  const handleTabChange = (e, val) => {
    setTabActive(val);
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
            return <Tab label={key} className="profile-tab" key={key} />;
          })}
        </Tabs>

        <div className="profile-perf-info">
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
