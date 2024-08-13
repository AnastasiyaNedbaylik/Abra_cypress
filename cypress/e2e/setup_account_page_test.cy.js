import SetupAccountPage from '../pages/setup_account_page';
import { urls } from '../utilities/settings';
import { register_and_login } from '../utilities/login_page/login_page';
import RegisterPage from '../pages/register_page';


describe('set up account page', () => {
    beforeEach(() => {
        // Открываем страницу регистрации перед каждым тестом
        RegisterPage.open_register_page();
        RegisterPage.click_signup_supplier_btn();
        //Register and login with same credentials
        register_and_login().then(({ email, password }) => {
            cy.log(`Registered and logged in with email: ${email} and password: ${password}`);
        });
    })

    it('set up account (2 steps)', () => {
        // 1 step
        SetupAccountPage.fill_first_name_field();
        SetupAccountPage.fill_last_name_field();
        SetupAccountPage.fill_phone_number_field();
        SetupAccountPage.click_continue_btn();
        // SetupAccountPage.upload_profile_logo();
        SetupAccountPage.fill_company_or_store_name_field();
        SetupAccountPage.select_business();
        SetupAccountPage.check_manufacturer_checkbox();
        SetupAccountPage.fill_license_or_entrepreneur_number_field();
        SetupAccountPage.fill_year_field();
        SetupAccountPage.select_number_of_employees();
        SetupAccountPage.select_country_of_company_registration();
        SetupAccountPage.fill_about_business_field();
        SetupAccountPage.fill_business_phone_number();
        SetupAccountPage.fill_business_email_address_field();
        SetupAccountPage.fill_company_address_field();
        SetupAccountPage.click_business_profile_save_btn()
    })
})