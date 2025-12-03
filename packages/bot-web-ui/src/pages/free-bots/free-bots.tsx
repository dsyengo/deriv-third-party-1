import React, { useState } from 'react';
import { Text } from '@deriv/components';
import { Localize, localize } from '@deriv/translations';
import { observer } from 'mobx-react';
// FIX 1: Import useStore correctly
import { useStore } from '@deriv/stores'; 
// FIX 2: If there is a specific local hook, it is usually imported like this:
// import { useDBotStore } from 'Stores/useDBotStore'; <--- Check if this path exists locally
// If not, we use the root store.

import { DBOT_TABS } from 'Constants/bot-contents';
import { FREE_BOTS_LIST, TFreeBot } from 'Constants/free-bots-config';
import { loadBotFromUrl } from '../../utils/bot-loader';
import BotCard from './bot-card';
import BotDetailsModal from './bot-details-modal';

const FreeBots = observer(() => {
    const [selectedBot, setSelectedBot] = useState<TFreeBot | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // FIX 3: Access the dashboard store correctly
    // If useDBotStore is not available globally, try accessing via root store
    const rootStore = useStore();
    // In many Deriv apps, the Bot store is injected or available via a specific hook.
    // If 'dashboard' is inside rootStore.modules.bot or similar, we access it there.
    // However, based on app-wrapper, let's assume we need to pass the tab change handler 
    // OR find the correct local store path.
    
    // SAFE FALLBACK: If we can't find the store, we use window dispatch or a prop.
    // But assuming standard MobX architecture:
    // @ts-ignore (Temporary ignore to let you verify the store structure)
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
            // Switch Tab
            if (setActiveTab) {
                setActiveTab(DBOT_TABS.BOT_BUILDER);
            } else {
                console.warn("Could not switch tab automatically. Please click 'Bot Builder'.");
            }
        } else {
            alert(result.error);
        }
    };

    return (
        <div className="free-bots-page" style={{ 
            padding: '24px', 
            height: 'calc(100% - 40px)', 
            overflowY: 'auto',
            backgroundColor: 'var(--general-main-1)' 
        }}>
            {isLoading && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', zIndex: 9999,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                }}>
                    <Text color="colored-background" weight="bold" size="m">Loading Strategy...</Text>
                </div>
            )}

            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
                <Text as="h1" size="l" weight="bold" color="prominent" style={{ marginBottom: '8px' }}>
                    <Localize i18n_default_text="Free Trading Bots" />
                </Text>
                <Text as="p" size="s" color="general">
                    <Localize i18n_default_text="Browse and load verified automated strategies instantly." />
                </Text>
            </div>

            <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '24px', 
                justifyContent: 'center',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
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