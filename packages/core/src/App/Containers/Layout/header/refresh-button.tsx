import React from 'react';
import { Button, Icon } from '@deriv/components';
import { Localize } from '@deriv/translations';

const RefreshButton = () => {
    const handleRefresh = () => {
        // Safety check to prevent accidental loss of bot workspace
        const should_refresh = window.confirm(
            "Are you sure you want to refresh? Any unsaved changes in your workspace will be lost."
        );
        if (should_refresh) {
            window.location.reload();
        }
    };

    return (
        <Button
    id="dt_refresh_button"
    has_effect
    onClick={handleRefresh}
    tertiary
    small
    style={{ 
        marginLeft: '8px',
        backgroundColor: 'black', // Set the background to black
        color: 'white' // Set the icon/text color to white for contrast
    }}
>
    <Icon icon="IcRefresh" size={16} />
</Button>
    );
};

export default RefreshButton;