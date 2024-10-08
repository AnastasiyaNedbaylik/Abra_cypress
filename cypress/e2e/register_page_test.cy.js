import RegisterPage from '../pages/register_page';
import { urls } from '../utilities/settings';
import { invalidEmails, invalidPasswords } from '../utilities/data';
import { registerUser } from '../utilities/register_page/registration';
import { register_and_login } from '../utilities/login_page/login_page';

describe('register page', () => {
    beforeEach(() => {
        // Открываем страницу регистрации перед каждым тестом
        RegisterPage.open_register_page();
        RegisterPage.click_signup_supplier_btn();
    });

    it('register a new account with valid data', () => {
        RegisterPage.fill_email_valid();
        RegisterPage.fill_password_valid();
        RegisterPage.click_create_account_btn();
        cy.url().should('equal', urls.checkEmailPage);
    })

    it('register with invalid email', () => {
        RegisterPage.fill_email_invalid(invalidEmails);
        cy.log(`Test completed with email: ${invalidEmails}`);
    })

    it('register with invalid password', () => {
        RegisterPage.fill_password_invalid(invalidPasswords);
        cy.log(`Test completed with email: ${invalidPasswords}`);
    })

    it('register without email', () => {
        RegisterPage.fill_password_valid();
        RegisterPage.expectCreateAccountButtonDisabled();
        // cy.contains('Email is required').should('be.visible');
    })

    it('register withoout password', () => {
        RegisterPage.fill_email_valid();
        RegisterPage.click_password_field();
        RegisterPage.click_email_field();
        RegisterPage.expectCreateAccountButtonDisabled();
        cy.contains('Password is required').should('be.visible');
    })

    it('open temporary email and parse registration link', () => {
        cy.task('createTemporaryEmail').then((emailAddress) => {
          cy.log(`Temporary email address: ${emailAddress}`);

    
          // Регистрация на сайте
          RegisterPage.fill_email_to_get_invite(emailAddress);
          RegisterPage.fill_password_valid();
          RegisterPage.click_create_account_btn();
          cy.url().should('eq', urls.checkEmailPage);
    
          // Ожидание письма и извлечение ссылки
          cy.task('waitForEmail', { emailAddress }).then((emailDetails) => {
            cy.log(`Email details received`);
    
            // Найти ссылку на регистрацию в письме
            cy.task('parseRegistrationLink', emailDetails).then((registrationLink) => {
              cy.log(`Registration link: ${registrationLink}`);
    
              // Перейти по ссылке на активацию регистрации
              cy.visit(registrationLink);
    
              // Продолжить тестирование
              cy.wait(1000); // Задержка для подтверждения загрузки страницы
              cy.contains('Email confirmed.').should('be.visible');
              cy.log('Test completed: Email confirmed.');
            });
          });
        });
      });

    it('register with an existing email', () => {
        // Register a user and get the email
        registerUser().then((existingEmail) => {

        // Attempt to register again with the same email
        RegisterPage.register_with_existing_email(existingEmail);

        // assertions
        cy.contains('Email is already registered').should('be.visible');
        });
    });

    it('register a new user and log in with the same credentials', () => {
        register_and_login().then(({ email, password }) => {
            cy.log(`Registered and logged in with email: ${email} and password: ${password}`);
        });
    });

    
})
