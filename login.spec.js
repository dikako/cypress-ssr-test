let selector = {
    more_login: 'a[href="https://rc-ssr.rctiplus.com/login"]',
    username: '#username',
    password: '#password',
    button_login: '#btnLogin',
    more_user: 'a[href="https://rc-ssr.rctiplus.com/users"]',
    display_email: '#email',
    three_dot: '.col-md-1',
    logout: 'a[href="https://rc-ssr.rctiplus.com/logout"]',
    text_alert: '.text-danger',
    popup_alert: '#swal2-content',
    popup_confirm: '.swal2-confirm',
}; 

let tag = {
    title: 'RCTI+ - Live Streaming Program 4 TV Terpopuler',
};

let user = {
    email: 'dikakoko04@gmail.com',
    password: 'dikakoko',
    email_salah: 'dikakoko.com',
    password_salah: 'auieuwyeuiwyruw6',
    password_kurang: 'qwer',
    email_tak_terdaftar: 'dikakoko@yhh.cmm',
    phone: '082278843303',
    phone_salah: '778979898899',
    phone_tak_terdaftar: '082278675465',
    display_phone: 'ggss@mailinator.com',
};

let wording = {
    email_null: 'Please enter your e-mail address or phone number',
    password_null: 'Please enter your password',
    email_salah: 'Please Try Again Email Is Incorrect',
    phone_salah: 'Please Try Again Phone Number Is Incorrect',
    password_salah: 'Please Try Again Password Is Incorrect',
    password_kurang: 'The password must be at least 8 characters.',
    email_tak_terdaftar: 'Invalid, User Has Not Been Registered',
}

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});


describe('Login Test', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.visit('/');
    });

    it('On Test - Positive Scenario [Login By Email]', () => {
        cy.get(selector.more_login).click();
        
        cy.log('Login By Email')
        cy.get(selector.username).clear();
        cy.get(selector.username).type(user.email);
        cy.get(selector.password).clear();
        cy.get(selector.password).type(user.password);
        cy.get(selector.button_login).click();

        cy.get(selector.more_user).click();
        cy.get(selector.display_email).should('have.text', user.email);
        cy.get(selector.three_dot).click();
        cy.get(selector.logout).click();
    }); 


    it('On Test - Positive Scenario [Login By Phone Number]', () => {
        cy.visit('/');
        
        cy.log('Login By Phone Number')
        cy.get(selector.username).clear();
        cy.get(selector.username).type(user.phone);
        cy.get(selector.password).clear();
        cy.get(selector.password).type(user.password);
        cy.get(selector.button_login).click();

        cy.get(selector.more_user).click();
        cy.get(selector.display_email).should('have.text', user.display_phone);
        cy.get(selector.three_dot).click();
        cy.get(selector.logout).click();
    }); 
    
    it('On Test - Negative Skenario', () => {
        cy.visit('/login');
    
        cy.log('Username & Password Kosong');
        cy.get(selector.username).clear();
        cy.get(selector.password).clear();
        cy.get(selector.button_login).click();
        cy.get(selector.text_alert).eq(0).should('have.text', wording.email_null);
        cy.get(selector.text_alert).eq(1).should('have.text', wording.password_null);
    
        cy.log('Username Kosong');
        cy.get(selector.username).clear();
        cy.get(selector.password).clear();
        cy.get(selector.password).type(user.password);
        cy.get(selector.button_login).click();
        cy.get(selector.text_alert).should('have.text', wording.email_null);
    
        cy.log('Password Kosong');
        cy.get(selector.username).clear();
        cy.get(selector.username).type(user.email);
        cy.get(selector.password).clear();
        cy.get(selector.button_login).click();
        cy.get(selector.text_alert).should('have.text', wording.password_null);
    
        cy.log('Format Email Salah');
        cy.get(selector.username).clear();
        cy.get(selector.username).type(user.email_salah);
        cy.get(selector.password).clear();
        cy.get(selector.password).type(user.password)
        cy.get(selector.button_login).click();
        cy.get(selector.text_alert).should('have.text', wording.email_salah);
    
        cy.log('Password Salah');
        cy.get(selector.username).clear();
        cy.get(selector.username).type(user.email);
        cy.get(selector.password).clear();
        cy.get(selector.password).type(user.password_salah);
        cy.get(selector.button_login).click();
        cy.get(selector.text_alert).should('have.text', wording.password_salah);
    
        cy.log('Format Email Salah & Password KUrang dari 8');
        cy.get(selector.username).clear();
        cy.get(selector.username).type(user.email_salah);
        cy.get(selector.password).clear();
        cy.get(selector.password).type(user.password_kurang);
        cy.get(selector.button_login).click();
        cy.get(selector.text_alert).eq(0).should('have.text', wording.email_salah);
        cy.get(selector.text_alert).eq(1).should('have.text', wording.password_kurang);
    
        cy.log('Email Tidak Terdaftar');
        cy.get(selector.username).clear();
        cy.get(selector.username).type(user.email_tak_terdaftar);
        cy.get(selector.password).clear();
        cy.get(selector.password).type(user.password);
        cy.get(selector.button_login).click();
        cy.get(selector.popup_alert).should('have.text', wording.email_tak_terdaftar);
        cy.get(selector.popup_confirm).click();

        cy.log('Nomor Telepon Salah');
        cy.get(selector.username).clear();
        cy.get(selector.username).type(user.phone_salah);
        cy.get(selector.password).clear();
        cy.get(selector.password).type(user.password);
        cy.get(selector.button_login).click();
        cy.get(selector.text_alert).should('have.text', wording.phone_salah);

        cy.log('Nomor Telepon Tidak Terdaftar');
        cy.get(selector.username).clear();
        cy.get(selector.username).type(user.phone_tak_terdaftar);
        cy.get(selector.password).clear();
        cy.get(selector.password).type(user.password);
        cy.get(selector.button_login).click();
        cy.get(selector.popup_alert).should('have.text', wording.email_tak_terdaftar);
        cy.get(selector.popup_confirm).click();
    });    
});

