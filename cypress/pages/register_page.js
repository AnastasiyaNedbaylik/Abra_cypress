import { urls } from '../utilities/settings';
import { register_page } from '../locators/register_page';
import { generateRandomEmail, generateRandomPassword } from '../utilities/data';


class RegisterPage {
    elements = {
        signup_supplier_btn: () => cy.xpath(register_page.signup_supplier_btn),
        email_field: () => cy.get(register_page.email_field),
        password_field: () => cy.get(register_page.password_field),
        create_account_btn: () => cy.get(register_page.create_account_btn),
        success_message: () => cy.get(register_page.success_message),
        email_confirmed_page_login_link: () => cy.get(register_page.email_confirmed_page_login_link),
        invalid_email_validation_message: () => cy.get(register_page.invalid_email_validation_message),
        invalid_password_validation_message: () => cy.get(register_page.invalid_password_validation_message)
    }

    open_register_page() {
        cy.visit(urls.registration_page);
        cy.get('body').should('be.visible'); // Проверка загрузки страницы
        this.elements.signup_supplier_btn().should('be.visible', { timeout: 10000 });
        this.elements.email_field().should('be.visible');
    }

    click_signup_supplier_btn() {
        this.elements.signup_supplier_btn().click();
    }

    // Использование рандомного валидного email
    fill_email_valid() {
        const randomEmail = generateRandomEmail();
        cy.log('Generated email address:', randomEmail);
        this.elements.email_field().clear().type(randomEmail);
    }

    fill_email_invalid(invalidEmails) {
        invalidEmails.forEach((email) => {
            cy.log(`Testing with email: ${email}`);
            this.elements.email_field().clear().type(email, { timeout: 300 });
            this.fill_password_valid();
            this.elements.invalid_email_validation_message().should('be.visible').and('have.text', 'Invalid email'); 
            this.expectCreateAccountButtonDisabled();
            cy.url().should('eq', urls.registration_page);
            cy.wait(300);
        });
    }

    // Использование рандомного валидного password
    fill_password_valid() {
        const randomPassword = generateRandomPassword();
        cy.log('Generated password:', randomPassword);
        this.elements.password_field().clear().type(randomPassword);
    }

    fill_password_invalid(invalidPasswords) {
        invalidPasswords.forEach((password) => {
            this.fill_email_valid();
            cy.log(`Testing with password: ${password}`)
            this.elements.password_field().clear().type(password, { timeout: 300});
            this.elements.email_field().click();
            this.elements.invalid_password_validation_message().should('be.visible').and('have.text', 'Password must match the next requirements');
            this.expectCreateAccountButtonDisabled();
            cy.url().should('eq', urls.registration_page);
            cy.wait(300);
        })
    }

    click_create_account_btn() {
        this.elements.create_account_btn().click();
    }

    expectCreateAccountButtonDisabled() {
        cy.get(this.elements.create_account_btn().should('be.disabled'));
    }
}

module.exports = new RegisterPage();
