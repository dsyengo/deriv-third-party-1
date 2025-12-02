import classNames from 'classnames';
import * as React from 'react';
import { withRouter } from 'react-router';

// -----------------------------------------------------------------------------
// [INSTRUCTION]: UNCOMMENT THESE IMPORTS IN YOUR LOCAL PROJECT
// -----------------------------------------------------------------------------
import NetworkStatus, {
    AccountLimits as AccountLimitsFooter,
    EndpointNote,
    HelpCentre,
    RegulatoryInformation,
    ResponsibleTrading,
    ToggleFullScreen,
    ToggleSettings,
    ToggleLanguageSettings,
} from 'App/Components/Layout/Footer';
import LiveChat from 'App/Components/Elements/LiveChat';
import WhatsApp from 'App/Components/Elements/WhatsApp/index';
import ServerTime from '../server-time.jsx';
import { observer, useStore } from '@deriv/stores';
import { useRemoteConfig } from '@deriv/api';
import { Button, Modal, Text } from '@deriv/components';
import { Localize } from '@deriv/translations';



// --- CUSTOM RISK DISCLAIMER MODAL ---
const RiskDisclaimerModal = ({ is_open, toggleModal }) => (
    <Modal is_open={is_open} toggleModal={toggleModal} title="Risk Disclaimer & Advice" width="600px">
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
                <Button has_effect text="I Understand" onClick={toggleModal} primary large />
            </div>
        </div>
    </Modal>
);

const FooterIconSeparator = () => <div className='footer-icon-separator' style={{ width: '1px', height: '16px', background: '#ccc', margin: '0 8px' }} />;

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

const Footer = observer(() => {
    const { client, common, ui, traders_hub } = useStore();
    const { is_logged_in, landing_company_shortcode, is_eu, is_virtual } = client;
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
    } = ui;
    const { data } = useRemoteConfig(true);
    const { cs_chat_livechat, cs_chat_whatsapp } = data;
    const { show_eu_related_content } = traders_hub;

    // State for Risk Modal
    const [is_risk_modal_open, setRiskModalOpen] = React.useState(false);

    let footer_extensions_left = [];
    let footer_extensions_right = [];
    if (footer_extensions.filter) {
        footer_extensions_left = footer_extensions.filter((footer_extension) => footer_extension.position === 'left');
        footer_extensions_right = footer_extensions.filter((footer_extension) => footer_extension.position === 'right');
    }

    return (
        <footer
            className={classNames('footer', {
                'footer--is-disabled': is_app_disabled || is_route_modal_on,
            })}
            style={{ padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee' }}
        >
            {footer_extensions_left.length > 0 && (
                <div className='footer__links footer__links--left'>
                    {footer_extensions_left.map(FooterExtensionRenderer)}
                </div>
            )}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <EndpointNote />
                <NetworkStatus />
                <ServerTime />
            </div>
            
            <div className='footer__links' style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                {footer_extensions_right.map(FooterExtensionRenderer)}
                {cs_chat_whatsapp && <WhatsApp />}
                {cs_chat_livechat && <LiveChat />}
                <FooterIconSeparator />
                <ResponsibleTrading />
                
                {/* --- RISK DISCLAIMER BUTTON --- */}
                <FooterIconSeparator />
                <div 
                    className="footer__link" 
                    onClick={() => setRiskModalOpen(true)}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') setRiskModalOpen(true); }}
                >
                    <Text size="xs" weight="bold" title="View Risk Warning">
                        <Localize i18n_default_text="Risk Disclaimer" />
                    </Text>
                </div>
                {/* ----------------------------- */}

                {is_logged_in && <AccountLimitsFooter />}
                {is_logged_in && !is_virtual && (
                    <RegulatoryInformation
                        landing_company={landing_company_shortcode}
                        is_eu={is_eu}
                        show_eu_related_content={show_eu_related_content}
                    />
                )}
                <FooterIconSeparator />
                <HelpCentre />
                <ToggleSettings
                    is_settings_visible={is_settings_modal_on}
                    toggleSettings={toggleSettingsModal}
                    disableApp={disableApp}
                    enableApp={enableApp}
                    settings_extension={settings_extension}
                />
                <ToggleLanguageSettings
                    is_settings_visible={is_language_settings_modal_on}
                    toggleSettings={toggleLanguageSettingsModal}
                    lang={current_language}
                />
                <ToggleFullScreen />
            </div>

            {/* Render the Modal */}
            <RiskDisclaimerModal is_open={is_risk_modal_open} toggleModal={() => setRiskModalOpen(false)} />
        </footer>
    );
});

export default withRouter(Footer);