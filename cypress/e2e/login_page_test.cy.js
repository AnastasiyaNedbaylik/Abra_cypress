import LoginPage from '../pages/login_page'

describe('', () => {
    it('login', () => {
        LoginPage.go_to_login_page();
        LoginPage.fill_emai();
        LoginPage.click_login_btn();
        cy.url().should('equal', 'https://dev.abra-market.com/');
    })
})
