import LoginPage from '../pages/login_page'

describe('base page test', () => {
    beforeEach(() => {
        LoginPage.go_to_login_page();
        LoginPage.fill_emai();
        LoginPage.fill_password();
        LoginPage.click_login_btn();
    })

    it('base page', () => {

        cy.url().should('equal', 'https://dev.abra-market.com/');
    })
})
