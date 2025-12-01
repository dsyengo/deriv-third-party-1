import { isBot } from '../platform';
import { isStaging } from '../url/helpers';

/*
 * Configuration values needed in js codes
 *
 * NOTE:
 * Please use the following command to avoid accidentally committing personal changes
 * git update-index --assume-unchanged packages/shared/src/utils/config.js
 *
 */

export const livechat_license_id = 12049137;
export const livechat_client_id = '66aa088aad5a414484c1fd1fa8a5ace7';

export const domain_app_ids = {
    // these domains as supported "production domains"
    'mrcharlohfx.site': 105469,      // <--- Your New Domain
    'www.mrcharlohfx.site': 105469,  // <--- Your New Domain (www)
    'deriv-third-party-1.vercel.app': 105469, // Keep Vercel as backup
    'deriv.app': 16929,
    'app.deriv.com': 16929,
    'staging-app.deriv.com': 16303,
    'app.deriv.me': 1411,
    'staging-app.deriv.me': 1411,
    'app.deriv.be': 30767,
    'staging-app.deriv.be': 31186,
    'binary.com': 1,
    'test-app.deriv.com': 51072,
};

export const platform_app_ids = {
    derivgo: 23789,
};

export const getCurrentProductionDomain = () =>
    !/^staging\./.test(window.location.hostname) &&
    Object.keys(domain_app_ids).find(domain => window.location.hostname === domain);

export const isProduction = () => {
    // FIX: Using global regex (/\./g) to ensure all dots are escaped properly for domains like charlohfx.site
    const all_domains = Object.keys(domain_app_ids).map(domain => `(www\\.)?${domain.replace(/\./g, '\\.')}`);
    const regex = new RegExp(`^(${all_domains.join('|')})$`, 'i');
    const is_prod = regex.test(window.location.hostname);
    
    // [DEBUG] Check if the current domain matches the list
    console.log('[DEBUG] isProduction Check:', { 
        hostname: window.location.hostname, 
        is_prod: is_prod,
        domains_list: all_domains 
    });
    
    return is_prod;
};

export const isTestLink = () => {
    return /^((.*)\.binary\.sx)$/i.test(window.location.hostname);
};

export const isLocal = () => /localhost(:\d+)?$/i.test(window.location.hostname);

/**
 * @deprecated Please use 'WebSocketUtils.getAppId' from '@deriv-com/utils' instead of this.
 */
export const getAppId = () => {
    let app_id = null;
    const user_app_id = '105469'; // <--- Your Real App ID
    const config_app_id = window.localStorage.getItem('config.app_id');
    const current_domain = getCurrentProductionDomain() || '';
    
    window.localStorage.removeItem('config.platform');
    const platform = window.sessionStorage.getItem('config.platform');
    const is_bot = isBot();

    // [DEBUG] Log inputs to see what we are working with
    console.log('[DEBUG] getAppId Inputs:', { 
        user_app_id, 
        config_app_id, 
        platform,
        hostname: window.location.hostname 
    });

    // 1. Check Platform first
    if (platform && platform_app_ids[platform as keyof typeof platform_app_ids]) {
        console.log('[DEBUG] Using Platform App ID');
        app_id = platform_app_ids[platform as keyof typeof platform_app_ids];
    } 
    // 2. CHECK YOUR HARDCODED ID NEXT (Priority Override)
    // This ensures your ID works even if the browser has old "staging" IDs saved.
    else if (user_app_id.length) {
        console.log('[DEBUG] Using User Hardcoded App ID (Preferred)');
        window.localStorage.setItem('config.default_app_id', user_app_id);
        app_id = user_app_id;
    } 
    // 3. Then check LocalStorage
    else if (config_app_id) {
        console.log('[DEBUG] Using LocalStorage App ID');
        app_id = config_app_id;
    } 
    // 4. Fallbacks
    else if (isStaging()) {
        console.log('[DEBUG] Fallback: Staging');
        window.localStorage.removeItem('config.default_app_id');
        app_id = is_bot ? 19112 : domain_app_ids[current_domain as keyof typeof domain_app_ids] || 16303;
    } else if (/localhost/i.test(window.location.hostname)) {
        console.log('[DEBUG] Fallback: Localhost');
        app_id = 36300;
    } else {
        console.log('[DEBUG] Fallback: Production Default');
        window.localStorage.removeItem('config.default_app_id');
        app_id = is_bot ? 19111 : domain_app_ids[current_domain as keyof typeof domain_app_ids] || 16929;
    }

    console.log('[DEBUG] Final Calculated App ID:', app_id);
    return app_id;
};

export const getSocketURL = (is_wallets = false) => {
    // 1. Respect local storage overrides (for developers using query params)
    const local_storage_server_url = window.localStorage.getItem('config.server_url');
    if (local_storage_server_url) {
        console.log('[DEBUG] Using Server URL from LocalStorage:', local_storage_server_url);
        return local_storage_server_url;
    }

    // 2. Check if the user is already logged in
    let active_loginid_from_url;
    const search = window.location.search;
    if (search) {
        const params = new URLSearchParams(document.location.search.substring(1));
        active_loginid_from_url = params.get('acct1');
    }
    const local_storage_loginid = is_wallets
        ? window.sessionStorage.getItem('active_wallet_loginid') || window.localStorage.getItem('active_wallet_loginid')
        : window.sessionStorage.getItem('active_loginid') || window.localStorage.getItem('active_loginid');
    const loginid = local_storage_loginid || active_loginid_from_url;

    // 3. Determine Server Type
    // is_real: True if user is logged in with a Real Account (CR...)
    const is_real = loginid && !/^(VRT|VRW)/.test(loginid);
    
    // is_production: True if on your new domain charlohfx.site
    const is_production = isProduction();

    // 4. The Decision Logic
    // Use Green if: User has Real Account OR User is on your Production Website
    // Use Blue if: User is on Localhost/Staging AND has no Real Account
    const server = is_real || is_production ? 'green' : 'blue';
    const server_url = `${server}.derivws.com`;

    // [DEBUG] Log why we picked this server
    console.log('[DEBUG] getSocketURL Decision:', {
        loginid,
        is_real_account: is_real,
        is_production_domain: is_production,
        result_server: server
    });

    return server_url;
};

export const checkAndSetEndpointFromUrl = () => {
    if (isTestLink()) {
        const url_params = new URLSearchParams(location.search.slice(1));

        if (url_params.has('qa_server') && url_params.has('app_id')) {
            const qa_server = url_params.get('qa_server') || '';
            const app_id = url_params.get('app_id') || '';

            url_params.delete('qa_server');
            url_params.delete('app_id');

            if (/^(^(www\.)?qa[0-9]{1,4}\.deriv.dev|(.*)\.derivws\.com)$/.test(qa_server) && /^[0-9]+$/.test(app_id)) {
                localStorage.setItem('config.app_id', app_id);
                localStorage.setItem('config.server_url', qa_server);
            }

            const params = url_params.toString();
            const hash = location.hash;

            location.href = `${location.protocol}//${location.hostname}${location.pathname}${
                params ? `?${params}` : ''
            }${hash || ''}`;

            return true;
        }
    }

    return false;
};

export const getDebugServiceWorker = () => {
    const debug_service_worker_flag = window.localStorage.getItem('debug_service_worker');
    if (debug_service_worker_flag) return !!parseInt(debug_service_worker_flag);

    return false;
};