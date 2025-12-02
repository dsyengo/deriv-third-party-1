import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react'; 
import { withRouter } from 'react-router';
import NetworkStatus, {
    AccountLimits as AccountLimitsFooter,
    EndpointNote,
    HelpCentre,
    RegulatoryInformation,
    ResponsibleTrading,
    ToggleSettings,
    ToggleFullScreen,
    ToggleLanguageSettings,
} from 'App/Components/Layout/Footer';
import LiveChat from 'App/Components/Elements/LiveChat';
import WhatsApp from 'App/Components/Elements/WhatsApp/index.ts';
import ServerTime from '../server-time.jsx';
import { routes, isTabletOs } from '@deriv/shared';
import { observer, useStore } from '@deriv/stores';
import DarkModeToggleIcon from 'Assets/SvgComponents/footer/ic-footer-light-theme.svg';
import LightModeToggleIcon from 'Assets/SvgComponents/footer/ic-footer-dark-theme.svg';
import { Popover, Icon, Modal, Text, Button } from '@deriv/components'; 
import { localize, Localize } from '@deriv/translations'; 
import { useRemoteConfig } from '@deriv/api';

// ----------------------------------------------------------------------
// 1. RISK DISCLAIMER MODAL DEFINITION
// ----------------------------------------------------------------------

const RiskDisclaimerModal = ({ is_open, toggleModal }) => (
    <Modal is_open={is_open} toggleModal={toggleModal} title={<Localize i18n_default_text="Risk Disclaimer & Advice" />} width="600px">
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Text as="p" size="s" weight="bold" color="loss-danger">
                <Localize i18n_default_text="Risk Warning:" />
            </Text>
            <Text as="p" size="xs" color="prominent" align="justify">
                <Localize i18n_default_text="Trading financial products on margin carries a high degree of risk and is not suitable for all investors. Losses can exceed the initial investment. The high degree of leverage can work against you as well as for you." />
            </Text>
            
            <div style={{ height: '1px', backgroundColor: 'var(--general-section-1)', margin: '8px 0' }} />

            <Text as="p" size="s" weight="bold" color="prominent">
                <Localize i18n_default_text="Our Advice:" />
            </Text>
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
                <li style={{ marginBottom: '8px' }}>
                    <Text as="p" size="xs" color="general">
                        <Localize i18n_default_text="Never trade with money you cannot afford to lose." />
                    </Text>
                </li>
                <li style={{ marginBottom: '8px' }}>
                    <Text as="p" size="xs" color="general">
                        <Localize i18n_default_text="Start with a demo account to understand market dynamics before investing real funds." />
                    </Text>
                </li>
                <li>
                    <Text as="p" size="xs" color="general">
                        <Localize i18n_default_text="Educate yourself continuously and consider seeking advice from an independent financial advisor." />
                    </Text>
                </li>
            </ul>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <Button has_effect text={<Localize i18n_default_text="I Understand" />} onClick={toggleModal} primary large />
            </div>
        </div>
    </Modal>
);

// ----------------------------------------------------------------------
// 2. RISK DISCLAIMER TRIGGER COMPONENT
// ----------------------------------------------------------------------

type TRiskDisclaimerProps = {
    showPopover: boolean;
    toggleModal: () => void;
};

const RiskDisclaimer = ({ showPopover, toggleModal }: TRiskDisclaimerProps) => {
    const icon = (
        <div onClick={toggleModal} style={{ cursor: 'pointer' }}>
            {/* Assuming IcWarning is a defined Icon component */}
            <Icon icon='IcWarning' className='footer__icon' />
        </div>
    );
    return showPopover ? (
        <Popover alignment='top' message={localize('Risk Disclaimer')} zIndex={9999}>
            {icon}
        </Popover>
    ) : (
        icon
    );
};


const FooterIconSeparator = () => <div className='footer-icon-separator' />;

const FooterExtensionRenderer = (footer_extension, idx) => {
    const { Component: FooterExtensionComponent } = footer_extension;
    return (
        <React.Fragment key={`footer-link-${footer_extension.position}-${idx}`}>
            {footer_extension.has_left_separator && <FooterIconSeparator />}
            <FooterExtensionComponent />
            {footer_extension.has_right_separator && <FooterIconSeparator />}
        </React.Fragment>
    );
};

// ----------------------------------------------------------------------
// 3. TradingHubFooter (Modified for Left Placement)
// ----------------------------------------------------------------------

