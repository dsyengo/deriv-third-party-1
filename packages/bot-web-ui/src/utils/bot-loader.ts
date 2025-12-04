import { localize } from '@deriv/translations';
import dbot from '@deriv/bot-skeleton/src/scratch/dbot';
import { updateWorkspaceName } from '@deriv/bot-skeleton';

/**
 * Fetches an XML strategy file from a URL and loads it into the workspace.
 */
export const loadBotFromUrl = async (url: string, botName?: string) => {
    try {
        // 1. Fetch the XML file content
        const response = await fetch(url);
        
        // Handle 404 specifically so you know if the file path is wrong
        if (response.status === 404) {
            throw new Error(localize('Strategy file not found. Please check the configuration path.'));
        }

        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        const xmlText = await response.text();
        
        // 2. Basic validation
        if (!xmlText.includes('<xml') || !xmlText.includes('block')) {
            throw new Error(localize('The file is not a valid XML strategy.'));
        }

        // 3. Stop the bot if running (Safety)
        if (dbot.isBotRunning) {
            dbot.terminateBot();
        }

        // 4. Inject blocks
        dbot.loadWorkspace(xmlText);

        // 5. Update Header Name
        if (botName) {
            const workspace = window.Blockly?.derivWorkspace;
            if (workspace) {
                workspace.currentStrategyName = botName;
            }
            updateWorkspaceName();
        }

        // 6. Zoom to fit (UX)
        setTimeout(() => {
            if (window.Blockly?.derivWorkspace) {
                window.Blockly.derivWorkspace.cleanUp();
                window.Blockly.derivWorkspace.zoomToFit();
            }
        }, 100);
        
        return { success: true };

    } catch (error) {
        console.error('Error loading bot:', error);
        // Return a clean error message for the UI
        return { 
            success: false, 
            error: error instanceof Error ? error.message : localize('An unknown error occurred.') 
        };
    }
};