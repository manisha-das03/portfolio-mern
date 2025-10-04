import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics hook
export const useAnalytics = (trackingId) => {
  const location = useLocation();

  useEffect(() => {
    if (!trackingId) return;

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', trackingId);

    return () => {
      document.head.removeChild(script);
    };
  }, [trackingId]);

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', trackingId, {
        page_path: location.pathname,
      });
    }
  }, [location, trackingId]);
};

// Custom event tracking
export const trackEvent = (action, category, label, value) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};