import { generateRandomEmail, generateRandomPassword } from '../data';
import { urls } from '../settings';
import RegisterPage from '../../pages/register_page';

/**
 * Registers a user with a unique email and returns that email.
 * @returns {string} - The email used for registration.
 */
export function registerUser() {

    // Generate a unique email and password
    const uniqueEmail = generateRandomEmail();
    const password = generateRandomPassword();

    // Выполняем регистрацию с использованием Cypress команд
    cy.visit(urls.registration_page);

    RegisterPage.click_signup_supplier_btn();
    RegisterPage.fill_email(uniqueEmail);
    RegisterPage.fill_password(password);
    RegisterPage.click_create_account_btn();

    // Проверяем, что мы перешли на страницу подтверждения email
    cy.url().should('eq', urls.checkEmailPage);

    // Возвращаем уникальный email
    return cy.wrap(uniqueEmail);
}
