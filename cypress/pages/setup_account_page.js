import { urls } from '../utilities/settings';
import { setup_account_page } from '../locators/setup_account_page';
import { generateRandomFirstName, 
    generateRandomLastName, 
    generateRandomPhoneNumber, 
    generateRandomNineDigitNumber, 
    generateRandomYear, generateRandomAboutBusinessText, 
    generateRandomEmail, generateRandomAddress } from '../utilities/data';

class SetupAccountPage {
    elements = {
        first_name_field: () => cy.get(setup_account_page.first_name_field),
        last_name_field: () => cy.get(setup_account_page.last_name_field),
        phone_country_drop_down: () => cy.get(setup_account_page.phone_country_drop_down),
        phone_number_field: () => cy.get(setup_account_page.phone_number_field),
        continue_btn: () => cy.get(setup_account_page.continue_btn),
        profile_logo: () => cy.xpath(setup_account_page.profile_logo),
        company_or_store_name_field: () => cy.get(setup_account_page.company_or_store_name_field),
        select_business_drop_down: () => cy.get(setup_account_page.select_business_drop_down),
        clothes_drop_down_item: () => cy.get(setup_account_page.clothes_drop_down_item),
        i_am_manufacturer_checkbox: () => cy.get(setup_account_page.i_am_manufacturer_checkbox),
        license_or_entrepreneur_number_field: () => cy.get(setup_account_page.license_or_entrepreneur_number_field),
        year_field: () => cy.get(setup_account_page.year_field),
        number_of_employees_drop_down: () => cy.get(setup_account_page.number_of_employees_drop_down),
        item_number_of_employees_drop_down: () => cy.get(setup_account_page.item_number_of_employees_drop_down),
        country_of_company_registration_drop_down: () => cy.get(setup_account_page.country_of_company_registration_drop_down),
        item_country_of_company_registration_drop_down: () => cy.get(setup_account_page.item_country_of_company_registration_drop_down),
        about_business_field: () => cy.get(setup_account_page.about_business_field),
        business_phone_number_field: () => cy.get(setup_account_page.business_phone_number_field),
        business_email_address_field: () => cy.get(setup_account_page.business_email_address_field),
        company_address_field: () => cy.get(setup_account_page.company_address_field),
        business_profile_save_btn: () => cy.get(setup_account_page.business_profile_save_btn)      
     }

    fill_first_name_field() {
        const firstName = generateRandomFirstName();
        cy.log('Generated first name:', firstName);
        this.elements.first_name_field().type(firstName);
        cy.log(`Filled first name: ${firstName}`);
    }

    fill_last_name_field() {
        const lastName = generateRandomLastName();
        cy.log('Generated last name:', lastName);
        this.elements.last_name_field().type(lastName);
        cy.log(`Filled last name: ${lastName}`);
    }

    fill_phone_number_field() {
        const phoneNumber = generateRandomPhoneNumber();
        cy.log('Generated phone number:', phoneNumber);
        this.elements.phone_number_field().type(phoneNumber);
        cy.log(`Filled phone number: ${phoneNumber}`);
        cy.get(setup_account_page.phone_number_field).invoke('val').should('match', /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/);
        //Метод invoke('val') получает текущее значение поля ввода, и затем мы можем проверить его на соответствие регулярному выражению,
    }

    click_continue_btn() {
        cy.get(setup_account_page.continue_btn).click();
        cy.url({ timeout: 20000 }).should('eq', urls.setup_business_info_page);
        cy.get(setup_account_page.company_or_store_name_field, { timeout: 20000 }).should('be.visible');
        cy.on('fail', (error) => {
        console.log('Set up account on the 1st step failed or expectations were not met within the allotted time:', error);
        });
    }

    upload_profile_logo() {
        // Путь к изображению
        const imagePath = 'cypress/e2e/assets/profile-logo.png';

        // Загрузка изображения в поле
        // Для работы с методом attachFile, нужно установить и подключить плагин cypress-file-upload. и подключить его в cypress/support/commands.js: import 'cypress-file-upload';
        // attachFile – это метод из плагина cypress-file-upload. 
        cy.get(setup_account_page.profile_logo).should('be.visible').attachFile(imagePath);
        cy.get(setup_account_page.profile_logo).attachFile(imagePath);
        cy.get(setup_account_page.profile_logo).invoke('show').attachFile(imagePath);
    }

