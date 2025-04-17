import { useState, useEffect } from 'react';

interface ToastPreferences {
  defaultPosition?: string;
  duration?: number;
  customTheme?: string;
  soundEnabled?: boolean;
}

export const useToastStore = (initialPrefs?: ToastPreferences) => {
  const [preferences, setPreferences] = useState<ToastPreferences>(() => {
    if (typeof window === 'undefined') return initialPrefs || {};
    
    try {
      const storedPrefs = localStorage.getItem('toastx-preferences');
      return storedPrefs ? JSON.parse(storedPrefs) : initialPrefs || {};
    } catch (error) {
      console.error('Failed to parse toast preferences from localStorage', error);
      return initialPrefs || {};
    }
  });
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('toastx-preferences', JSON.stringify(preferences));
      } catch (error) {
        console.error('Failed to save toast preferences to localStorage', error);
      }
    }
  }, [preferences]);
  
  const updatePreferences = (newPrefs: Partial<ToastPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPrefs }));
  };
  
  const resetPreferences = () => {
    setPreferences(initialPrefs || {});
  };
  
  return {
    preferences,
    updatePreferences,
    resetPreferences
  };
};