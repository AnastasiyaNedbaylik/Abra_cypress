import RegisterPage from '../pages/register_page';
import { urls } from '../utilities/settings';
import { invalidEmails, invalidPasswords } from '../utilities/data';

describe('register page', () => {
    it('register a new account with valid data', () => {
        RegisterPage.open_register_page();
        RegisterPage.click_signup_supplier_btn();
        RegisterPage.fill_email_valid();
        RegisterPage.fill_password_valid();
        RegisterPage.click_create_account_btn();
        cy.url().should('equal', urls.checkEmailPage);
    })

    it('register with invalid email', () => {
        RegisterPage.open_register_page();
        RegisterPage.click_signup_supplier_btn();
        RegisterPage.fill_email_invalid(invalidEmails);
        cy.log(`Test completed with email: ${invalidEmails}`);
    })

    it('register with invalid password', () => {
        RegisterPage.open_register_page();
        RegisterPage.click_signup_supplier_btn();
        RegisterPage.fill_password_invalid(invalidPasswords);
        cy.log(`Test completed with email: ${invalidPasswords}`);
    })
})