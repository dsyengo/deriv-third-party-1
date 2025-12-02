import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { useIsHubRedirectionEnabled } from '@deriv/hooks';
import { platforms, routes } from '@deriv/shared';
import { observer, useStore } from '@deriv/stores';
import { useDevice } from '@deriv-com/ui';

import { AccountsInfoLoader } from 'App/Components/Layout/Header/Components/Preloader';
import CurrencySelectionModal from 'App/Containers/CurrencySelectionModal';
import NewVersionNotification from 'App/Containers/new-version-notification.jsx';
import RealAccountSignup from 'App/Containers/RealAccountSignup';
import SetAccountCurrencyModal from 'App/Containers/SetAccountCurrencyModal';

import DerivShortLogo from './deriv-short-logo';
import HeaderAccountActions from './header-account-actions';

const HeaderLegacy = observer(() => {
    const { client, common, ui, notifications, traders_hub } = useStore();
    const {
        currency,
        has_any_real_account,
        has_wallet,
        is_logged_in,
        is_logging_in,
        is_single_logging_in,
        is_virtual,
        is_switching,
        is_client_store_initialized,
    } = client;
    const { platform, is_from_tradershub_os } = common;
    const { header_extension, is_app_disabled, is_route_modal_on, toggleReadyToDepositModal, is_real_acc_signup_on } =
        ui;
    const { addNotificationMessage, client_notifications, removeNotificationMessage } = notifications;
    const { modal_data } = traders_hub;
    const { isHubRedirectionEnabled, isHubRedirectionLoaded } = useIsHubRedirectionEnabled();

    const { isDesktop } = useDevice();

    const history = useHistory();
    const { pathname } = useLocation();

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
        /** because contract route has dynamic id */
        '/contract',
    ];

    const isExcludedRoute = excludedRoutes.some(route => window.location.pathname.includes(route));

    if (
        (!is_client_store_initialized && !isExcludedRoute) ||
        (has_wallet && !isHubRedirectionLoaded && !isExcludedRoute) ||
        (has_wallet && isHubRedirectionLoaded && !isExcludedRoute && isHubRedirectionEnabled)
    ) {
        return null;
    }

    return (
        <header
            className={classNames('header', {
                'header--is-disabled': is_app_disabled || is_route_modal_on,
                'header--is-hidden': platforms[platform] && !is_from_tradershub_os,
                'header--tradershub_os_mobile': is_logged_in && is_from_tradershub_os && !isDesktop,
                'header--tradershub_os_desktop': is_logged_in && is_from_tradershub_os && isDesktop,
            })}
        >
            <div className='header__menu-items'>
                <div className='header__menu-left'>
                    {/* REMOVED:
                        - ToggleMenuDrawer (Mobile Hamburger)
                        - TradersHubHomeButton
                        - MenuLinks (Navigation)
                        - PlatformSwitcher (Dropdown)
                    */}
                    
                    {/* Always show just the Logo */}
                    <DerivShortLogo />
                    
                    {/* If there are specific header extensions (plugins), keep them, otherwise this area is clean */}
                    {!isDesktop && header_extension && is_logged_in && (
                        <div className='header__menu-left-extensions'>{header_extension}</div>
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
                        !is_from_tradershub_os && (
                            <HeaderAccountActions
                                onClickDeposit={handleClickCashier}
                                is_traders_hub_routes={traders_hub_routes}
                            />
                        )
                    )}
                </div>
            </div>
            {is_real_acc_signup_on && <RealAccountSignup />}
            <SetAccountCurrencyModal />
            <CurrencySelectionModal is_visible={modal_data.active_modal === 'currency_selection'} />
            <NewVersionNotification onUpdate={addUpdateNotification} />
        </header>
    );
});

export default HeaderLegacy;