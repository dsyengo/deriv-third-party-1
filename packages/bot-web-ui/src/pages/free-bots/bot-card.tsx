import React from 'react';
import { Text, Button, Icon } from '@deriv/components';
import { Localize } from '@deriv/translations';
import { TFreeBot } from 'Constants/free-bots-config';

type TBotCardProps = {
    bot: TFreeBot;
    onView: (bot: TFreeBot) => void;
    onLoad: (bot: TFreeBot) => void;
};

const BotCard = ({ bot, onView, onLoad }: TBotCardProps) => {
    return (
        <div style={{
            border: '1px solid var(--border-normal)',
            borderRadius: '8px',
            padding: '16px',
            backgroundColor: 'var(--general-section-1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            minWidth: '280px',
            maxWidth: '350px',
            flex: '1 1 300px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                    padding: '8px', 
                    borderRadius: '50%', 
                    background: 'var(--general-main-2)',
                    border: '1px solid var(--border-normal)'
                }}>
                    <Icon icon="IcBot" size={32} />
                </div>
                <div>
                    <Text weight="bold" size="s" color="prominent" lineHeight="m">
                        {bot.name}
                    </Text>
                    <div style={{ display: 'flex', gap: '2px', marginTop: '2px' }}>
                        {[...Array(5)].map((_, i) => (
                            <Icon 
                                key={i} 
                                icon="IcStar" 
                                size={12} 
                                color={i < Math.floor(bot.rating) ? "orange" : "disabled"} 
                            />
                        ))}
                    </div>
                </div>
            </div>

            <Text size="xs" lineHeight="m" color="general" style={{ flexGrow: 1 }}>
                {bot.description}
            </Text>

            {/* FIXED BUTTONS: Passing content as children */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <Button 
                    secondary 
                    has_effect 
                    onClick={() => onView(bot)}
                    width="100%"
                >
                    <Localize i18n_default_text="Details" />
                </Button>
                
                <Button 
                    primary 
                    has_effect 
                    onClick={() => onLoad(bot)}
                    width="100%"
                >
                    <Localize i18n_default_text="Load Bot" />
                </Button>
            </div>
        </div>
    );
};

export default BotCard;