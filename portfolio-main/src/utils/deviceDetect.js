/**
 * Utility functions for device detection
 */

// Global constant evaluated once
export const isTouchDevice = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
};
