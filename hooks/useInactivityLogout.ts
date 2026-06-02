import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import type { AppDispatch } from '../store/store';

const INACTIVITY_MS = 30 * 60 * 1000; // 30 minutes
const EVENTS = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];

export function useInactivityLogout(isLoggedIn: boolean) {
  const dispatch = useDispatch<AppDispatch>();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isLoggedIn) return;

    const reset = () => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        dispatch(logout());
      }, INACTIVITY_MS);
    };

    reset(); // start timer on login
    EVENTS.forEach(e => window.addEventListener(e, reset, { passive: true }));

    return () => {
      if (timer.current) clearTimeout(timer.current);
      EVENTS.forEach(e => window.removeEventListener(e, reset));
    };
  }, [isLoggedIn, dispatch]);
}
