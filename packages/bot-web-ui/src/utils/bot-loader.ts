import { localize } from '@deriv/translations';
// We import 'dbot' from the skeleton package - this is the main engine
import dbot from '@deriv/bot-skeleton/src/scratch/dbot';

/**
 * Fetches an XML strategy file from a URL and loads it into the workspace.
 */
export const loadBotFromUrl = async (url: string) => {
    try {
        // 1. Fetch the file content
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch bot: ${response.statusText}`);
        }

        // 2. Get the raw XML text
        const xmlText = await response.text();
        
        // 3. Validate basic XML structure
        if (!xmlText.includes('<xml') || !xmlText.includes('<block')) {
            throw new Error('Invalid XML format');
        }

        // 4. Inject into Blockly Workspace
        // dbot.loadWorkspace handles clearing the old blocks and placing the new ones
        dbot.loadWorkspace(xmlText);
        
        return { success: true };

    } catch (error) {
        console.error('Error loading bot:', error);
        return { 
            success: false, 
            error: localize('Failed to load strategy. Please check your internet connection or try again.') 
        };
    }
};