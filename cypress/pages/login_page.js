import { login_page } from '../locators/login_page';
import { urls } from '../utilities/settings';


class LoginPage {
    elements = {
        email_field: () => cy.get(login_page.email_field),
        password_field: () => cy.get(login_page.password_field),
        login_btn: () => cy.get(login_page.login_btn)
    }

    go_to_login_page() {
        cy.visit(urls.login_page);
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
