import React, { useState, useRef } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { NavLink } from 'react-router-dom';

const isActive = (match, location, list) => {
  return list && list.length
    ? list.some((item) => item.link === match.url)
    : false;
};

export default ({ main, aria, subitems, extended }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const showMenu = (active = false) => {
    setIsOpen(active);
  };

  const generateSubmenu = () => {
    let submenu = null;
    if (subitems && subitems.length) {
      submenu = (
        <Menu
          id={aria}
          open={isOpen}
          anchorEl={ref.current}
          className="nav-menu"
          onClose={() => showMenu(false)}
        >
          {subitems.map((item, key) => (
            <MenuItem
              component={NavLink}
              key={key}
              className="nav-link"
              activeClassName="nav-link active"
              onClick={() => showMenu(false)}
              to={extended ? main.link + item.link : item.link}
            >
              {item.name}
            </MenuItem>
          ))}
        </Menu>
      );
    }
    return submenu;
  };

  return (
    <>
      <ButtonBase
        aria-controls={aria}
        aria-haspopup="true"
        className="nav-link"
        focusRipple={true}
        exact
        onClick={() => showMenu(true)}
        ref={ref}
        component={NavLink}
        to={main.link || '#'}
        isActive={(match, location, subitems) =>
          isActive(match, location, subitems)
        }
      >
        {main.name}
      </ButtonBase>
      {generateSubmenu()}
    </>
  );
};
