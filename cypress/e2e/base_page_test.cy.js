import LoginPage from '../pages/login_page'
import { urls } from '../utilities/settings';

describe('base page test', () => {
    beforeEach(() => {
        cy.visit(urls.generalPage);
        cy.setCookie('access_token_cookie', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE1LCJpYXQiOjE3MjMxOTcxOTUsIm5iZiI6MTcyMzE5NzE5NSwianRpIjoiZjY3OWQ5NTMtMGQ3ZS00MTA0LTg2MjQtYjdjM2RlYTE5ODE4IiwiZXhwIjoxNzIzODAxOTk1LCJ0eXBlIjoiYWNjZXNzIiwiZnJlc2giOmZhbHNlfQ.bjwfVfLU7CaKY_S5xOr6GbFhq0JgFY2KqZOptQfeKvI');
        cy.setCookie('refresh_token_cookie', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE1LCJpYXQiOjE3MjMxOTcxOTUsIm5iZiI6MTcyMzE5NzE5NSwianRpIjoiZTA3ODhjMjEtMDcyYi00MGVhLWFkNDgtY2MxYzQzNDllNjk3IiwiZXhwIjoxNzI1NjE2Mzk1LCJ0eXBlIjoicmVmcmVzaCJ9.rChe_bHv_rgCo94D5fyl0X6yvrgiDHyKJXEBNonJx94');
        cy.reload();
        // LoginPage.go_to_login_page();
        // LoginPage.fill_emai();
        // LoginPage.fill_password();
        // LoginPage.click_login_btn();
    })

    it('base page', () => {

        cy.url().should('equal', urls.generalPage);
    })
})
