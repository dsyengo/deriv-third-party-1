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
        id: 'rsi_strategy',
        name: localize('Simple RSI Strategy'),
        description: localize('A classic mean reversion strategy. Buys when RSI is low, sells when RSI is high.'),
        details: localize(
            'This bot uses the Relative Strength Index (RSI) to detect overbought and oversold conditions. It purchases "Rise" when the RSI crosses below 30 and "Fall" when it crosses above 70. Best used in ranging markets.'
        ),
        rating: 4.5,
        xmlPath: '/assets/free-bots/rsi.xml', 
        youtubeVideoId: '', // Add a video ID if you have one
    },
    {
        id: 'bollinger_breakout',
        name: localize('Bollinger Band Breakout'),
        description: localize('Trends following strategy. Trades when price breaks out of the Bollinger Bands.'),
        details: localize(
            'This strategy monitors the Upper and Lower Bollinger Bands. If the tick price closes above the Upper Band, it signals a "Rise". If it closes below the Lower Band, it signals a "Fall". Works best in high volatility markets.'
        ),
        rating: 4.0,
        xmlPath: '/assets/free-bots/rsi.xml',
        youtubeVideoId: '', 
    },
    {
        id: 'martingale_digits',
        name: localize('Even/Odd Martingale'),
        description: localize('A digit match strategy using the Martingale money management system.'),
        details: localize(
            'This bot predicts Even or Odd digits. If it loses a trade, it multiplies the stake by 2.1 to recover losses. WARNING: This is a high-risk strategy. Ensure you have a sufficient balance.'
        ),
        rating: 5.0,
        xmlPath: '/assets/free-bots/rsi.xml',
        youtubeVideoId: '', 
    },
];