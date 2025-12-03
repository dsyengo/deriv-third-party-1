import { localize } from '@deriv/translations';
import dbot from '@deriv/bot-skeleton/src/scratch/dbot';
import { updateWorkspaceName } from '@deriv/bot-skeleton';

/**
 * Fetches an XML strategy file from a URL and loads it into the workspace.
 * Mimics the behavior of the Load Modal > Local File loader.
 * * @param url - The public URL of the XML file
 * @param botName - The name of the bot (to update the UI header)
 */
export const loadBotFromUrl = async (url: string, botName?: string) => {
    try {
        // 1. Fetch the XML file content
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch bot: ${response.status} ${response.statusText}`);
        }

        const xmlText = await response.text();
        
        // 2. Basic validation to ensure it's a valid XML strategy
        if (!xmlText.includes('<xml') || !xmlText.includes('block')) {
            throw new Error(localize('The file is not a valid XML strategy.'));
        }

        // 3. Safety: Stop the bot if it is currently running
        // This prevents logic conflicts when swapping strategies
        if (dbot.isBotRunning) {
            dbot.terminateBot();
        }

        // 4. Inject into Blockly Workspace
        // dbot.loadWorkspace handles clearing the old blocks and placing the new ones
        dbot.loadWorkspace(xmlText);

        // 5. Update the Workspace Name (The "Name" Feature)
        // This forces the header to display the name of the bot you just loaded
        if (botName) {
            // We set the name in the scratch workspace logic
            const workspace = window.Blockly.derivWorkspace;
            if (workspace) {
                // This is how Deriv stores the filename internally for the UI
                workspace.currentStrategyName = botName; 
            }
            // Trigger the UI update
            updateWorkspaceName();
        }

        // 6. UX Improvement: Zoom to fit
        // Wait a split second for blocks to render, then center them on screen
        setTimeout(() => {
            if (window.Blockly && window.Blockly.derivWorkspace) {
                window.Blockly.derivWorkspace.cleanUp(); // Aligns blocks neatly
                window.Blockly.derivWorkspace.zoomToFit(); // Centers them
            }
        }, 100);
        
        return { success: true };

    } catch (error) {
        console.error('Error loading bot:', error);
        return { 
            success: false, 
            error: localize('Failed to load strategy. Please check your internet connection.') 
        };
    }
};