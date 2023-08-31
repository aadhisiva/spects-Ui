import { initReactI18next } from "react-i18next";
import i18n from "i18next";

i18n.use(initReactI18next).init({
  lng: "en",
  resources: {
    en: {
      translation: {
        GOV_NAME: "GOVT. OF KARNATAKA",
        PROJECT_TITLE: "Spectacles Distribution",
        NHM : "National Health Mission",
        LOGIN_PAGE : "Login Page",
        SIGNIN: 'Sign In',
        STATE_ADMIN: "State Admin",
        LOG_OUT: "Log Out",
        WELCOME: "Welcome",
        ROLE: 'Role',
        MOBILE_NUMBER : "Mobile Number",
        SEND_OTP: "Send Otp",
        LOGIN: "Login",
        RESEND_OTP: "Resend Otp",
        OTP: "Otp",
        STATISTICS: "Statistics",
        ASSIGNMENT: "Assignment",
        REPORTS: "Reports",
        TOTAL: "Total",
        ORDERS: "Orders",
        PENDING: "Pending",
        DELIVERED: "Delivered",
        DISTRICT_TABLE: "District Officer",
        TALUKA_TABLE: "Taluka",
        REFRACTIONIST_TABLE: "Refractionist",
        REPORTS_TABLE: "Reports",
        DASHBOARD: "Dashboard",
        RURAL_URBAN: "Rural/Urban",
         /* District officer table  */
         FILTERS : "Filters",
         CLEAR_FILTERS: "Clear Filters",
         DISTRICT_HEALTH_OFFICER: "District Level Officer",
         TALUKA_HEALTH_OFFICER : "Taluka Level Officer",
         PHCO_HEALTH_OFFICER : "PHC Health Officer",
         TABLE_NAME: "Name",
         TABLE_MOBILE: "Mobile Number",
         TABLE_DISTRICT: "District",
         TABLE_ACTION: "Action",
         TABLE_TALUKA: "Taluka",
         ASSIGNMENT_LIST: "Assignment List",
         TABLE_REFRACTIONIST_NAME: "Refractionist Name", 
         REFRACTIONIST: "Refractionist",
         TABLE_VILLAGE_WARD: "Village/Ward",
         TABLE_SUBCENTRE: "Sub Centre",
         TABLE_REFRACTIONIST_MOBILE: "Refractionist Mobile Number",
         TABLE_STATUS: 'Status',
         TABLE_DETAILS: "Details",
         TABLE_VIEW: "View",
         REPORTS_LIST: "Reports List",
         PHCO: "PHC(Health Facility)",
         PHCO_CARD: "PHCO",
         FOOTER: "Government of Karnataka 2023, Directorate Of EDCS",
         DEVELOPED: "Developed By Mobile One",
         ORDER_NUMBER: 'Order Number',
         DOWNLOAD: 'Download',
         MODIFY: 'Modify',
         ADD: "Add",
         PRIMARY_SCREENING_LIST: "Primary Screening Reports",
         SECONDARY_SCREENING_LIST: "Secondary Screening Reports",
      }
    },
    ka: {
      translation: {
        GOV_NAME: "ಕರ್ನಾಟಕ ಸರ್ಕಾರ",
        PROJECT_TITLE: "ಕನ್ನಡಕ ವಿತರಣೆ",
        NHM : "ರಾಷ್ಟ್ರೀಯ ಆರೋಗ್ಯ ಅಭಿಯಾನ",
        LOGIN_PAGE : "ಲಾಗಿನ್ ಪುಟ",
        SIGNIN: 'ಸೈನ್ ಇನ್',
        STATE_ADMIN: "ರಾಜ್ಯ ನಿರ್ವಾಹಕ",
        LOG_OUT: "ಲಾಗ್ ಔಟ್",
        WELCOME: "ಸ್ವಾಗತ",
        ROLE: "ಪಾತ್ರ",
        MOBILE_NUMBER : "ಮೊಬೈಲ್ ನಂಬರ",
        SEND_OTP: "ಒಟಿಪಿ ಕಳುಹಿಸಿ",
        LOGIN: "ಲಾಗಿನ್",
        RESEND_OTP: "ಒಟಿಪಿ ಮರುಕಳುಹಿಸಿ",
        OTP: "ಒಟಿಪಿ",
        STATISTICS: "ಅಂಕಿಅಂಶಗಳು",
        ASSIGNMENT: "ನಿಯೋಜನೆ",
        REPORTS: "ವರದಿಗಳು",
        TOTAL: "ಒಟ್ಟು",
        ORDERS: "ಆದೇಶಗಳು",
        PENDING: "ಬಾಕಿಯಿದೆ",
        DELIVERED: "ವಿತರಿಸಲಾಗಿದೆ",
        DISTRICT_TABLE: "ಜಿಲ್ಲಾ ಅಧಿಕಾರಿ",
        TALUKA_TABLE: "ತಾಲೂಕಾ ಅಧಿಕಾರಿ",
        REFRACTIONIST_TABLE: "ವಕ್ರೀಭವನವಾದಿ",
        REPORTS_TABLE: "ವರದಿಗಳು",
        DASHBOARD: "ಡ್ಯಾಶ್ಬೋರ್ಡ್",
        /* District officer table  */
        FILTERS : "ಶೋಧಕಗಳು",
        CLEAR_FILTERS: "ಸ್ಪಷ್ಟ ಫಿಲ್ಟರ್‌ಗಳು",
        DISTRICT_HEALTH_OFFICER: "ಜಿಲ್ಲಾ ಮಟ್ಟದ ಅಧಿಕಾರಿ",
        TALUKA_HEALTH_OFFICER:"ತಾಲೂಕು ಆರೋಗ್ಯ ಅಧಿಕಾರಿ",
        PHCO_HEALTH_OFFICER : "ತಾಲೂಕಾ ಮಟ್ಟದ ಅಧಿಕಾರಿ",
        TABLE_NAME: "ಹೆಸರು",
        TABLE_MOBILE: "ಮೊಬೈಲ್ ನಂಬರ",
        TABLE_DISTRICT: "ಜಿಲ್ಲೆ",
        TABLE_ACTION: "ಕ್ರಮ",
        ASSIGNMENT_LIST: "ನಿಯೋಜನೆ ಪಟ್ಟಿ",
        TABLE_TALUKA: "ತಾಲೂಕು",
        TABLE_REFRACTIONIST_NAME: "ವಕ್ರೀಭವನದ ಹೆಸರು", 
         REFRACTIONIST: "ವಕ್ರೀಭವನವಾದಿ",
         TABLE_VILLAGE_WARD: "ಗ್ರಾಮ/ವಾರ್ಡ್",
         TABLE_SUBCENTRE: "ಉಪ ಕೇಂದ್ರ",
         TABLE_REFRACTIONIST_MOBILE: "ವಕ್ರೀಭವನದ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
         TABLE_STATUS: 'ಸ್ಥಿತಿ',
         TABLE_DETAILS: 'ವಿವರಗಳು',
         TABLE_VIEW: "ನೋಟ",
         REPORTS_LIST: "ವರದಿಗಳ ಪಟ್ಟಿ",
         PHCO: "ಆರೋಗ್ಯ ಅಧಿಕಾರಿ",
         PHCO_CARD: "ಆರೋಗ್ಯ ಅಧಿಕಾರಿ",
         FOOTER: "ಕರ್ನಾಟಕ ಸರ್ಕಾರ 2023, EDCS ನಿರ್ದೇಶನಾಲಯ",
         DEVELOPED: "ಮೊಬೈಲ್ ಒನ್‌ನಿಂದ ಅಭಿವೃದ್ಧಿಪಡಿಸಲಾಗಿದೆ",
         ORDER_NUMBER: 'ಆದೇಶ ಸಂಖ್ಯೆ',
         DOWNLOAD: 'ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
         RURAL_URBAN: "ಗ್ರಾಮೀಣ/ನಗರ",
         MODIFY: 'ಮಾರ್ಪಡಿಸಿ',
         ADD: 'ಸೇರಿಸಿ',
         PRIMARY_SCREENING_LIST: "ಪ್ರಾಥಮಿಕ ಸ್ಕ್ರೀನಿಂಗ್ ವರದಿಗಳು",
         SECONDARY_SCREENING_LIST: "ಸೆಕೆಂಡರಿ ಸ್ಕ್ರೀನಿಂಗ್ ವರದಿಗಳು",
      }
    },
  },
  keySeparator: false,
  interpolation: { escapeValue: false }
});

export default i18n;
