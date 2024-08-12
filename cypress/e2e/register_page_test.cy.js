import RegisterPage from '../pages/register_page';
import { urls } from '../utilities/settings';
import { invalidEmails, invalidPasswords } from '../utilities/data';

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

    it('should open temporary email and parse registration link', () => {
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
    
            cy.task('parseRegistrationLink', emailDetails).then((registrationLink) => {
              cy.log(`Registration link: ${registrationLink}`);
    
              // Перейти по ссылке на активацию регистрации
              cy.visit(registrationLink);
    
              // Продолжить тестирование
              cy.wait(5000); // Задержка для подтверждения загрузки страницы
              cy.contains('Email confirmed.').should('be.visible');
              cy.log('Test completed: Email confirmed.');
            });
          });
        });
      });

    })
