import { useState, useEffect } from 'react';

export function useStoredState<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  const [state, setState] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const setValue = (value: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setState(value);
      // Trigger custom event for real-time updates across components
      window.dispatchEvent(new CustomEvent('configUpdated', { detail: { key, value } }));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  useEffect(() => {
    const handleStorageChange = (e: CustomEvent) => {
      if (e.detail.key === key) {
        setState(e.detail.value);
      }
    };

    window.addEventListener('configUpdated', handleStorageChange as EventListener);
    return () => window.removeEventListener('configUpdated', handleStorageChange as EventListener);
  }, [key]);

  return [state, setValue];
}