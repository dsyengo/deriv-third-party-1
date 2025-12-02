import React from 'react';

type TPriceIndicatorProps = {
    price?: string | number;
};

/**
 * PriceIndicator - Header Version
 * Displays current price tick.
 * Note: For production, ensure the parent component passes the live price tick.
 */
const PriceIndicator = ({ price = '---' }: TPriceIndicatorProps) => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px 10px',
            backgroundColor: 'var(--general-section-1)',
            borderRadius: '4px',
            border: '1px solid var(--border-normal)',
            marginLeft: '12px',
            height: '32px'
        }}>
            <span style={{ 
                fontSize: '1.2rem', // Equivalent to size="xxs"
                color: 'var(--text-general)', 
                marginRight: '6px' 
            }}>
                Price:
            </span>
            <span style={{ 
                fontSize: '1.4rem', // Equivalent to size="xs"
                fontWeight: 'bold', 
                color: 'var(--text-prominent)' 
            }}>
                {price}
            </span>
        </div>
    );
};

export default PriceIndicator;