import { localize } from '@deriv/translations';

export type TFreeBot = {
    id: string;
    name: string;
    description: string;
    details: string;
    rating: number; // 1 to 5
    xmlPath: string; // Path to the .xml file in your public folder
    youtubeVideoId?: string; // Optional YouTube video ID (e.g., 'dQw4w9WgXcQ')
};

export const FREE_BOTS_LIST: TFreeBot[] = [
    {
    id: 'Alpha Ai  Two Predictions, Under 9 under 5 recovery',
    name: localize('Alpha Ai  Two Predictions, Under 9 under 5 recovery'),
    description: localize('A dual-prediction volatility strategy designed to recover efficiently using under-9 and under-5 cycles.'),
    details: localize(
        'This bot evaluates short-term momentum shifts and triggers two coordinated prediction cycles. It adapts based on micro-trend reversals and uses controlled recovery to stabilize performance across ranging and mildly volatile markets.'
    ),
    rating: 4.5,
    xmlPath: '/free-bots/alpha-ai-two-predictions.xml',
    youtubeVideoId: '', // Optional
},
    {
    id: 'MR CHARLOH FX EVEN_ODD V1 BOT💹✅',
    name: localize('MR CHARLOH FX EVEN_ODD V1 BOT💹✅'),
    description: localize('An even–odd pattern analyzer designed to exploit sequence imbalances in market ticks.'),
    details: localize(
        'This bot tracks the distribution of even and odd tick outcomes to identify short-term statistical deviations. When imbalance thresholds are detected, the bot executes targeted entries aligned with expected sequence correction. Suitable for ranging and semi-volatile markets.'
    ),
    rating: 4.6,
    xmlPath: '/free-bots/mr-charloh-fx-even-odd-v1.xml',
    youtubeVideoId: '', // Optional
},
    {
    id: 'MR CHARLOHFX MATCHES BOT💹✅',
    name: localize('MR CHARLOHFX MATCHES BOT💹✅'),
    description: localize('A pattern-matching strategy that scans for repeatable market sequences to trigger precise entries.'),
    details: localize(
        'This bot analyzes recent tick structures to detect recurring match patterns. When a recognizable sequence emerges, it enters trades aligned with the historical continuation behavior of that pattern. Effective in markets where micro-patterns frequently repeat.'
    ),
    rating: 4.6,
    xmlPath: '/free-bots/mr-charlohfx-matches.xml',
    youtubeVideoId: '', // Optional
    },
    {
    id: 'Over Auto Switch Killer Bot  💀⚡',
    name: localize('Over Auto Switch Killer Bot  💀⚡'),
    description: localize('An adaptive over/under strategy that auto-switches modes based on real-time volatility signals.'),
    details: localize(
        'This bot continuously monitors volatility spikes and directional pressure. When conditions shift, it automatically switches between over and under modes to maintain optimal entry timing. Designed for fast-moving markets where rapid adaptation provides a tactical edge.'
    ),
    rating: 4.7,
    xmlPath: '/free-bots/over-auto-switch-killer.xml',
    youtubeVideoId: '', // Optional
    },
    {
    id: 'Profitmax Digits Killer Bot🤖💵',
    name: localize('Profitmax Digits Killer Bot🤖💵'),
    description: localize('A digits-focused strategy engineered to exploit number frequency imbalances for consistent profit extraction.'),
    details: localize(
        'This bot analyzes digit appearance patterns, tracking hot and cold numerical tendencies to detect profitable entry points. When probability deviations appear, it executes targeted predictions designed to capitalize on short-term digit biases. Ideal for high-frequency and pattern-driven markets.'
    ),
    rating: 4.7,
    xmlPath: '/free-bots/profitmax-digits-killer.xml',
    youtubeVideoId: '', // Optional
    },
    {
    id: 'Rise_fall Bot🤖',
    name: localize('Rise_fall Bot🤖'),
    description: localize('A trend-sensing strategy designed to detect short-term upward and downward momentum shifts.'),
    details: localize(
        'This bot evaluates micro-trend movements and volatility pressure to determine whether price is more likely to rise or fall. It adapts quickly to momentum changes, making it suitable for both ranging and trending market phases.'
    ),
    rating: 4.5,
    xmlPath: '/free-bots/rise-fall.xml',
    youtubeVideoId: '', // Optional
    },
    {
    id: 'Under 8 with Under 6 recovery Bot🤖💹📈📉',
    name: localize('Under 8 with Under 6 recovery Bot🤖💹📈📉'),
    description: localize('A dual-layer recovery strategy focusing on under-8 and under-6 cycles to optimize trade recovery.'),
    details: localize(
        'This bot monitors short-term market swings, executing under-8 predictions while using an under-6 recovery system to mitigate losses. It dynamically adjusts entries based on recent price behavior, making it effective in ranging and moderately volatile markets.'
    ),
    rating: 4.6,
    xmlPath: '/free-bots/under-8-under-6-recovery.xml',
    youtubeVideoId: '', // Optional
    },
    {
    id: 'VolatilityViper Bot📈🤖📉',
    name: localize('VolatilityViper Bot📈🤖📉'),
    description: localize('A high-precision volatility trading bot designed to capitalize on sudden market spikes.'),
    details: localize(
        'This bot monitors rapid price movements and volatility surges, entering trades when sudden spikes or drops are detected. It uses tight risk management and adaptive entry timing to maximize profit potential in fast-moving markets.'
    ),
    rating: 4.7,
    xmlPath: '/free-bots/volatilityviper.xml',
    youtubeVideoId: '', // Optional
    },  
    
];