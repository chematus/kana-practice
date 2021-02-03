import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import EmojiFoodBeverageRounded from '@material-ui/icons/EmojiFoodBeverageRounded';
import SchoolRounded from '@material-ui/icons/SchoolRounded';
import SpellcheckRounded from '@material-ui/icons/SpellcheckRounded';

export default () => (
  <div id="home-container">
    <section id="home-header-section">
      <h1>Kana Practice</h1>
      <span className="subheading">Repetition is the key</span>
    </section>
    <section id="home-feature-section">
      <div className="feature-container">
        <div className="feature-ico">
          <EmojiFoodBeverageRounded />
        </div>
        <h2>Straightforward</h2>
        Jump right to the tasks and keep practicing without interruption
      </div>
      <div className="feature-container">
        <div className="feature-ico">
          <SchoolRounded />
        </div>
        <h2>New learner oriented</h2>
        No kanji or grammar, just hiragana and katakana repetition
      </div>
      <div className="feature-container">
        <div className="feature-ico">
          <SpellcheckRounded />
        </div>
        <h2>Smart</h2>
        Keeps your stats and helps you to track your performance and weak
        points.
      </div>
    </section>
    <Button component={Link} id="feature-button" to="/howto">
      Get Started
    </Button>
  </div>
);
