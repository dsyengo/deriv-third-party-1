import React from 'react';
import { Modal, Button, Text } from '@deriv/components';
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
                
                {/* Optional YouTube Embed */}
                {bot.youtubeVideoId && (
                    <div style={{ 
                        position: 'relative', 
                        paddingBottom: '56.25%', // 16:9 Aspect Ratio 
                        height: 0, 
                        overflow: 'hidden',
                        borderRadius: '8px',
                        backgroundColor: 'var(--general-section-1)'
                    }}>
                        <iframe 
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                            src={`https://www.youtube.com/embed/${bot.youtubeVideoId}`}
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                    </div>
                )}

                {/* Description */}
                <div>
                    <Text as="h4" weight="bold" size="xs" color="prominent" style={{ marginBottom: '8px' }}>
                        <Localize i18n_default_text="Strategy Details" />
                    </Text>
                    <Text as="p" size="xs" lineHeight="m" align="justify" color="general">
                        {bot.details}
                    </Text>
                </div>

                {/* Action Bar */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    gap: '10px',
                    borderTop: '1px solid var(--border-normal)',
                    paddingTop: '16px'
                }}>
                    <Button has_effect text={<Localize i18n_default_text="Close" />} onClick={toggleModal} secondary />
                    <Button 
                        has_effect 
                        text={<Localize i18n_default_text="Load This Bot" />} 
                        onClick={() => {
                            onLoad(bot);
                            toggleModal();
                        }} 
                        primary 
                    />
                </div>
            </div>
        </Modal>
    );
};

export default BotDetailsModal;