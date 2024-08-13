// const { mailinator_config } = require('./utilities/settings').default;
import { generateRandomPassword } from '../data';
import RegisterPage from '../../pages/register_page';
import LoginPage from '../../pages/login_page';
import { urls } from '../settings';

export function register_and_login() {
    return cy.task('createTemporaryEmail').then(emailAddress => {
        cy.log('Temporary email address:', emailAddress);

        // Генерация случайного пароля
        const password = generateRandomPassword();
        cy.log('Generated password:', password);

        // Убедитьcя, что emailAddress и password определены перед использованием
        if (!emailAddress || !password) {
            throw new Error('Email address or password is undefined');
        }

        // Регистрация на сайте
        RegisterPage.fill_email_to_get_invite(emailAddress);
        RegisterPage.fill_password(password);
        RegisterPage.click_create_account_btn();
        cy.url().should('equal', urls.checkEmailPage);

        // Ожидание письма в почтовом ящике
        return cy.task('waitForEmail', { emailAddress }).then(emailDetails => {
            cy.log('Email details:', emailDetails);

            // Найти ссылку на регистрацию в письме
            return cy.task('parseRegistrationLink', emailDetails).then(registrationLink => {
                cy.log('Registration link:', registrationLink);

                // Перейти по ссылке на регистрацию
                cy.visit(registrationLink);

                // Продолжить тестирование на странице регистрации
                cy.contains('Email confirmed.').should('be.visible');
                cy.log('Test completed: Email confirmed.');

                RegisterPage.click_login_link_confirm_page();

                // Логин с теми же учетными данными
                if (!emailAddress || !password) {
                    throw new Error('Email address or password is undefined before login');
                }

                cy.log('Logging in with:', emailAddress, password);
                LoginPage.fill_login_email(emailAddress);
                LoginPage.fill_login_password(password);
                LoginPage.click_login_btn_to_open_setup_page();

                // Проверка URL страницы настройки
                return cy.url().should('equal', urls.setup_personal_info_page).then(() => {
                    // Возвращаем email и пароль, используемые для регистрации
                    return { email: emailAddress, password };
                });
            });
        });
    });
}
