import React, { useState } from 'react';
import { Text } from '@deriv/components';
import { Localize } from '@deriv/translations';
import { FREE_BOTS_LIST, TFreeBot } from 'Constants/free-bots-config';
import BotCard from './bot-card';
import BotDetailsModal from './bot-details-modal';

const FreeBots = () => {
    const [selectedBot, setSelectedBot] = useState<TFreeBot | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handler to open modal
    const handleViewBot = (bot: TFreeBot) => {
        setSelectedBot(bot);
        setIsModalOpen(true);
    };

    // Handler to load bot (Logic to be implemented in Phase 3)
    const handleLoadBot = (bot: TFreeBot) => {
        // Placeholder Logic
        console.log(`[TODO] Loading Bot: ${bot.name} from path: ${bot.xmlPath}`);
        alert(`Loading ${bot.name}... (Logic coming in Phase 3)`);
    };

    return (
        <div className="free-bots-page" style={{ 
            padding: '24px', 
            height: 'calc(100vh - 100px)', // Adjust based on header height
            overflowY: 'auto',
            backgroundColor: 'var(--general-main-1)' 
        }}>
            {/* Header Section */}
            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
                <Text as="h1" size="l" weight="bold" color="prominent" style={{ marginBottom: '8px' }}>
                    <Localize i18n_default_text="Free Trading Bots" />
                </Text>
                <Text as="p" size="s" color="general">
                    <Localize i18n_default_text="Browse and load verified automated strategies instantly." />
                </Text>
            </div>

            {/* Grid Section */}
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

            {/* Modal Section */}
            <BotDetailsModal 
                is_open={isModalOpen} 
                toggleModal={() => setIsModalOpen(false)} 
                bot={selectedBot} 
                onLoad={handleLoadBot}
            />
        </div>
    );
};

export default FreeBots;