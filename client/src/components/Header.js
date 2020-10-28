import React from 'react';
import { ButtonBase, Fade, Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom';
import NavElement from './NavElement';

class Header extends React.Component {
  render() {
    return (
      <header>
        <Tooltip
          title="Kana Practice"
          transition={Fade}
          placement="bottom"
          classes={{ tooltip: 'controls-tooltip' }}
        >
          <ButtonBase component={Link} focusRipple={true} id="logo-link" to="/">
            <img id="logo" src={this.props.logo} alt="logo" />
          </ButtonBase>
        </Tooltip>
        <nav>
          <ul>
            <li>
              <NavElement
                aria="howto"
                main={{ name: 'How To', link: '/howto' }}
              />
            </li>
            <li>
              <NavElement
                aria="practice"
                main={{ name: 'Practice', link: '#' }}
                subitems={[
                  { name: 'Pick one', link: '/pick' },
                  { name: 'Match pairs', link: '/match' },
                  { name: 'Draw kana', link: '/canvas' },
                ]}
              />
            </li>
            <li>
              <NavElement
                aria="profile"
                main={{ name: 'Profile', link: '/profile' }}
              />
            </li>
            <li>
              <NavElement aria="about" main={{ name: 'About', link: '/' }} />
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
