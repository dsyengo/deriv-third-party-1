import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { useIsHubRedirectionEnabled } from '@deriv/hooks';
import { platforms, routes } from '@deriv/shared';
import { observer, useStore } from '@deriv/stores';
import { useDevice } from '@deriv-com/ui';

import { AccountsInfoLoader } from 'App/Components/Layout/Header/Components/Preloader';
import ToggleMenuDrawer from 'App/Components/Layout/Header/toggle-menu-drawer.jsx';
// REMOVED: ToggleMenuDrawerAccountsOS import (No longer used)
import platform_config from 'App/Constants/platform-config';
import CurrencySelectionModal from 'App/Containers/CurrencySelectionModal';
import NewVersionNotification from 'App/Containers/new-version-notification.jsx';
import RealAccountSignup from 'App/Containers/RealAccountSignup';
import SetAccountCurrencyModal from 'App/Containers/SetAccountCurrencyModal';

import DerivShortLogo from './deriv-short-logo';
import HeaderAccountActions from './header-account-actions';
import ContactUsModal from './contact-us-modal';
import RefreshButton from './refresh-button';

const HeaderLegacy = observer(() => {
    const { client, common, ui, notifications, traders_hub } = useStore();
    const {
        currency,
        has_any_real_account,
        is_logged_in,
        is_logging_in,
        is_single_logging_in,
        is_virtual,
        is_switching,
        is_client_store_initialized,
        // Removed: is_bot_allowed, is_dxtrade_allowed, etc. (Not used for filtering anymore if simplified)
        // Kept needed ones for filterPlatformsForClients
        is_bot_allowed,
        is_dxtrade_allowed,
        is_mt5_allowed,
    } = client;
    const { platform } = common; // Removed is_from_tradershub_os
    const { header_extension, is_app_disabled, is_route_modal_on, toggleReadyToDepositModal, is_real_acc_signup_on } = ui;
    const { addNotificationMessage, client_notifications, removeNotificationMessage } = notifications;
    const { modal_data } = traders_hub;
    const { isHubRedirectionEnabled, isHubRedirectionLoaded } = useIsHubRedirectionEnabled();

    const { isDesktop } = useDevice();
    const history = useHistory();
    const { pathname } = useLocation();

    // State for Contact Modal
    const [is_contact_open, setContactOpen] = React.useState(false);

    const traders_hub_routes =
        [routes.traders_hub].includes(pathname) ||
        [routes.account, routes.settings, routes.wallets_compare_accounts, routes.compare_cfds].some(route =>
            pathname.startsWith(route)
        );

    const addUpdateNotification = () => addNotificationMessage(client_notifications?.new_version_available);
    const removeUpdateNotification = React.useCallback(
        () => removeNotificationMessage({ key: 'new_version_available' }),
        [removeNotificationMessage]
    );

    React.useEffect(() => {
        document.addEventListener('IgnorePWAUpdate', removeUpdateNotification);
        return () => document.removeEventListener('IgnorePWAUpdate', removeUpdateNotification);
    }, [removeUpdateNotification]);

    const handleClickCashier = () => {
        if (!has_any_real_account && is_virtual) {
            toggleReadyToDepositModal();
        } else {
            history.push(routes.cashier_deposit);
        }
    };

    const filterPlatformsForClients = (payload) =>
        payload.filter(config => {
            if (config.link_to === routes.mt5) {
                return !is_logged_in || is_mt5_allowed;
            }
            if (config.link_to === routes.dxtrade) {
                return is_dxtrade_allowed;
            }
            if (config.link_to === routes.bot || config.href === routes.smarttrader) {
                return is_bot_allowed;
            }
            return true;
        });

    const excludedRoutes = [
        routes.trade,
        routes.trader_positions,
        routes.complaints_policy,
        routes.endpoint,
        routes.redirect,
        routes.index,
        routes.error404,
        routes.reports,
        routes.positions,
        routes.profit,
        routes.statement,
        '/contract',
    ];

    const isExcludedRoute = excludedRoutes.some(route => window.location.pathname.includes(route));

    // GUARD: Only hide if store is not ready. Removed Wallet/Hub logic.
    if (!is_client_store_initialized && !isExcludedRoute) {
        return null;
    }

    return (
        <header
            className={classNames('header', {
                'header--is-disabled': is_app_disabled || is_route_modal_on,
                // REMOVED: 'header--is-hidden' logic
                // REMOVED: 'tradershub_os' classes
            })}
        >
            <div className='header__menu-items'>
                <div className='header__menu-left'>
                    {isDesktop ? (
                        <React.Fragment>
                            <DerivShortLogo />
                            <div className='header__divider' />
                            {/* Desktop Custom Buttons */}
                            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '8px', gap: '8px' }}>
                                {/* Note: Assuming Button is imported or available globally if this snippet is partial. 
                                    If not, ensure import { Button } from '@deriv/components' is present. 
                                    Re-using logic from previous steps: */}
                                <button 
                                    className="dc-btn dc-btn--tertiary dc-btn--small"
                                    onClick={() => setContactOpen(true)}
                                    style={{ border: '1px solid var(--border-normal)', background: 'transparent' }}
                                >
                                    <span className="dc-text dc-text--bold">Contact</span>
                                </button>
                                <RefreshButton />
                            </div>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {/* MOBILE: UNIFIED MENU */}
                            {/* We always use the standard ToggleMenuDrawer, ignoring the OS check */}
                            <ToggleMenuDrawer platform_config={filterPlatformsForClients(platform_config)} />
                            
                            <DerivShortLogo />
                            
                            {header_extension && is_logged_in && (
                                <div className='header__menu-left-extensions'>{header_extension}</div>
                            )}
                        </React.Fragment>
                    )}
                </div>

                <div
                    className={classNames('header__menu-right', {
                        'header__menu-right--hidden': !isDesktop && is_logging_in,
                    })}
                >
                    {is_logging_in || is_single_logging_in || is_switching ? (
                        <div
                            id='dt_core_header_acc-info-preloader'
                            className={classNames('acc-info__preloader', {
                                'acc-info__preloader--no-currency': !currency,
                            })}
                        >
                            <AccountsInfoLoader
                                is_logged_in={is_logged_in}
                                is_desktop={isDesktop}
                                speed={3}
                                is_traders_hub_routes={traders_hub_routes}
                            />
                        </div>
                    ) : (
                        // FIX: Unconditional Render for Right Side
                        <HeaderAccountActions
                            // onClickDeposit={handleClickCashier} // Deposit hidden
                            is_traders_hub_routes={traders_hub_routes}
                        />
                    )}
                </div>
            </div>
            
            <ContactUsModal is_open={is_contact_open} toggleModal={() => setContactOpen(false)} />
            
            {is_real_acc_signup_on && <RealAccountSignup />}
            <SetAccountCurrencyModal />
            <CurrencySelectionModal is_visible={modal_data.active_modal === 'currency_selection'} />
            <NewVersionNotification onUpdate={addUpdateNotification} />
        </header>
    );
});

export default HeaderLegacy;