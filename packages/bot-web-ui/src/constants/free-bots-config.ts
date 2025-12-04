import { localize } from '@deriv/translations';

export type TFreeBot = {
    id: string;
    name: string;
    description: string;
    rating: number; // 1 to 5
    xmlPath: string; // Path to the .xml file in your public folder
    youtubeVideoId?: string; // Optional YouTube video ID (e.g., 'dQw4w9WgXcQ')
    features: string[];
};

export const FREE_BOTS_LIST: TFreeBot[] = [
    {
    id: '1',
    name: localize('Alpha Ai  Two Predictions, Under 9 under 5 recovery'),
    description: localize('A dual-prediction volatility strategy designed to recover efficiently using under-9 and under-5 cycles.'),
    rating: 4.5,
    xmlPath: '/free-bots/alpha-ai-two-predictions.xml',
        youtubeVideoId: '', // Optional
    features: [
            localize('Trades Under 9 initially with a fixed stake 💰'),
            localize('Switches to Under 5 for recovery after a loss (Dual Recovery) 🔄'),
            localize('Includes strong risk management and take profit settings 🛡️🏅'),
            localize('Ideal for traders who want to automate risk-aware, recovery-based strategies.'),
            localize('⚠️ REQUIRES MANUAL ENTRY: Analyze the market and run the bot manually when conditions are optimal.'),
        ],
},
    {
    id: '2',
    name: localize('MR CHARLOH FX EVEN_ODD V1 BOT💹✅'),
    description: localize('An even–odd pattern analyzer designed to exploit sequence imbalances in market ticks.'),
       rating: 4.6,
    xmlPath: '/free-bots/mr-charloh-fx-even-odd-v1.xml',
        youtubeVideoId: '', // Optional
    features: [
localize('Trades Even/Odd markets after market analysis 🔍'),
localize('Adjustable martingale for controlled risk management 💸'),
localize('Compatible with all digit markets 🌍'),
localize('Manual activation with intelligent market assessment 🧠'),
localize('Easy-to-use for both beginners and advanced traders 🛠️'),
        ],
    
},
    {
    id: '3',
    name: localize('MR CHARLOHFX MATCHES BOT💹✅'),
    description: localize('A pattern-matching strategy that scans for repeatable market sequences to trigger precise entries.'),
       rating: 4.6,
    xmlPath: '/free-bots/mr-charlohfx-matches.xml',
        youtubeVideoId: '', // Optional
    features: [
localize('Designed for Digit Match and Deriv digit markets 🧮'),
localize('Requires manual entry after market analysis 🔍'),
localize('Adjustable martingale for controlled risk management 💸'),
localize('Perfect for traders who want full control over their strategies 🛠️'),
],
    
    },
    {
    id: '4',
    name: localize('Over Auto Switch Killer Bot  💀⚡'),
    description: localize('An adaptive over/under strategy that auto-switches modes based on real-time volatility signals.'),
       rating: 4.7,
    xmlPath: '/free-bots/over-auto-switch-killer.xml',
        youtubeVideoId: '', // Optional
    features: [
localize('Auto-switches between Over 0, Over 1, Over 2, Over 3, and back to Over 1 🔄'),
localize('Over 4 market provides favorable conditions for continuous profits 💥'),
localize('Loss recovery by repeating the same digit until it recovers 💪'),
localize('Adjustable martingale for flexible risk management 💸'),
localize('Manual entry after analyzing the market for full control 🔍'),
localize('Automated cycle to reach your target profit with smart strategy 📈'),
],
    },
    {
    id: '5',
    name: localize('Profitmax Digits Killer Bot🤖💵'),
    description: localize('A digits-focused strategy engineered to exploit number frequency imbalances for consistent profit extraction.'),
        rating: 4.7,
    xmlPath: '/free-bots/profitmax-digits-killer.xml',
        youtubeVideoId: '', // Optional
   features: [
localize('Trades Even/Odd, Over/Under, and Digit Match strategies 🔢'),
localize('Inbuilt martingale for loss recovery and stake adjustments 💸'),
localize('Adjustable settings for maximum flexibility ⚙️'),
localize('Ideal for traders who want automation with manual control 🧠'),
localize('Designed to help you maximize profits with intelligent trading ⚡'),
],
    },
    {
    id: '6',
    name: localize('Rise_fall Bot🤖'),
    description: localize('A trend-sensing strategy designed to detect short-term upward and downward momentum shifts.'),
       rating: 4.5,
    xmlPath: '/free-bots/rise-fall.xml',
        youtubeVideoId: '', // Optional
    features: [
localize('Trades Rise and Fall markets with manual martingale adjustments 🔄'),
localize('No built-in martingale, apply it manually for stake adjustments 💰'),
localize('No automatic take profit or stop loss – exit manually 🛑'),
localize('Ideal for traders who want manual control with automated entries ⚙️'),
],
    },
    {
    id: '7',
    name: localize('Under 8 with Under 6 recovery Bot🤖💹📈📉'),
    description: localize('A dual-layer recovery strategy focusing on under-8 and under-6 cycles to optimize trade recovery.'),
    
    rating: 4.6,
    xmlPath: '/free-bots/under-8-under-6-recovery.xml',
        youtubeVideoId: '', // Optional
   features: [
localize('Trades Under 8 initially, switches to Under 6 for recovery 🔄'),
localize('No martingale – uses the same stake size for recovery 💰'),
localize('Manual activation – analyze the market and run it at the right time 🔍'),
localize('Ideal for traders who prefer manual control with automated market switching ⚙️'),
],
    },
    {
    id: '8',
    name: localize('VolatilityViper Bot📈🤖📉'),
    description: localize('A high-precision volatility trading bot designed to capitalize on sudden market spikes.'),
        rating: 4.7,
    xmlPath: '/free-bots/volatilityviper.xml',
        youtubeVideoId: '', // Optional
    features: [
localize('Trades all markets except for accumulators 🔄'),
localize('Adapts to market volatility for maximum trading efficiency 💥'),
localize('Flexible and versatile, ideal for diverse trading strategies 💡'),
localize('Manual activation with market analysis required 🔍'),
],
    },  
    
];