const TradingHubFooter = observer(() => {
    const { client, common, ui, traders_hub } = useStore();
    const { show_eu_related_content } = traders_hub;
    const { has_wallet, is_logged_in, is_eu, landing_company_shortcode, is_virtual } = client;
    const { current_language } = common;
    const {
        enableApp,
        footer_extensions,
        settings_extension,
        is_app_disabled,
        is_route_modal_on,
        is_settings_modal_on,
        is_language_settings_modal_on,
        disableApp,
        toggleSettingsModal,
        toggleLanguageSettingsModal,
        is_dark_mode_on: is_dark_mode,
        setDarkMode,
    } = ui;
    
    // State management for risk disclaimer modal
    const [is_risk_disclaimer_open, setIsRiskDisclaimerOpen] = useState(false);
    const toggleRiskDisclaimerModal = () => setIsRiskDisclaimerOpen(prev => !prev);


    let footer_extensions_left = [];
    let footer_extensions_right = [];
    if (footer_extensions.filter) {
        footer_extensions_left = footer_extensions.filter(footer_extension => footer_extension.position === 'left');
        footer_extensions_right = footer_extensions.filter(footer_extension => footer_extension.position === 'right');
    }

    const changeTheme = () => {
        setDarkMode(!is_dark_mode);
    };

    const location = window.location.pathname;
    const { data } = useRemoteConfig(true);
    const { cs_chat_livechat, cs_chat_whatsapp } = data;

    const showPopover = !isTabletOs;

    const modeIcon = is_dark_mode ? (
        <LightModeToggleIcon onClick={changeTheme} />
    ) : (
        <DarkModeToggleIcon onClick={changeTheme} />
    );

    return (
        <React.Fragment>
            <footer
                className={classNames('footer', {
                    'footer--is-disabled': is_app_disabled || is_route_modal_on,
                })}
            >
                {/* MODIFIED: Risk Disclaimer is placed on the left side */}
                <div className='footer__links footer__links--left'>
                    {/* NEW: Risk Disclaimer Trigger */}
                    <RiskDisclaimer showPopover={showPopover} toggleModal={toggleRiskDisclaimerModal} />
                    <FooterIconSeparator />
                    {/* Existing dynamic left extensions */}
                    {footer_extensions_left.map(FooterExtensionRenderer)}
                </div>

                <EndpointNote />
                <NetworkStatus />
                <FooterIconSeparator />
                <ServerTime />
                <FooterIconSeparator />
                
                {/* Right side links (UNCHANGED, except for removal of the old disclaimer placement) */}
                <div className='footer__links'>
                    {footer_extensions_right.map(FooterExtensionRenderer)}
                    {cs_chat_whatsapp && <WhatsApp showPopover={showPopover} />}
                    {cs_chat_livechat && <LiveChat showPopover={showPopover} />}
                    <ResponsibleTrading showPopover={showPopover} />
                    {is_logged_in && <AccountLimitsFooter showPopover={showPopover} />}
                    {is_logged_in && !is_virtual && (
                        <RegulatoryInformation
                            landing_company={landing_company_shortcode}
                            is_eu={is_eu}
                            show_eu_related_content={show_eu_related_content}
                            showPopover={showPopover}
                        />
                    )}
                    {!has_wallet && (
                        <div className='footer__links--dark-mode'>
                            {showPopover ? (
                                <Popover alignment='top' message={localize('Change theme')} zIndex={9999}>
                                    {modeIcon}
                                </Popover>
                            ) : (
                                modeIcon
                            )}
                        </div>
                    )}
                    <FooterIconSeparator />
                    <HelpCentre showPopover={showPopover} />
                    {location === routes.trade && (
                        <ToggleSettings
                            is_settings_visible={is_settings_modal_on}
                            toggleSettings={toggleSettingsModal}
                            disableApp={disableApp}
                            enableApp={enableApp}
                            settings_extension={settings_extension}
                            showPopover={showPopover}
                        />
                    )}
                    <ToggleLanguageSettings
                        is_settings_visible={is_language_settings_modal_on}
                        toggleSettings={toggleLanguageSettingsModal}
                        lang={current_language}
                        showPopover={showPopover}
                    />
                    <ToggleFullScreen showPopover={showPopover} />
                </div>
            </footer>
            
            {/* Modal remains outside the footer */}
            <RiskDisclaimerModal is_open={is_risk_disclaimer_open} toggleModal={toggleRiskDisclaimerModal} />
        </React.Fragment>
    );
});

TradingHubFooter.propTypes = {
    location: PropTypes.object,
};

export default withRouter(TradingHubFooter);