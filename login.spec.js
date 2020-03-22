let selector = {
    more_login: 'a[href="https://rc-ssr.rctiplus.com/login"]',
    username: '#username',
    password: '#password',
    button_login: '#btnLogin',
    more_user: 'a[href="https://rc-ssr.rctiplus.com/users"]',
    display_email: '#email',
    three_dot: '.col-md-1',
}; 

let tag = {
    title: 'RCTI+ - Live Streaming Program 4 TV Terpopuler',
};

let user = {
    email: 'dikakoko04@gmail.com',
    password: 'dikakoko',
};

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});


describe('Login Test', () => {
    cy.clearCookies();
    cy.visit('/');
});

it('On Test - Positive Scenario', () => {
    cy.get(selector.more_login).click();

    cy.get(selector.username).clear();
    cy.get(selector.username).type(user.email);
    cy.get(selector.password).clear();
    cy.get(selector.password).type(user.password);
    cy.get(selector.button_login).click();

    cy.get(selector.more_user).click();
    cy.get(selector.display_email).should('have.text', user.email);
    cy.get(selector.three_dot).click();
    
});