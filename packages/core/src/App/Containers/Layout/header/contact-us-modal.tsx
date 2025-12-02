import React from 'react';
import { Button, Icon, Modal, Text } from '@deriv/components';
import { Localize } from '@deriv/translations';

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
        <Modal is_open={is_open} toggleModal={toggleModal} title="Contact Support" width="400px">
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
                    <Button has_effect text="Close" onClick={toggleModal} secondary large />
                </div>
            </div>
        </Modal>
    );
};

export default ContactUsModal;