import React, { useState } from 'react';
import { Text } from '@deriv/components';
import { Localize, localize } from '@deriv/translations';
import { observer } from 'mobx-react-lite';
import { DBOT_TABS } from 'Constants/bot-contents';
import { FREE_BOTS_LIST, TFreeBot } from 'Constants/free-bots-config';
import { useDBotStore } from 'Stores/useDBotStore';
import { loadBotFromUrl } from '../../utils/bot-loader';
import BotCard from './bot-card';
import BotDetailsModal from './bot-details-modal';

// Import Styles
import './free-bots.scss'; 

const FreeBots = observer(() => {
    const [selectedBot, setSelectedBot] = useState<TFreeBot | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Access the specific Bot store directly (Cleaner than rootStore)
    const { dashboard } = useDBotStore();
    const { setActiveTab } = dashboard;

    const handleViewBot = (bot: TFreeBot) => {
        setSelectedBot(bot);
        setIsModalOpen(true);
    };

    const handleLoadBot = async (bot: TFreeBot) => {
        // 1. Start Loading State
        setIsLoading(true);

        // 2. Load the Bot (Fetch XML -> Inject -> Update Name)
        // We pass bot.name so the header updates correctly
        const result = await loadBotFromUrl(bot.xmlPath, bot.name);

        // 3. Stop Loading State
        setIsLoading(false);

        if (result.success) {
            setIsModalOpen(false);
            
            // 4. Auto-Redirect to the Builder Tab to see the blocks
            if (setActiveTab) {
                setActiveTab(DBOT_TABS.BOT_BUILDER);
            }
        } else {
            // 5. Error Handling
            // Uses the localized error message returned from the loader
            alert(result.error);
        }
    };

    return (
        <div className="free-bots">
            {/* Full Screen Loading Overlay */}
            {isLoading && (
                <div className="free-bots__loader">
                    <Text color="colored-background" weight="bold" size="m" align="center">
                        <Localize i18n_default_text="Loading Strategy..." />
                    </Text>
                </div>
            )}

            {/* Page Header */}
            <div className="free-bots__header">
                <div className="free-bots__header-title">
                    <Localize i18n_default_text="Free Trading Bots" />
                </div>
                <div className="free-bots__header-subtitle">
                    <Localize i18n_default_text="Browse and load verified automated strategies instantly." />
                </div>
            </div>

            {/* Bot Grid */}
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

            {/* Details Modal */}
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