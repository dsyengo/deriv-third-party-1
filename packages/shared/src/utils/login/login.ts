import { website_name } from '../config/app-config';
import { getAppId } from '../config/config';
import { CookieStorage, isStorageSupported, LocalStore } from '../storage/storage';
import { getHubSignupUrl } from '../url';
import { deriv_urls } from '../url/constants';
import { routes } from '../routes/routes';

export const redirectToLogin = (is_logged_in: boolean, language: string, has_params = true, redirect_delay = 0) => {
    if (!is_logged_in && isStorageSupported(sessionStorage)) {
        const l = window.location;
        const redirect_url = has_params ? window.location.href : `${l.protocol}//${l.host}${l.pathname}`;
        sessionStorage.setItem('redirect_url', redirect_url);
        setTimeout(() => {
            const new_href = loginUrl({ language });
            window.location.href = new_href;
        }, redirect_delay);
    }
};

export const redirectToSignUp = () => {
    const location = window.location.href;
    const isDtraderRoute = window.location.pathname.includes(routes.trade);

    if (isDtraderRoute) {
        window.open(getHubSignupUrl(location));
    } else {
        window.open(getHubSignupUrl());
    }
};

type TLoginUrl = {
    language: string;
};

export const loginUrl = ({ language }: TLoginUrl) => {
    // 1. Get Marketing Cookies (Keep this for tracking existing campaigns)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const signup_device_cookie = new (CookieStorage as any)('signup_device');
    const signup_device = signup_device_cookie.get('signup_device');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const date_first_contact_cookie = new (CookieStorage as any)('date_first_contact');
    const date_first_contact = date_first_contact_cookie.get('date_first_contact');
    
    const marketing_queries = `${signup_device ? `&signup_device=${signup_device}` : ''}${
        date_first_contact ? `&date_first_contact=${date_first_contact}` : ''
    }`;

    // 2. FORCE YOUR APP ID
    const app_id = '105469'; 

    // 3. AFFILIATE CONFIGURATION
    const affiliate_token = '_ZpTaWpj8mZlZl7VyVw174GNd7ZgqdRLk';
    const utm_campaign = 'myaffiliates'; // Helps you track where users came from in your affiliate dashboard

    // 4. Construct the URL directly
    // Added &affiliate_token and &utm_campaign to the query string
    return `https://oauth.deriv.com/oauth2/authorize?app_id=${app_id}&l=${language}${marketing_queries}&brand=deriv&affiliate_token=${affiliate_token}&utm_campaign=${utm_campaign}`;
};