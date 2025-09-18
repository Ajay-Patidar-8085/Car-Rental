// AlertButton.jsx - Custom component combining Alert styling with Button functionality
import React from 'react';

const AlertButton = ({
    children,
    variant = 'info',
    title,
    icon,
    onClick,
    disabled = false,
    className = '',
    ...props,
    bg
}) => {
    const baseClasses = 'w-full p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50';

    const variants = {
        success: 'bg-success-100 border-success-300 text-success-900 hover:bg-success-200',
        error: 'bg-error-100 border-error-300 text-error-900 hover:bg-error-200',
        warning: 'bg-warning-100 border-warning-300 text-warning-900 hover:bg-warning-200',
        info: 'bg-info-100 border-info-300 text-info-900 hover:bg-info-200'
    };

    const iconColors = {
        success: 'text-success-600',
        error: 'text-error-600',
        warning: 'text-warning-600',
        info: 'text-info-600'
    };

    const classes = `${baseClasses} ${variants[variant]} ${className}`;

    return (
        <div
            className={classes}
            onClick={disabled ? undefined : onClick}
            {...props}
        >
            <div className="flex items-start">
                {icon && (
                    <div className={`mr-3 mt-0.5 ${iconColors[variant]}`}>
                        {icon}
                    </div>
                )}
                <div className="flex-1">
                    {title && (
                        <h4 className="font-semibold mb-1">{title}</h4>
                    )}
                    {children && (
                        <div className="text-sm">
                            {children}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AlertButton;