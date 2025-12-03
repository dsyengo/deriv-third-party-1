import React, { useState } from 'react';
import { Button, Icon, Modal, Text, StaticUrl } from '@deriv/components';
import { Localize } from '@deriv/translations';
import DerivBrandShortLogo from 'Assets/SvgComponents/header/site-logo.svg';

// --- Helper Components for Modal ---

type TSocialLinkProps = {
    icon: string;
    text: string;
    href: string;
    color?: string;
};

const SocialLink = ({ icon, text, href, color = 'var(--text-prominent)' }: TSocialLinkProps) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            padding: '12px',
            border: '1px solid var(--border-normal)',
            borderRadius: '8px',
            marginBottom: '8px',
            transition: 'background-color 0.2s',
            cursor: 'pointer',
        }}
    >
        <Icon icon={icon} size={24} />
        <Text size="xs" weight="bold" style={{ color }}>
            {text}
        </Text>
        <Icon icon="IcChevronRight" size={16} style={{ marginLeft: 'auto' }} />
    </a>
);

type TContactUsModalProps = {
    is_open: boolean;
    toggleModal: () => void;
};

const ContactUsModal = ({ is_open, toggleModal }: TContactUsModalProps) => {
    return (
        <Modal 
            is_open={is_open} 
            toggleModal={toggleModal} 
            // MODAL TITLE: Using Icon as requested
            title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon icon="IcLiveChat" size={24} color="var(--text-prominent)" />
                </div>
            }
            width="400px"
        >
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
                <Text as="p" size="xs" style={{ marginBottom: '16px' }}>
                    <Localize i18n_default_text="Reach out to us on any of these platforms:" />
                </Text>

                {/* Social Links */}
                <SocialLink icon="IcWhatsapp" text="WhatsApp" href="https://wa.me/254700000000" />
                <SocialLink icon="IcTelegram" text="Telegram" href="https://t.me/MrCharlohFX" />
                <SocialLink icon="IcEmail" text="Email Support" href="mailto:support@mrcharlohfx.site" />
                <SocialLink icon="IcTwitter" text="Twitter / X" href="https://twitter.com/MrCharlohFX" />

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                    {/* CRITICAL FIX: type="button" prevents the crash/blank screen */}
                    <Button 
                        has_effect 
                        text={<Localize i18n_default_text="Close" />} 
                        onClick={toggleModal} 
                        secondary 
                        large 
                        type="button" 
                    />
                </div>
            </div>
        </Modal>
    );
};

// --- Main Component: DerivShortLogo ---

const DerivShortLogo = () => {
    // State management for the contact modal
    const [is_modal_open, setIsModalOpen] = useState(false);
    const toggleModal = () => setIsModalOpen(!is_modal_open);

    return (
        <div className='header__menu-left-logo' style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            
            {/* Logo and Name Link */}
            <StaticUrl 
                href='/' 
                className='header__logo-link' 
                style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    textDecoration: 'none', 
                    gap: '8px' 
                }}
            >
                {/* Logo Wrapper */}
                <span style={{ display: 'flex', color: 'var(--brand-red-coral)' }}>
                    <DerivBrandShortLogo 
                        style={{ 
                            fill: 'currentColor', 
                            width: '24px', 
                            height: '24px' 
                        }} 
                    />
                </span>
                
                {/* MrCharlohFX Text */}
                <span style={{ 
                    color: 'var(--brand-red-coral)', 
                    fontWeight: 'bold', 
                    fontSize: '1.6rem',
                    lineHeight: '1.2',
                    whiteSpace: 'nowrap'
                }}>
                    MrCharlohFX
                </span>
            </StaticUrl>

            {/* MESSAGE ICON TRIGGER */}
            <div 
                onClick={toggleModal}
                style={{ 
                    cursor: 'pointer', 
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                title="Contact Support" 
            >
                {/* Dark Blue Message Icon (Size 30) */}
                <Icon 
                    icon='IcMessage' 
                    size={30} 
                    color='#101928' 
                />
            </div>

            {/* The Contact Modal Component */}
            <ContactUsModal 
                is_open={is_modal_open} 
                toggleModal={toggleModal} 
            />
        </div>
    );
};

export default DerivShortLogo;