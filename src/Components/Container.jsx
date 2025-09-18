import React from 'react';

/**
 * Container Component for consistent spacing across the application
 * 
 * Usage:
 * <Container>
 *   <YourContent />
 * </Container>
 * 
 * This ensures all content has consistent left/right margins and max-width
 */
export default function Container({ 
  children, 
  className = "", 
  maxWidth = "max-w-7xl",
  padding = "px-4 sm:px-6 lg:px-8"
}) {
  return (
    <div className={`${maxWidth} mx-auto ${padding} ${className}`}>
      {children}
    </div>
  );
}
