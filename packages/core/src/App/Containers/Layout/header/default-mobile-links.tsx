import React from 'react';
import { useAccountSettingsRedirect } from '@deriv/hooks';
import { Icon } from '@deriv/components';
import { observer, useStore } from '@deriv/stores';
import ShowNotifications from './show-notifications';

const DefaultMobileLinks = observer(() => {
    // 1. Access UI Store for Dark Mode
    const { ui } = useStore();
    const { is_dark_mode_on, setDarkMode } = ui;

    const { redirect_url } = useAccountSettingsRedirect();

    return (
        <React.Fragment>
            {/* 2. Theme Toggle Button (Added) */}
            <div 
                className='traders-hub-header__menu-right--items--theme-toggle'
                onClick={() => setDarkMode(!is_dark_mode_on)}
                style={{ marginRight: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
                {/* Shows a Moon if light (to switch to dark), Sun if dark (to switch to light) */}
                <Icon 
                    icon={is_dark_mode_on ? 'IcThemeLight' : 'IcThemeDark'} 
                    size={20} 
                />
            </div>

            {/* 3. Notifications */}
            <div className='traders-hub-header__menu-right--items--notifications'>
                <ShowNotifications />
            </div>

            {/* 4. Profile / Settings */}
            <a className='traders-hub-header__setting' href={redirect_url}>
                <Icon icon='IcUserOutline' size={20} />
            </a>
        </React.Fragment>
    );
});

DefaultMobileLinks.displayName = 'DefaultMobileLinks';

export default DefaultMobileLinks;