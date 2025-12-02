import React from 'react';
import { StaticUrl } from '@deriv/components';
import DerivBrandShortLogo from 'Assets/SvgComponents/header/site-logo.svg';

const DerivShortLogo = () => {
    return (
        <div className='header__menu-left-logo'>
            <StaticUrl 
                href='/' 
                className='header__logo-link' 
                style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    textDecoration: 'none', 
                    gap: '8px' 
                }}
            >
                {/* Logo Wrapper:
                    We wrap the SVG in a span with the brand color.
                    'currentColor' inside the SVG will inherit this color.
                */}
                <span style={{ display: 'flex', color: 'var(--brand-red-coral)' }}>
                    <DerivBrandShortLogo 
                        style={{ 
                            fill: 'currentColor', 
                            width: '24px', 
                            height: '24px' 
                        }} 
                    />
                </span>
                
                {/* MrCharlohFX Text */}
                <span style={{ 
                    color: 'var(--brand-red-coral)', // Uses your Primary Purple Theme Color
                    fontWeight: 'bold', 
                    fontSize: '1.6rem',
                    lineHeight: '1.2',
                    whiteSpace: 'nowrap'
                }}>
                    MrCharlohFX
                </span>
            </StaticUrl>
        </div>
    );
};

export default DerivShortLogo;