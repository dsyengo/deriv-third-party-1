import React from 'react';
import { Modal, Button, Text, Icon } from '@deriv/components';
import { Localize } from '@deriv/translations';
import { TFreeBot } from 'Constants/free-bots-config';

type TBotDetailsModalProps = {
    is_open: boolean;
    toggleModal: () => void;
    bot: TFreeBot | null;
    onLoad: (bot: TFreeBot) => void;
};

const BotDetailsModal = ({ is_open, toggleModal, bot, onLoad }: TBotDetailsModalProps) => {
    if (!bot) return null;

    return (
        <Modal is_open={is_open} toggleModal={toggleModal} title={bot.name} width="600px">
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* 1. KEY FEATURES LIST */}
                <div>
                    <Text as="h4" weight="bold" size="s" color="prominent" style={{ marginBottom: '10px' }}>
                        <Localize i18n_default_text="Key Bot Features:" />
                    </Text>
                    <ul style={{ paddingLeft: '0', margin: 0, listStyleType: 'none' }}>
                        {bot.features && bot.features.map((feature, index) => (
                            <li key={index} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
                                <Icon 
                                    icon="IcCheckmarkCircle" 
                                    size={16} 
                                    color="var(--status-success)" 
                                    style={{ marginRight: '8px', marginTop: '2px', flexShrink: 0 }} 
                                />
                                <Text size="xs" color="general">{feature}</Text>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 2. OPERATIONAL WARNING */}
                <div style={{ 
                    padding: '12px', 
                    borderRadius: '8px', 
                    backgroundColor: 'var(--status-warning-transparent)', 
                    border: '1px solid var(--status-warning)' 
                }}>
                     <Text as="p" size="xs" weight="bold" color="var(--status-warning-dark)">
                        <Localize i18n_default_text="❗ ACTION REQUIRED: This bot has no automatic entry point. You must analyze the market and click RUN manually when conditions are optimal." />
                    </Text>
                </div>
                
                {/* 3. TUTORIAL LINK */}
                {bot.youtubeVideoId && (
                    <a 
                        href={`https://www.youtube.com/watch?v=${bot.youtubeVideoId}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--brand-blue)' }}
                    >
                        <Icon icon="IcPlayOutline" size={18} color="var(--brand-blue)" />
                        <Text size="xs" weight="bold">
                            <Localize i18n_default_text="Watch Full Tutorial Video" />
                        </Text>
                    </a>
                )}

                {/* Action Bar */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    gap: '10px',
                    borderTop: '1px solid var(--border-normal)',
                    paddingTop: '16px'
                }}>
                    {/* FIX: Localize moved to children */}
                    <Button 
                        has_effect 
                        onClick={toggleModal} 
                        secondary 
                        type="button" 
                    >
                        <Localize i18n_default_text="Close" />
                    </Button>
                    
                    {/* FIX: Localize moved to children */}
                    <Button 
                        has_effect 
                        onClick={() => {
                            onLoad(bot);
                            toggleModal();
                        }} 
                        primary 
                        type="button"
                    >
                        <Localize i18n_default_text="Load This Bot" />
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default BotDetailsModal;