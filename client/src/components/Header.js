import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import MenuRounded from '@material-ui/icons/MenuRounded';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';
import NavElement from './NavElement';

export default ({ logo }) => (
  <header>
    <Tooltip
      title="Kana Practice"
      placement="bottom"
      classes={{ tooltip: 'controls-tooltip' }}
    >
      <ButtonBase component={Link} focusRipple id="logo-link" to="/">
        <img id="logo" src={logo} alt="logo" />
      </ButtonBase>
    </Tooltip>
    <nav>
      <div className="menu-container-mobile">
        <NavElement
          aria="mobile"
          main={{ icon: <MenuRounded /> }}
          subitems={[
            { name: 'Practice', url: '/howto' },
            { name: 'Profile', url: '/profile' },
            { name: 'About', url: '/' },
          ]}
        />
      </div>
      <ul className="menu-container">
        <li>
          <NavElement aria="howto" main={{ name: 'How To', url: '/howto' }} />
        </li>
        <li>
          <NavElement
            aria="practice"
            main={{ name: 'Practice' }}
            subitems={[
              { name: 'Pick one', url: '/pick' },
              { name: 'Match pairs', url: '/match' },
              { name: 'Draw kana', url: '/canvas' },
            ]}
          />
        </li>
        <li>
          <NavElement
            aria="profile"
            main={{ name: 'Profile', url: '/profile' }}
          />
        </li>
        <li>
          <NavElement aria="about" main={{ name: 'About', link: '/' }} />
        </li>
      </ul>
    </nav>
  </header>
);