    fill_company_or_store_name_field() {
        const storeName = generateRandomFirstName();
        cy.log('Generated store name:', storeName);
        this.elements.company_or_store_name_field().type(storeName);
        cy.log(`Filled store name: ${storeName}`);
    }

    select_business() {
        this.elements.select_business_drop_down({ timeout: 500 }).click();

        // Получаем все элементы дропдауна и выбираем случайный элемент
        cy.get('.SelectItem_item__kFdkV', { timeout: 300 }).should('be.visible').then($options => {
            if ($options.length > 0) {
                const randomIndex = Math.floor(Math.random() * $options.length);
                cy.wrap($options[randomIndex]).click();
            } else {
                throw new Error('No dropdown items found');
            }
        });
    }

    check_manufacturer_checkbox() {
        this.elements.i_am_manufacturer_checkbox().check();
        // Проверка, что чекбокс отмечен
        this.elements.i_am_manufacturer_checkbox().should('be.checked');
    }

    fill_license_or_entrepreneur_number_field() {
        const randomNumber = generateRandomNineDigitNumber();
        cy.log('Generated number:', randomNumber);
        this.elements.license_or_entrepreneur_number_field().type(randomNumber);
        cy.log(`Filled license or entrepreneur number field with: ${randomNumber}`);
    }

    fill_year_field() {
        const randomYear = generateRandomYear();
        cy.log('Generated year:', randomYear);
        this.elements.year_field().type(randomYear.toString());
        console.log(`Filled year field with: ${randomYear}`);
    }

    select_number_of_employees() {
        this.elements.number_of_employees_drop_down().click();
        cy.get(setup_account_page.item_number_of_employees_drop_down, { timeout: 300 }).should('be.visible').then($options => {
            if ($options.length > 0) {
                const randomIndex = Math.floor(Math.random() * $options.length);
                cy.wrap($options[randomIndex]).click();
            } else {
                throw new Error('No dropdown items found');
            }
        });
    }

    select_country_of_company_registration() {
        this.elements.country_of_company_registration_drop_down().click();
        cy.get(setup_account_page.item_country_of_company_registration_drop_down, {timeout: 300}).should('be.visible').then($options => {
            if ($options.length > 0) {
                const randomIndex = Math.floor(Math.random() * $options.length);
                cy.wrap($options[randomIndex]).click();
            } else {
                throw new Error('No dropdown items found');
            }
        });
    }

    fill_about_business_field() {
        const randomTextAboutBusiness = generateRandomAboutBusinessText();
        cy.log('Generated text:', randomTextAboutBusiness);
        this.elements.about_business_field().type(randomTextAboutBusiness);
        cy.log(`Filled about business field with: ${randomTextAboutBusiness}`);
    }

    fill_business_phone_number() {
        const phoneNumber = generateRandomPhoneNumber();
        cy.log('Generated phone number:', phoneNumber);
        this.elements.business_phone_number_field().type(phoneNumber);
        cy.log(`Filled phone number: ${phoneNumber}`);
        cy.get(setup_account_page.business_phone_number_field).invoke('val').should('match', /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/);
    }

    fill_business_email_address_field() {
        const randomEmail = generateRandomEmail();
        cy.log('Generated business email address:', randomEmail);
        this.elements.business_email_address_field().type(randomEmail);
        cy.log(`Filled business email address field with: ${randomEmail}`);
    }

    fill_company_address_field() {
        const randomAddress = generateRandomAddress();
        cy.log('Generated company address:', randomAddress);
        this.elements.company_address_field().type(randomAddress);
        cy.log(`Filled company address field with: ${randomAddress}`);
    }

    click_business_profile_save_btn() {
        this.elements.business_profile_save_btn().click();
        cy.url({ timeout: 20000 }).should('eq', urls.generalPage);
        cy.contains('SUPPLIER', { timeout: 20000 }).should('be.visible');
    }
}

module.exports = new SetupAccountPage();
