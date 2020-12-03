import React from 'react';
import { Link } from 'react-router-dom';
import MenuOpenRounded from '@material-ui/icons/MenuOpenRounded';
import DoneAllRounded from '@material-ui/icons/DoneAllRounded';
import BorderColorRounded from '@material-ui/icons/BorderColorRounded';
import Button from '@material-ui/core/Button';

export default (props) => {
  return (
    <div id="howto-container">
      <section id="challenge-header-section">
        <h1>List of challenges</h1>
      </section>
      <section id="challenge-options-section">
        <Button component={Link} to="/pick" className="challenge-button">
          <div className="challenge-container">
            <div className="challenge-ico">
              <MenuOpenRounded />
            </div>
            <h2>Pick one</h2>
            <div className="challenge-description">
              Pick the only correct option for the shown transcription
            </div>
          </div>
        </Button>
        <Button component={Link} to="/match" className="challenge-button">
          <div className="challenge-container">
            <div className="challenge-ico">
              <DoneAllRounded />
            </div>
            <h2>Match pairs</h2>
            <div className="challenge-description">
              Select the pair for each option between two columns of symbols
            </div>
          </div>
        </Button>
        <Button component={Link} to="/canvas" className="challenge-button">
          <div className="challenge-container">
            <div className="challenge-ico">
              <BorderColorRounded />
            </div>
            <h2>Draw kana</h2>
            <div className="challenge-description">
              Practice in drawing randomly selected kana by hand
            </div>
          </div>
        </Button>
      </section>
    </div>
  );
};
