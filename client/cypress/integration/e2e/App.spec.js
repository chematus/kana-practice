import React from 'react';

const USERNAME = 'test';
const EMAIL = 'test@test.com';
const PWD = '123123123';
const TRANSITION_TIMEOUT = 500;

describe('<App />', () => {
  it('should work', () => {
    cy.visit('/');
    cy.contains(/Get started/i).click();
  });

  // it('should login', () => {
  //   cy.contains(/Profile/i).click();
  //   cy.get('#auth-email').type(EMAIL);
  //   cy.get('#auth-password').type(PWD);
  //   cy.contains(/Submit/i).click();
  //   cy.contains(USERNAME);
  //   cy.contains(/Logout/i);
  // });

  // it('should process picker task', () => {
  //   cy.contains(/Practice/i).click();
  //   cy.contains(/Pick one/i).click();
  //   cy.get('.picker-option button:first').click();
  //   cy.wait(TRANSITION_TIMEOUT);
  //   cy.get('.picker-option button').eq(3).click();
  //   cy.wait(TRANSITION_TIMEOUT);
  //   cy.get('.picker-option button').eq(5).click();
  //   cy.wait(TRANSITION_TIMEOUT);
  //   cy.get('.picker-option button:last').click();
  // });

  // it('should process matcher task', () => {
  //   cy.contains(/Practice/i).click();
  //   cy.contains(/Match pairs/i).click();
  //   cy.get('#matcher-options-left button:first').click();
  //   cy.get('#matcher-options-left button:last').click();
  //   cy.get('#matcher-options-right button:first').click();
  //   cy.wait(TRANSITION_TIMEOUT);
  //   cy.get('#matcher-options-left button:first').click();
  //   cy.get('#matcher-options-right button:last').click();
  //   cy.wait(TRANSITION_TIMEOUT);
  //   cy.get('#matcher-options-left button').eq(2).click();
  //   cy.get('#matcher-options-right button').eq(2).click();
  // });

  // it('should process canvas task', () => {
  //   cy.contains(/Practice/i).click();
  //   cy.contains(/Draw kana/i).click();
  //   cy.get('button[data-testid="canvas-hint"]').click();
  //   cy.get('div[data-testid="canvas-hint-panel"]').click();
  //   cy.get('button[data-testid="canvas-task"]').click();
  //   cy.get('button[data-testid="canvas-task"]').click();
  //   cy.get('#canvas-container').click(10, 10); // random postion on canvas
  //   cy.get('button[data-testid="canvas-undo"]').click();
  //   cy.get('#canvas-container').click(10, 10); // random postion on canvas
  //   cy.get('button[data-testid="canvas-clear"]').click();
  //   cy.get('button[data-testid="canvas-brush-size"]').click();
  //   cy.get('#size-range-container').click(15, 50); // center position of range picker
  //   cy.get('#canvas-container').click(10, 10); // random postion on canvas
  //   cy.get('button[data-testid="canvas-brush-color"]').click();
  //   cy.get('#color-picker-container').click(17, 100); // center postion of color picker
  //   cy.get('button[data-testid="canvas-clear"]').click();
  // });

  // it('should have responsive navbar', () => {
  //   cy.contains(/About/i).click();
  //   cy.contains(/How to/i).click();
  //   cy.get('#logo').click();
  // });
});
