import React, { useState } from 'react';
import { Text } from '@deriv/components';
import { Localize, localize } from '@deriv/translations';
import { observer } from 'mobx-react-lite';
import { useStore } from '@deriv/stores';
import { DBOT_TABS } from 'Constants/bot-contents';
import { FREE_BOTS_LIST, TFreeBot } from 'Constants/free-bots-config';
import { loadBotFromUrl } from '../../utils/bot-loader';
import BotCard from './bot-card';
import BotDetailsModal from './bot-details-modal';

// IMPORT THE SCSS FILE
import './free-bots.scss'; 

const FreeBots = observer(() => {
    const [selectedBot, setSelectedBot] = useState<TFreeBot | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const rootStore = useStore();
    // @ts-ignore 
    const { dashboard } = rootStore?.modules?.bot || rootStore; 
    const { setActiveTab } = dashboard || {};

    const handleViewBot = (bot: TFreeBot) => {
        setSelectedBot(bot);
        setIsModalOpen(true);
    };

    const handleLoadBot = async (bot: TFreeBot) => {
        const confirmLoad = window.confirm(
            localize("Loading this bot will overwrite your current workspace blocks. Are you sure?")
        );
        if (!confirmLoad) return;

        setIsLoading(true);
        const result = await loadBotFromUrl(bot.xmlPath);
        setIsLoading(false);

        if (result.success) {
            setIsModalOpen(false);
            if (setActiveTab) {
                setActiveTab(DBOT_TABS.BOT_BUILDER);
            }
        } else {
            alert(result.error);
        }
    };

    return (
        <div className="free-bots">
            {isLoading && (
                <div className="free-bots__loader" style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', zIndex: 9999,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                }}>
                    <Text color="colored-background" weight="bold" size="m">Loading Strategy...</Text>
                </div>
            )}

            <div className="free-bots__header">
                <div className="free-bots__header-title">
                    <Localize i18n_default_text="Free Trading Bots" />
                </div>
                <div className="free-bots__header-subtitle">
                    <Localize i18n_default_text="Browse and load verified automated strategies instantly." />
                </div>
            </div>

            <div className="free-bots__grid">
                {FREE_BOTS_LIST.map(bot => (
                    <BotCard 
                        key={bot.id} 
                        bot={bot} 
                        onView={handleViewBot} 
                        onLoad={handleLoadBot} 
                    />
                ))}
            </div>

            <BotDetailsModal 
                is_open={isModalOpen} 
                toggleModal={() => setIsModalOpen(false)} 
                bot={selectedBot} 
                onLoad={handleLoadBot}
            />
        </div>
    );
});

export default FreeBots;