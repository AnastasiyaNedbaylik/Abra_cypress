import { login_page } from '../locators/login_page';
import { urls } from '../utilities/settings';
import { setup_account_page } from '../locators/setup_account_page';


class LoginPage {
    elements = {
        email_field: () => cy.get(login_page.email_field),
        password_field: () => cy.get(login_page.password_field),
        login_btn: () => cy.get(login_page.login_btn)
    }

    go_to_login_page() {
        cy.visit(urls.login_page);
    }

    fill_login_email(email) {
       this.elements.email_field().type(email);
    }

    fill_login_password(password) {
        this.elements.password_field().type(password);
    }

    click_login_btn_to_open_setup_page() {
        this.elements.login_btn().click();
    
        // Увеличиваем таймаут для ожидания загрузки страницы
        cy.url({ timeout: 10000 }) // Увеличиваем таймаут до 10 секунд
          .should('eq', urls.setup_personal_info_page)
          .then(() => {
            // Переходим к следующему элементу только после успешной проверки URL
            cy.get(setup_account_page.first_name_field, { timeout: 300 })
              .should('be.visible');
          });
    }
}

module.exports = new LoginPage();
