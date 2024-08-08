class LoginPage {
    elements = {
        email_field: () => cy.get('#root > div > div > div > form > div:nth-child(1) > input'),
        password_field: () => cy.get('#root > div > div > div > form > div.Input_wrapper__NS9mM.LoginForm_input_wrapper__YMxsW > input'),
        login_btn: () => y.get('#root > div > div > div > form > button')
    }

    go_to_login_page() {
        cy.visit('https://dev.abra-market.com/login');
    }

    fill_emai() {
       this.elements.email_field().type('seller@gmail.com');
    }

    fill_password() {
        this.elements.password_field().type('Password1!');
    }

    click_login_btn() {
        this.elements.login_btn().click();
    }
}

module.exports = new LoginPage();
