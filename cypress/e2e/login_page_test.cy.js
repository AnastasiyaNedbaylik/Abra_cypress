import LoginPage from '../pages/login_page';
import { urls } from '../utilities/settings';


describe('login page', () => {
    it('login', () => {
        LoginPage.go_to_login_page();
        LoginPage.fill_emai();
        LoginPage.fill_password();
        LoginPage.click_login_btn();
        cy.url().should('equal', urls.generalPage);
    })
})
