/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { NavLink } from 'react-router-dom';
import { IconButton } from '@material-ui/core';

export default ({ main, aria, subitems }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (e) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  const isActive = (match, location, list = null) => {
    if (list) {
      return list.some((item) => item.url === location.pathname);
    }
    return match?.url === location.pathname;
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getSubmenu = () => {
    return (
      subitems?.length && (
        <Menu
          id={aria}
          open={!!anchorEl}
          anchorEl={anchorEl}
          className="nav-menu"
          onClose={handleClose}
        >
          {subitems.map(({ url = '#', name }, key) => (
            <MenuItem
              component={NavLink}
              key={key}
              className="nav-link"
              activeClassName="nav-link active"
              onClick={handleClose}
              to={url}
              exact
              isActive={isActive}
            >
              {name}
            </MenuItem>
          ))}
        </Menu>
      )
    );
  };

  const params = {
    'aria-controls': aria,
    'aria-haspopup': true,
    className: 'nav-link',
    focusRipple: true,
    exact: true,
    onClick: subitems && handleOpen,
    component: NavLink,
    to: main.url || '',
    isActive: (match, location) => isActive(match, location, subitems),
  };

  return (
    <>
      {main.name ? (
        <ButtonBase {...params}>{main.name}</ButtonBase>
      ) : (
        <IconButton {...params}>{main.icon}</IconButton>
      )}
      {getSubmenu()}
    </>
  );
};
