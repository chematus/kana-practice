import React from 'react';
import { ButtonBase, Menu, MenuItem } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

class NavElement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
    this.ref = null;
  }

  showMenu(active = false) {
    this.setState({
      isOpen: active,
    });
    return active;
  }

  isActive(match, location) {
    return this.props.subitems.some((item) => item.link === match.url);
  }

  render() {
    let submenu = null;
    let customProps = {};
    if (this.props.subitems && this.props.subitems.length) {
      customProps.isActive = (match, location) =>
        this.isActive(match, location);
      submenu = (
        <Menu
          id={this.props.aria}
          open={this.state.isOpen}
          anchorEl={this.ref}
          className="nav-menu"
          onClose={() => this.showMenu(false)}
        >
          {this.props.subitems.map((item, key) => (
            <MenuItem
              component={NavLink}
              key={key}
              className="nav-link"
              activeClassName="nav-link active"
              onClick={() => this.showMenu(false)}
              to={
                this.props.extended
                  ? this.props.main.link + item.link
                  : item.link
              }
            >
              {item.name}
            </MenuItem>
          ))}
        </Menu>
      );
    }

    return (
      <>
        <ButtonBase
          aria-controls={this.props.aria}
          aria-haspopup="true"
          className="nav-link"
          focusRipple={true}
          exact
          onClick={() => this.showMenu(true)}
          ref={(item) => (this.ref = item)}
          component={NavLink}
          to={this.props.main.link || '#'}
          {...customProps}
        >
          {this.props.main.name}
        </ButtonBase>
        {submenu}
      </>
    );
  }
}

export default NavElement;
