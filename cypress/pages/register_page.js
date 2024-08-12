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
        email_confirmed_page_login_link: () => cy.get(register_page.email_confirmed_page_login_link)
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
        this.elements.email_field().type(randomEmail);
    }

    // Использование рандомного валидного password
    fill_password_valid() {
        const randomPassword = generateRandomPassword();
        cy.log('Generated password:', randomPassword);
        this.elements.password_field().type(randomPassword);
    }

    click_create_account_btn() {
        this.elements.create_account_btn().click();
    }
}

module.exports = new RegisterPage();
