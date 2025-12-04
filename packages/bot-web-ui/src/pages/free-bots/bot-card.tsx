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
        <div className="bot-card">
            <div className="bot-card__header">
                <div className="bot-card__icon-wrapper">
                    <Icon icon="IcBot" size={32} />
                </div>
                <div className="bot-card__info">
                    <div className="bot-card__title">
                        {bot.name}
                    </div>
                    <div className="bot-card__rating">
                        {/* Using theme variables for star colors */}
                        {[...Array(5)].map((_, i) => (
                            <Icon 
                                key={i} 
                                icon="IcStar" 
                                size={12} 
                                color={i < Math.floor(bot.rating) ? "var(--brand-orange)" : "var(--text-disabled)"} 
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="bot-card__description">
                {bot.description}
            </div>

            <div className="bot-card__actions">
                {/* FIX: Localize moved from 'text' prop to children to prevent crash */}
                <Button 
                    secondary 
                    has_effect 
                    onClick={() => onView(bot)}
                    type="button"
                >
                    <Localize i18n_default_text="Details" />
                </Button>
                
                <Button 
                    primary 
                    has_effect 
                    onClick={() => onLoad(bot)}
                    type="button" 
                >
                    <Localize i18n_default_text="Load Bot" />
                </Button>
            </div>
        </div>
    );
};

export default BotCard;